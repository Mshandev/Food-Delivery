import { describe, it, expect } from 'vitest';
import { collectMetadata } from '../collectMetadata.js';

describe('collectMetadata', () => {
  it('returns an object with all required fields', () => {
    const result = collectMetadata();
    expect(result).toHaveProperty('mode');
    expect(result).toHaveProperty('baseUrl');
    expect(result).toHaveProperty('origin');
    expect(result).toHaveProperty('userAgent');
    expect(result).toHaveProperty('exportTimestamp');
    expect(result).toHaveProperty('performanceTimeOrigin');
  });

  it('exportTimestamp is a valid ISO 8601 string', () => {
    const { exportTimestamp } = collectMetadata();
    // ISO 8601 strings are parseable by Date and produce a valid time.
    const parsed = new Date(exportTimestamp);
    expect(isNaN(parsed.getTime())).toBe(false);
    // Verify the format matches ISO pattern (ends with Z)
    expect(exportTimestamp).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z$/
    );
  });

  it('origin matches window.location.origin', () => {
    const { origin } = collectMetadata();
    expect(origin).toBe(window.location.origin);
  });

  it('userAgent matches navigator.userAgent', () => {
    const { userAgent } = collectMetadata();
    expect(userAgent).toBe(navigator.userAgent);
  });

  it('performanceTimeOrigin is a positive number', () => {
    const { performanceTimeOrigin } = collectMetadata();
    expect(typeof performanceTimeOrigin).toBe('number');
    expect(performanceTimeOrigin).toBeGreaterThan(0);
  });
});
