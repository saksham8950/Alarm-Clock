document.addEventListener('DOMContentLoaded', () =>
  requestAnimationFrame(updateTime)
)

function updateTime() {
  const now = new Date();
  const day = now.toLocaleString('en', { weekday: 'short' });
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  document.documentElement.style.setProperty('--timer-day', "'" + day + "'");
  document.documentElement.style.setProperty('--timer-hours', "'" + hours + "'");
  document.documentElement.style.setProperty('--timer-minutes', "'" + minutes + "'");
  document.documentElement.style.setProperty('--timer-seconds', "'" + seconds + "'");
  requestAnimationFrame(updateTime);
}