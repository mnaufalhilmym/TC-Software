"use strict";


let minute2 = 0;
let second2 = 0;
let milliseconds2 = 0;

let timer3;

document.form_main.start.onclick = () => start2();
document.form_main.pause.onclick = () => pause();
document.form_main.reset.onclick = () => reset4();

function start2() {
  pause();
  timer3 = setInterval(() => { timer2(); }, 10);
}

function pause() {
  clearInterval(timer3);
}

function reset4() {
  
  minute2 = 0;
  second2 = 0;
  milliseconds2 = 0;
  
  document.getElementById('minute').innerText = '00';
  document.getElementById('second').innerText = '00';
  document.getElementById('millisecond').innerText = '00';
}

function timer2() {
  if ((milliseconds2 += 1) == 100) {
    milliseconds2 = 0;
    if(minute2 == 2 && second2 == 59) {
      clearInterval(timer3)
    }
    second2++;
  }
  if (second2 == 60) {
    second2 = 0;
    minute2++;
  }
  
  document.getElementById('minute').innerText = returnData(minute2);
  document.getElementById('second').innerText = returnData(second2);
  document.getElementById('millisecond').innerText = returnData(milliseconds2);
}

function returnData(input) {
  return input > 9 ? input : `0${input}`
}