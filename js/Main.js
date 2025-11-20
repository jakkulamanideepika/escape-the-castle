let canvas;
let canvasContext;

var p1 = new warrior();
var e1 = new CorridorGuard(5, "Liazz", true);
var traps = []; // Array for static enemies

//ID of current level, coresponds with array index of levels[]
var level_id = 0;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	colorRect(0, 0, canvas.width, canvas.height, 'black');
	colorWords("LoadingImages", canvas.width / 2, canvas.height / 2, 'white');
	loadImages();
};

function imageLoadingDoneStartGame() {
	var FPS = 60;
	setInterval(function() {
		drawEverything();
		moveEverything();
		checkPositions();
		checkHealth();
	}, 1000 / FPS);
	inputSetup();
	loadLevel(level_id);
}

function loadTraps(level_id) {
	let trapsData = levels[level_id].level.traps;
	if (trapsData == null) {
		console.log("No traps in this level. It should be easy then.");
		traps = null;
		return;
	}
	trapsData.forEach(function(value, key) {
		console.log("Setting up trap with id: " + value.id);
		let X, Y, ang, interval, damage, type;
		X = (value.X + 0.5) * dungeonTile_s;
		Y = (value.Y + 0.5) * dungeonTile_s;
		ang = value.ang * Math.PI / 4;
		interval = value.interval;
		damage = value.damage;
		if (value.type === "WALL_BALLISTA") {
			type = staticEnemy_t.WALL_BALLISTA;
			traps.push(new Ballista(X, Y, ang, interval, damage));
		} else if (value.type === "TOURETTES_TURRET") {
			type = staticEnemy_t.TOURETTES_TURRET;
			let ang_range = value.ang_range * Math.PI / 4;
			traps.push(new TourettesTurret(X, Y, ang, ang_range, interval, damage));
		}
	});
}

function loadLevel(level_id) {
	console.log("Loaded level: ", levels[level_id].id, levels[level_id].level.name);
	dungeonGrid = levels[level_id].level.map.slice();
	if (ADD_LIFE === true) {
		dungeonGrid[194] = DUNGEON_HEALTH;
	}
	loadTraps(level_id);
	p1.WarriorReset("Hero");
	e1.reset(enemy1Pic, "Liazz");
}

function drawEverything() {
	drawDungeons();
	p1.draw();
	e1.draw();
}

function moveEverything() {
	p1.move();
	if (p1.projectile != null) {
		p1.projectile.moveProjectile();
	}
	if (traps != null) {
		traps.forEach(function(value, key) {
			value.update();
		});
	}
	e1.move();
}

function checkPositions() {
	e1.checkIfEnemySpotted(p1);
}

function checkHealth() {
	if (p1.getHealth() <= 0) {
		setTimeout(function() {
			loadLevel(0);
			location.reload();
		}, 5000);
	}
	if (e1.getHealth() <= 0) {
		e1.kill();
	}
}