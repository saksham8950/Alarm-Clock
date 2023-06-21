// Get the alarm modal element
const alarmModal = document.getElementById('alarm-modal');

// Get the elements for alarm functionality
const alarmTimeInput = document.getElementById('alarm-time-input');
const setAlarmButton = document.getElementById('set-alarm-button');
const stopAlarmButton = document.getElementById('stop-alarm-button');
const alarmSound = new Audio('./assets/alarm-sound.mp3');

const alarmIcon = document.getElementById('alarm-img')

let alarmTimeoutId;

//Function to display that the alarm is set
function setAlarmIcon(){
    alarmIcon.style.opacity = '1';
}

//Function to display that the alarm is not set
function notSetAlarmIcon(){
    alarmIcon.style.opacity = '0.35';
}
// Function to open the alarm modal
function openModal() {
  alarmModal.style.display = 'block';
}

// Function to close the alarm modal
function closeModal() {
  alarmModal.style.display = 'none';
}

// Function to play the alarm sound
function playAlarmSound() {
  alarmSound.play();
}

// Function to stop the alarm sound
function stopAlarmSound() {
  alarmSound.pause();
  alarmSound.currentTime = 0;
}

// Function to check if the alarm time has been reached
function checkAlarmTime() {
  const now = new Date();
  const alarmTime = new Date(alarmTimeInput.value);

  if (now >= alarmTime) {
    // Alarm time reached
    playAlarmSound();
    stopAlarmButton.disabled = false;
    setAlarmButton.disabled = true;
  } else {
    // Alarm time not reached yet, check again in 1 second
    alarmTimeoutId = setTimeout(checkAlarmTime, 1000);
  }
}

// Function to handle setting the alarm
function setAlarm() {
  const alarmTime = new Date(alarmTimeInput.value);

  if (isNaN(alarmTime.getTime())) {
    // Invalid date entered
    alert('Invalid date and time. Please enter a valid date and time.');
    return;
  }

  clearTimeout(alarmTimeoutId);

  // Calculate the time remaining until the alarm time
  const now = new Date();
  const timeRemaining = alarmTime.getTime() - now.getTime();

  if (timeRemaining <= 0) {
    // Alarm time has already passed
    alert('The entered alarm time has already passed. Please enter a future date and time.');
    return;
  }

  // Set the alarm timeout
  alarmTimeoutId = setTimeout(checkAlarmTime, timeRemaining);
  setAlarmButton.disabled = true;

  setAlarmIcon();
  closeModal();
}

// Function to handle stopping the alarm
function stopAlarm() {
  clearTimeout(alarmTimeoutId);
  stopAlarmSound();
  notSetAlarmIcon();
  setAlarmButton.disabled = false;
  stopAlarmButton.disabled = true;
}

// Function to update the timer display every second
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

// Initialize the timer display
document.addEventListener('DOMContentLoaded', () =>
  requestAnimationFrame(updateTime)
)
// updateTime();
