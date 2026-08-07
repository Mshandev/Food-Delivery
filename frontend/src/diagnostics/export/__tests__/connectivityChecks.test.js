import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { runConnectivityChecks } from '../connectivityChecks.js';

describe('runConnectivityChecks', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('returns success results with statusCode and latencyMs on successful fetch', async () => {
    // Mock fetch to simulate a successful 200 response.
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
    });
    vi.stubGlobal('fetch', mockFetch);

    const results = await runConnectivityChecks('https://api.example.com');

    expect(results).toHaveLength(2);
    for (const result of results) {
      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(200);
      expect(result.errorMessage).toBeNull();
      expect(typeof result.latencyMs).toBe('number');
      expect(result.latencyMs).toBeGreaterThanOrEqual(0);
      expect(result.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    }
  });

  it('records non-2xx responses as failure with the HTTP status error message', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
    });
    vi.stubGlobal('fetch', mockFetch);

    const results = await runConnectivityChecks('https://api.example.com');

    for (const result of results) {
      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(503);
      expect(result.errorMessage).toBe('HTTP 503');
    }
  });

  it('records network errors with errorMessage and null statusCode', async () => {
    const networkError = new Error('Failed to fetch');
    const mockFetch = vi.fn().mockRejectedValue(networkError);
    vi.stubGlobal('fetch', mockFetch);

    const results = await runConnectivityChecks('https://api.example.com');

    for (const result of results) {
      expect(result.success).toBe(false);
      expect(result.statusCode).toBeNull();
      expect(result.errorMessage).toBe('Failed to fetch');
      expect(typeof result.latencyMs).toBe('number');
    }
  });

  it('checks the correct endpoints derived from apiBaseUrl', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', mockFetch);

    await runConnectivityChecks('https://my-api.com');

    const calledUrls = mockFetch.mock.calls.map((call) => call[0]);
    expect(calledUrls).toContain('https://my-api.com/');
    expect(calledUrls).toContain('https://my-api.com/api/food/list');
  });
});
