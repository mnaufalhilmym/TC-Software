let timer;
let minute = 1;
let seconds = 59;
let milliseconds = minute * 60 * 100;
//let milliseconds = 1200; // for debugging
let textSec = "00";
let textMil = "00";
setDisplay(minute, textSec, textMil);
let statSec = 59;
//let statSec = 11; // for debugging
let statMil = 100;
let timer123 = true;
let startable = true;

function start() {
	if (startable && milliseconds > 0) {
		startable = false;
		timer = setInterval(function () {
			milliseconds--;
			temp3 = milliseconds;
			if (statMil != 0) statMil--;
				else {
					seconds--;
					statMil = 99;
					if (statSec != 0) {
						statSec--;
					} else statSec = 59;
				}
			temp = seconds;
			temp4 = statMil;
			temp2 = statSec;
			if (statMil < 10) textMil = '0' + statMil;
			else textMil = statMil;
			if (statSec < 10) textSec = '0' + statSec;
			else textSec = statSec;
			if (milliseconds == 1000) {
				setDisplayColor("red");
				if (timer123) {
					popup();
					span.onclick = function () {
						modal.style.display = "none";
						document.getElementById("matchCountdown").style.fontSize = "20rem";
						document.getElementById("matchCountdown").innerHTML = "10";
						clearInterval(countdownTimer);
					}
					window.onclick = function (event) {
						if (event.target == modal) {
							modal.style.display = "none";
							document.getElementById("matchCountdown").style.fontSize = "20rem";
							document.getElementById("matchCountdown").innerHTML = "10";
							clearInterval(countdownTimer);
						}
					}
				}
			}
			minute = Math.floor(seconds / 60);
			setDisplay(minute, textSec, textMil);
			if (milliseconds == 0) {
				if (timer123) {
					setTimer(3);
					timer123 = false;
					setDisplayColor("black");
				} else {
					clearInterval(timer);
					enableTimer("block", "none");
					startable = true;
				}
			}
		}, 10);
	}
}

function stop() {
	startable = true;
	seconds = temp;
	statSec = temp2;
	milliseconds = temp3;
	statmil = temp4;
	clearInterval(timer);
}

function cancel() {
	if (!startable) {
		stop();
		startable = true;
	} else {
		setDisplayColor("black");
		if (milliseconds == 3 * 60 * 100 || milliseconds < 1 * 60 * 100) {
			setTimer(1);
			timer123 = true;
		} else {
			setTimer(3);
			timer123 = false;
		}
		clearInterval(timer);
		setDisplay(minute, textSec, textMil);
		enableTimer("none", "block");
		
		document.getElementById('count').innerHTML = 0;
		document.getElementById('count2').innerHTML = 0;
		document.getElementById('count3').innerHTML = 0;
		document.getElementById("matchCountdown").innerHTML = 10;
	}
}

function setTimer(min) {
	if (min == 3) {
		document.getElementsByClassName("timer-name")[0].innerHTML = "MATCH";
	} else {
		document.getElementsByClassName("timer-name")[0].innerHTML = "Team Preparation";
	}
	minute = min;
	seconds = min * 60 - 1;
	milliseconds = minute * 60 * 100;
	textSec = "00";
	textMil = "00";
	statSec = 59;
	statMil = 100;
}

function setDisplay(min, sec, mil) {
	displayMin = document.getElementById("displayMin").innerHTML = min;
	displaySec = document.getElementById("displaySec").innerHTML = sec;
	displayMiliSec = document.getElementById("displayMiliSec").innerHTML = mil;
}

function setDisplayColor(color) {
	document.getElementsByClassName("timer-name")[0].style.color = color;
	document.getElementById("displayMin").style.color = color;
	document.getElementById("separatorColon").style.color = color;
	document.getElementById("displaySec").style.color = color;
	document.getElementById("separatorDot").style.color = color;
	document.getElementById("displayMiliSec").style.color = color;
}

function enableTimer(state1, state2) {
	document.getElementById("timesUp").style.display = state1;
	if (state1 == "block") {
		beep(100, 820, 1000);
	}
	document.getElementById("displayMin").style.display = state2;
	document.getElementById("separatorColon").style.display = state2;
	document.getElementById("displaySec").style.display = state2;
	document.getElementById("separatorDot").style.display = state2;
	document.getElementById("displayMiliSec").style.display = state2;
}

audio = new AudioContext();
function beep(vol, freq, duration){
  v=audio.createOscillator();
  u=audio.createGain();
  v.connect(u);
  v.frequency.value=freq;
  v.type="square";
  u.connect(audio.destination);
  u.gain.value=vol*0.01;
  v.start(audio.currentTime);
  v.stop(audio.currentTime+duration*0.001);
}

// POP UP 1-2-3 SAAT COUNTDOWN MENIT KE 3 SEBELUM MULAI COUNTUP
let countdownTimer;
function popup() {
	let timeleft = 9;
	beep(100, 520, 200);
	modal.style.display = "block";
	countdownTimer = setInterval(function () {
		if (timeleft == 0) {
			modal.style.display = "none";
			beep(100, 820, 1000);
		} else if (timeleft > 0) {
			document.getElementById("matchCountdown").innerHTML = timeleft;
			beep(100, 520, 200);
		}
		timeleft -= 1;
	}, 1000);
}

// Get the modal
var modal = document.getElementById("myModal");
	// Get the button that opens the modal
var btn = document.getElementById("myBtn");
	// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
	// When the user clicks the button, open the modal 
btn.onclick = function () {
	modal.style.display = "block";
	popup();
};
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
	document.getElementById("matchCountdown").style.fontSize = "20rem";
	document.getElementById("matchCountdown").innerHTML = "10";
	clearInterval(countdownTimer);
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
		document.getElementById("matchCountdown").style.fontSize = "20rem";
		document.getElementById("matchCountdown").innerHTML = "10";
		clearInterval(countdownTimer);
	}
};
