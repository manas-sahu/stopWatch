// A couple of global variables
const deg = 6;
let hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0;

let startTime;
let elapsedTime = 0;

// Define a timer ID for the setInterval function
let timerId = null;

// Grab the necessary elements from the DOM
const start = document.querySelector(".start");
const reset = document.querySelector(".reset");
const stopwatchBox = document.querySelector(".timer");
const secondHand = document.querySelector(".sec-hand");
const ring = document.querySelector("progress-ring");
const globe = document.querySelector(".spinnerGlobe");

// Add event listeners to both buttons
start.addEventListener("click", function () {
  stopwatch("start");
});

reset.addEventListener("click", function () {
  stopwatch("reset");
});

// Convert time to a format of hours, minutes, seconds, and milliseconds
function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  minutes = mm.toString().padStart(2, "0");
  seconds = ss.toString().padStart(2, "0");
  milliseconds = ms.toString().padStart(2, "0");

  return `${minutes}:${seconds}:${milliseconds}`;
}

// To Show time at HTML
function print(txt) {
  stopwatchBox.innerHTML = txt;
}

// function to operate Stopwatch
function stopwatch(command) {
  startTime = Date.now() - elapsedTime;
  if (command === "start") {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
      start.innerHTML = "Start";
    } else {
      start.innerHTML = "Stop";
      timerId = setInterval(function () {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
        let sec = seconds * deg;
        secondHand.style.transform = `translateX(-50%) rotatez(${sec}deg)`;
        globe.style.transform = `rotatez(${sec}deg)`;
        ring.setAttribute("progress", (100 / 60) * seconds);
      }, 10);
    }
  } else if (command === "reset") {
    clearInterval(timerId);
    print("00:00:00");
    elapsedTime = 0;
    start.innerHTML = "Start";
    secondHand.style.transform = `translateX(-50%) rotatez(0deg)`;
    globe.style.transform = `rotatez(0deg)`;
    ring.setAttribute("progress", 0);
  }
}
