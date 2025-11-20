const dungeonheight = 50; //deprecated
const dungeonwidth = 50; //deprecated
const dungeonTile_s = 50;
const dungeonnumH = 16;
const dungeonnumV = 13;
//const dungeonGap = 2;

var dungeonGrid = [];

const DUNGEON_GROUND = 0;
const DUNGEON_WALL = 1;
const DUNGEON_PLAYER = 2;
const DUNGEON_KEY = 3;
const DUNGEON_DOOR = 4;
const DUNGEON_LEVER = 5;
const DUNGEON_ENEMY = 6;
const DUNGEON_GATE = 7;
const DUNGEON_LEVER_OPEN = 8;
const DUNGEON_TRAP = 9;
const DUNGEON_ARMOR = 10;
const DUNGEON_TELEPORT = 11;
const DUNGEON_HEALTH = 12;
const DUNGEON_TREASURE = 13;
const DUNGEON_GATE_OPEN = 14;

var ADD_LIFE = false;


function rowColToArrayIndex(Col, Row) {
	return dungeonnumH * Row + Col;
}

function drawDungeons() {
	var dungeonIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	for (var i = 0; i < dungeonnumV; i++) {
		for (var j = 0; j < dungeonnumH; j++) {
			var tileKindHere = dungeonGrid[dungeonIndex];
			var useImage = dungeonPics[tileKindHere];
			if (tileKindHere === DUNGEON_KEY || tileKindHere === DUNGEON_LEVER ||
				tileKindHere === DUNGEON_LEVER_OPEN || tileKindHere === DUNGEON_GATE ||
				tileKindHere === DUNGEON_ARMOR || tileKindHere === DUNGEON_HEALTH ||
				tileKindHere === DUNGEON_TREASURE || tileKindHere === DUNGEON_TELEPORT ||
				tileKindHere === DUNGEON_GATE_OPEN) {
				canvasContext.drawImage(dungeonPics[DUNGEON_GROUND], drawTileX, drawTileY);
			} else if (tileKindHere === DUNGEON_DOOR) {
				canvasContext.drawImage(dungeonPics[DUNGEON_WALL], drawTileX, drawTileY);
			}
			canvasContext.drawImage(useImage, drawTileX, drawTileY);
			dungeonIndex++;
			drawTileX += dungeonwidth;
		}
		drawTileX = 0;
		drawTileY += dungeonheight;
	}
}

function objectWallHandling(whichObject) {
	if (whichObject.prevX < whichObject.X) {
		whichObject.X -= whichObject.speedMult;
	}
	if (whichObject.prevX > whichObject.X) {
		whichObject.X += whichObject.speedMult;
	}
	if (whichObject.prevY < whichObject.Y) {
		whichObject.Y -= whichObject.speedMult;
	}
	if (whichObject.prevY > whichObject.Y) {
		whichObject.Y += whichObject.speedMult;
	}
}