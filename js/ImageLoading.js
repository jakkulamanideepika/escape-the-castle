const warrior1Pic = document.createElement("img");
const warrior2Pic = document.createElement("img");
const warrior3Pic = document.createElement("img");
const archer1Pic = document.createElement("img");
const archer2Pic = document.createElement("img");
const archer3Pic = document.createElement("img");
const enemy1Pic = document.createElement("img");
var dungeonPics = [];

let picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	//console.log(picsToLoad);
	if (picsToLoad == 0) {
		imageLoadingDoneStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady();
	imgVar.src = fileName;
}

function loadImageForDungeonCode(dungeonCode, fileName) {
	dungeonPics[dungeonCode] = document.createElement("img");
	beginLoadingImage(dungeonPics[dungeonCode], fileName);
}

function loadImages() {
	var imageList = [{
			varName: warrior1Pic,
			theFile: "images/warrior.png"
		},
		{
			varName: warrior2Pic,
			theFile: "images/warrior2.png"
		},
		{
			varName: warrior3Pic,
			theFile: "images/warrior3.png"
		},
		{
			varName: archer1Pic,
			theFile: "images/archer.png"
		},
		{
			varName: archer2Pic,
			theFile: "images/archer2.png"
		},
		{
			varName: archer3Pic,
			theFile: "images/archer3.png"
		}, {
			varName: enemy1Pic,
			theFile: "images/CorridorEnemyFront.png"
		},

		{
			dungeonType: DUNGEON_WALL,
			theFile: "images/dungeon_wall.png"
		},
		{
			dungeonType: DUNGEON_TELEPORT,
			theFile: "images/teleport.png"
		},
		{
			dungeonType: DUNGEON_GROUND,
			theFile: "images/dungeon_ground.png"
		},
		{
			dungeonType: DUNGEON_KEY,
			theFile: "images/dungeon_key.png"
		},
		{
			dungeonType: DUNGEON_LEVER,
			theFile: "images/dungeon_lever.png"
		},
		{
			dungeonType: DUNGEON_LEVER_OPEN,
			theFile: "images/dungeon_lever_OPEN.png"
		},
		{
			dungeonType: DUNGEON_DOOR,
			theFile: "images/dungeon_door.png"
		},
		{
			dungeonType: DUNGEON_GATE,
			theFile: "images/dungeon_gate.png"
		},
		{
			dungeonType: DUNGEON_GATE_OPEN,
			theFile: "images/dungeon_gate_OPEN.png"
		},
		{
			dungeonType: DUNGEON_TRAP,
			theFile: "images/Trap_Opened.png"
		},
		{
			dungeonType: DUNGEON_ARMOR,
			theFile: "images/shield.png"
		},
		{
			dungeonType: DUNGEON_HEALTH,
			theFile: "images/life.png"
		},
		{
			dungeonType: DUNGEON_TREASURE,
			theFile: "images/treasure.png"
		}
	];

	picsToLoad = imageList.length;

	for (var i = 0; i < imageList.length; i++) {
		if (imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} else {
			loadImageForDungeonCode(imageList[i].dungeonType, imageList[i].theFile);
		}
	}

}