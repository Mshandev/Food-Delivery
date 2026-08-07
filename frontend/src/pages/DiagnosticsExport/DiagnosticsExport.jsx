import { useContext, useState } from 'react';
import JSZip from 'jszip';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';
import { getDiagnosticsConfig } from '../../diagnostics/export/config';
import { runExport } from '../../diagnostics/export/exportOrchestrator';
import './DiagnosticsExport.css';

/**
 * Triggers a ZIP file download in the browser.
 *
 * @param {Blob} blob - ZIP blob.
 * @param {string} filename - Suggested filename.
 */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/**
 * Formats a byte count as a human-readable string.
 *
 * @param {number} bytes
 * @returns {string}
 */
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Diagnostics/Export page.
 *
 * Generates and downloads a ZIP containing:
 *   - Sanitized HTML snapshots of allowlisted routes
 *   - Build/runtime metadata (metadata/metadata.json)
 *   - API connectivity report (metadata/connectivity-report.json)
 *
 * Access is controlled by the VITE_DIAGNOSTICS_EXPORT_ENABLED feature flag
 * and is disabled in production unless VITE_DIAGNOSTICS_EXPORT_ALLOW_PROD=true.
 */
const DiagnosticsExport = () => {
  const config = getDiagnosticsConfig();
  const { url: apiBaseUrl, token } = useContext(StoreContext);

  const [loading, setLoading] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [summary, setSummary] = useState(null);

  if (!config.enabled) {
    return (
      <div className="diagnostics-export-denied">
        <h1>Access Denied</h1>
        <p>
          The Diagnostics/Export feature is not enabled in this environment.
          Set <code>VITE_DIAGNOSTICS_EXPORT_ENABLED=true</code> in your{' '}
          <code>.env</code> file and restart the dev server.
        </p>
      </div>
    );
  }

  const handleGenerate = async () => {
    setLoading(true);
    setSummary(null);
    setProgressText('Starting export…');

    try {
      const result = await runExport({
        apiBaseUrl,
        token,
        onProgress: (step, total, label) => {
          setProgressText(`Step ${step}/${total}: ${label}`);
        },
      });

      setProgressText('Building ZIP…');

      const zip = new JSZip();

      // Add metadata files.
      zip.file(
        'metadata/metadata.json',
        JSON.stringify(result.metadata, null, 2)
      );
      zip.file(
        'metadata/connectivity-report.json',
        JSON.stringify(result.connectivityReport, null, 2)
      );

      // Add HTML snapshots.
      for (const file of result.files) {
        zip.file(file.path, file.content);
      }

      const blob = await zip.generateAsync({ type: 'blob' });
      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, '-')
        .slice(0, 19);
      const filename = `diagnostics-export-${timestamp}.zip`;

      downloadBlob(blob, filename);

      setSummary({
        fileCount: result.files.length + 2, // snapshots + 2 metadata files
        sizeEstimate: formatBytes(blob.size),
        filename,
      });

      toast.success('Diagnostics ZIP downloaded successfully.');
    } catch (err) {
      console.error('[DiagnosticsExport] Export failed:', err);
      toast.error(`Export failed: ${err.message}`);
    } finally {
      setLoading(false);
      setProgressText('');
    }
  };

  return (
    <div className="diagnostics-export">
      <h1>Diagnostics / Export</h1>
      <p className="de-subtitle">
        Generate and download a ZIP containing sanitized HTML route snapshots,
        build metadata, and API connectivity results.
      </p>

      <div className="de-section">
        <h2>Included Routes (Allowlist)</h2>
        <ul className="de-route-list">
          {config.allowedRoutes.map((route) => (
            <li key={route.path}>
              <span className="de-route-badge">safe</span>
              <strong>{route.label}</strong> — <code>{route.path}</code>
            </li>
          ))}
        </ul>
      </div>

      <div className="de-section">
        <h2>Actions</h2>
        <div className="de-action-row">
          <button
            className="de-generate-btn"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? 'Generating…' : 'Generate Export ZIP'}
          </button>
          {loading && progressText && (
            <span className="de-progress">{progressText}</span>
          )}
        </div>
      </div>

      {summary && (
        <div className="de-summary">
          <h3>Export Complete</h3>
          <ul>
            <li>
              <strong>File:</strong> {summary.filename}
            </li>
            <li>
              <strong>Files in ZIP:</strong> {summary.fileCount}
            </li>
            <li>
              <strong>Size:</strong> {summary.sizeEstimate}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DiagnosticsExport;
