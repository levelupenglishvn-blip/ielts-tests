/* api.js — the ONLY file that talks to the Apps Script Web App.
 * POST text/plain (a "simple" request, so the browser sends no CORS preflight; Apps Script cannot answer one). */
(function () {
  'use strict';
  const LU = window.LU;
  const RETRYABLE = { NETWORK: 1, TIMEOUT: 1, BAD_RESPONSE: 1, SERVER: 1, BUSY: 1 };

  class ApiError extends Error {
    constructor(code, message, extra) { super(message); this.code = code; this.extra = extra || null; this.retryable = !!RETRYABLE[code]; }
  }
  LU.ApiError = ApiError;

  LU.api = {
    configured() { return !!String(LU.CFG.API_URL || '').trim(); },
    async call(action, params, opts) {
      opts = opts || {};
      const url = String(LU.CFG.API_URL || '').trim();
      if (!url) throw new ApiError('NOT_CONFIGURED', 'API_URL is empty');
      const body = Object.assign({ action: action }, params || {});
      const s = LU.session.get();
      if (s && !opts.anonymous) body.token = s.token;
      const ctrl = typeof AbortController === 'function' ? new AbortController() : null;
      const timer = ctrl ? setTimeout(() => ctrl.abort(), LU.CFG.REQUEST_TIMEOUT_MS) : null;
      let res;
      try {
        res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(body), redirect: 'follow', signal: ctrl ? ctrl.signal : undefined });
      } catch (e) {
        throw new ApiError(e && e.name === 'AbortError' ? 'TIMEOUT' : 'NETWORK', 'Network error');
      } finally { if (timer) clearTimeout(timer); }
      let json;
      try { json = await res.json(); } catch (e) { throw new ApiError('BAD_RESPONSE', 'Unreadable response'); }
      if (!res.ok && !json) throw new ApiError('BAD_RESPONSE', 'HTTP ' + res.status);
      if (!json || json.ok !== true) {
        const er = (json && json.error) || {};
        const err = new ApiError(er.code || 'SERVER', er.message || 'Server error', er.extra);
        if (err.code === 'UNAUTHORIZED' && !opts.anonymous && LU.onUnauthorized) LU.onUnauthorized();
        throw err;
      }
      return json.data;
    }
  };
})();
