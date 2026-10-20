/* Layout only: relocate the existing theme button without replacing its handlers. */
(function () {
  const root = document.documentElement;
  if (!root.hasAttribute('data-visual-pilot')) return;
  const button = document.getElementById('lu-theme-toggle');
  const reading = root.dataset.visualPilot === 'reading';
  const exam = document.getElementById(reading ? 'test-screen' : 'exam');
  if (!button || !exam) return;
  const home = document.createComment('theme-button-entry-position');
  button.before(home);
  let tools;
  if (reading) {
    const timer = document.getElementById('timer-block');
    if (!timer) return;
    tools = document.createElement('div');
    tools.className = 'lu-exam-tools';
    timer.before(tools);
    tools.append(timer);
    const score = document.getElementById('score-summary-block');
    if (score) tools.append(score);
  } else {
    const timerRow = exam.querySelector('.lu-timer-row');
    if (!timerRow) return;
    tools = document.createElement('div');
    tools.className = 'lu-exam-tools';
    timerRow.before(tools);
    tools.append(timerRow);
  }
  function placeButton() {
    const active = !exam.hidden && getComputedStyle(exam).display !== 'none';
    const target = active ? tools : home.parentNode;
    if (button.parentNode !== target) {
      if (active) tools.append(button);
      else home.after(button);
    }
    button.classList.toggle('lu-theme-inline', active);
    root.classList.toggle('lu-exam-active', active);
  }
  new MutationObserver(placeButton).observe(exam, {
    attributes: true, attributeFilter: ['hidden', 'style', 'class']
  });
  placeButton();
})();
