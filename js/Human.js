class Human {
	constructor(health, name, type) {
		this.ang = 0; //Math.PI/2 -> for vertical, 0 -> horizontal
		this.X = 0;
		this.Y = 0;
		this.speedMult = 2;
		this.baseSpeed = 2; // constant
		this.Pic = null;
		this.alive = true;

		this.name = name;
		this.health = health;
		this.MaxHealth = 5;
		this.type = type;
		this.level = 1;
		this.MaxLevel = 3;
		this.archer = false;
		this.spotted = false
	}

	move() {
		this.X += Math.cos(this.ang) * this.speedMult;
		this.Y += Math.sin(this.ang) * this.speedMult;
		this.wallHandling();
	}

	wallHandling() {
		var dungeonCol = Math.floor(this.X / dungeonwidth);
		var dungeonRow = Math.floor(this.Y / dungeonheight);
		var dungeonIndexUnderEnemy = rowColToArrayIndex(dungeonCol, dungeonRow);
		if (dungeonCol >= 0 && dungeonCol < dungeonnumH && dungeonRow >= 0 && dungeonRow < dungeonnumV) {
			if (dungeonGrid[dungeonIndexUnderEnemy] === DUNGEON_WALL) {
				console.log(look(dungeonIndexUnderEnemy));
				if (this.ang === 0) {
					this.ang = Math.PI;
				} else if (this.ang === Math.PI) {
					this.ang = 0;
				} else {
					this.ang *= -1;
				}
			}
		}
	}

	turnRight() {
		this.ang -= Math.PI / 2;
	}

	turnLeft() {
		this.ang += Math.PI / 2;
	}

	look(index) {
		this.lookFront(index);
		this.lookRight(index);
		this.lookLeft(index);
		this.lookBack(index);
	}

	lookFront(index) {
		index += Math.cos(this.ang) + Math.sin(this.ang) * dungeonnumH;
		//console.log("Looking Front on:" + dungeonGrid[index]);
		return dungeonGrid[index];
	}

	lookRight(index) {
		index += dungeonnumH * Math.cos(this.ang) + Math.sin(this.ang);
		//console.log("Looking Right on:" + dungeonGrid[index]);
		return dungeonGrid[index];
	}

	lookLeft(index) {
		index -= dungeonnumH * Math.cos(this.ang) + Math.sin(this.ang);
		//console.log("Looking Left on:" + dungeonGrid[index]);
		return dungeonGrid[index];
	}

	lookBack(index) {
		index -= Math.cos(this.ang) + Math.sin(this.ang) * dungeonnumH;
		//console.log("Looking Back on:" + dungeonGrid[index]);
		return dungeonGrid[index];
	}

	reset(whichImage, whichName) {
		this.Pic = whichImage;
		this.name = whichName;
		for (let i = 0; i < dungeonnumH; i++) {
			for (let j = 0; j < dungeonnumV; j++) {
				const dungeonIndex = i + j * dungeonnumH;
				if (dungeonGrid[dungeonIndex] === this.type) {
					dungeonGrid[dungeonIndex] = DUNGEON_GROUND;
					this.X = i * dungeonheight + dungeonwidth / 2;
					this.Y = j * dungeonwidth + dungeonheight / 2;
					this.resetSpeed();
					return;
				}
			}
		}
	}
	resetSpeed() {
		this.speedMult = this.baseSpeed;
	}
	kill() {
		this.alive = false;
	}
	getHealth() {
		return this.health;
	}
	getIndex(tileType) {
		for (let i = 0; i < dungeonnumV; i++) {
			for (let j = 0; j < dungeonnumH; j++) {
				var index = j + i * dungeonnumH;
				if (dungeonGrid[index] === tileType) {
					return index;
				}
			}
		}
	}
}