let mouseX;
let mouseY;
var pressedQ = false;
var pressedE = false;

const KEY_ARROW_LEFT = 37;
const KEY_ARROW_UP = 38;
const KEY_ARROW_RIGHT = 39;
const KEY_ARROW_DOWN = 40;
const KEY_LEFT_SHIFT = 16;
const KEY_Q = 81;
const KEY_E = 69;

// const KEY_W = 87;
// const KEY_A = 65;
// const KEY_S = 83;
// const KEY_D = 68;

function calculateMousePos(evt) {
	const rect = canvas.getBoundingClientRect();
	const root = document.documentElement;
	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX,
		y: mouseY
	};
}

function keySet(keyEvent, whichWarrior, setTo) {
	if (keyEvent.keyCode === whichWarrior.controlKeyLeft) {
		whichWarrior.keyHeld_Left = setTo;
	}
	if (keyEvent.keyCode === whichWarrior.controlKeyRight) {
		whichWarrior.keyHeld_Right = setTo;
	}
	if (keyEvent.keyCode === whichWarrior.controlKeyUp) {
		whichWarrior.keyHeld_Up = setTo;
	}
	if (keyEvent.keyCode === whichWarrior.controlKeyDown) {
		whichWarrior.keyHeld_Down = setTo;
	}
	if (keyEvent.keyCode === whichWarrior.controlKeyShift) {
		whichWarrior.keyHeld_Shift = setTo;
	}
	if (keyEvent.keyCode === whichWarrior.controlKeyQ) {
		if (!pressedQ) {
			whichWarrior.attack();
		}
		pressedQ = setTo;
	}
	if (keyEvent.keyCode === whichWarrior.controlKeyE) {
		if (!pressedE) {
			whichWarrior.setWarriorWeapon();
		}
		pressedE = setTo;
	}
}

function keyPressed(evt) {
	keySet(evt, p1, true);
}

function keyReleased(evt) {
	keySet(evt, p1, false);
}

function inputSetup() {
	canvas.addEventListener('mousemove',
		function(evt) {
			const mousePos = calculateMousePos(evt);
		}
	);
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	p1.setupInput(KEY_ARROW_UP, KEY_ARROW_DOWN, KEY_ARROW_RIGHT, KEY_ARROW_LEFT, KEY_LEFT_SHIFT, KEY_Q, KEY_E);
}