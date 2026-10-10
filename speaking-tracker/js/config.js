/* Public, non-secret settings. This file is safe to commit.
 * NEVER put the Sheet ID, the teacher passcode or any student data here. */
window.LU_CONFIG = {
  // Paste the Apps Script Web App URL here (ends with /exec). See README step "Deploy the API".
  API_URL: 'https://script.google.com/macros/s/AKfycbwUlPA5hji-iZhGbS30kijqcMPhcH1YCY1inFlpF82Iow7SWwanSE25LTc9lhjBfh7B/exec',
  APP_NAME: 'Level Up IELTS Speaking Mock Tracker',
  // Official logo file (vector). Empty string = plain text wordmark fallback.
  LOGO_SRC: 'img/logo.svg',
  TOTAL_WEEKS: 15,
  REQUEST_TIMEOUT_MS: 25000,
  // Unsynced edits are pushed to the sheet this long after the teacher stops typing (ms). 0 = off.
  AUTOSYNC_IDLE_MS: 15000
};
