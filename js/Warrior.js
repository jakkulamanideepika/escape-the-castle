class warrior extends Human {

	constructor() {
		super(1, "Hero", DUNGEON_PLAYER);

		this.keysOwn = 0;
		this.treasureOwn = 0;

		this.keyHeld_Up = false;
		this.keyHeld_Down = false;
		this.keyHeld_Left = false;
		this.keyHeld_Right = false;
		this.keyHeld_Shift = false;

		this.controlKeyUp = null;
		this.controlKeyDown = null;
		this.controlKeyRight = null;
		this.controlKeyLeft = null;
		this.controlKeyShift = null;
		this.controlKeyQ = null;
		this.controlKeyE = null;

		this.prevX = 0;
		this.prevY = 0;
		this.speedX = this.speed; // 1 OR -1
		this.speedY = this.speed; // 1 OR -1

		this.stamina = 100;
		this.projectile = null; //
	}

	setupInput(upKey, downKey, rightKey, leftKey, shiftKey, qKey, eKey) {
		this.controlKeyUp = upKey;
		this.controlKeyDown = downKey;
		this.controlKeyRight = rightKey;
		this.controlKeyLeft = leftKey;
		this.controlKeyShift = shiftKey;
		this.controlKeyQ = qKey;
		this.controlKeyE = eKey;
	}

	move() {
		if (this.keyHeld_Shift) {
			this.stamina--;
			if (this.stamina > 0) {
				this.speedMult = this.baseSpeed * 2;
			} else {
				this.stamina = 0;
				this.speedMult = this.baseSpeed;
			}
		}
		if (!this.keyHeld_Shift && this.stamina < 100) {
			this.stamina++;
		}

		if (this.keyHeld_Up && !this.keyHeld_Down && !this.keyHeld_Left && !this.keyHeld_Right) {
			this.ang = -Math.PI / 2;
		}
		if (!this.keyHeld_Up && this.keyHeld_Down && !this.keyHeld_Left && !this.keyHeld_Right) {
			this.ang = Math.PI / 2;
		}
		if (!this.keyHeld_Up && !this.keyHeld_Down && this.keyHeld_Left && !this.keyHeld_Right) {
			this.ang = Math.PI;
		}
		if (!this.keyHeld_Up && !this.keyHeld_Down && !this.keyHeld_Left && this.keyHeld_Right) {
			this.ang = 0;
		}
		if (this.keyHeld_Up && !this.keyHeld_Down && this.keyHeld_Left && !this.keyHeld_Right) {
			this.ang = -Math.PI * (3 / 4);
		}
		if (this.keyHeld_Up && !this.keyHeld_Down && !this.keyHeld_Left && this.keyHeld_Right) {
			this.ang = -Math.PI * (1 / 4);
		}
		if (!this.keyHeld_Up && this.keyHeld_Down && this.keyHeld_Left && !this.keyHeld_Right) {
			this.ang = Math.PI * (3 / 4);
		}
		if (!this.keyHeld_Up && this.keyHeld_Down && !this.keyHeld_Left && this.keyHeld_Right) {
			this.ang = Math.PI * (1 / 4);
		}
		if ((this.keyHeld_Up && this.keyHeld_Down && this.keyHeld_Left && this.keyHeld_Right) ||
			(!this.keyHeld_Up && this.keyHeld_Down && this.keyHeld_Left && this.keyHeld_Right) ||
			(this.keyHeld_Up && !this.keyHeld_Down && this.keyHeld_Left && this.keyHeld_Right) ||
			(this.keyHeld_Up && this.keyHeld_Down && !this.keyHeld_Left && this.keyHeld_Right) ||
			(this.keyHeld_Up && this.keyHeld_Down && this.keyHeld_Left && !this.keyHeld_Right)) {
			this.speedMult = 0;
		}

		if (this.keyHeld_Up || this.keyHeld_Down || this.keyHeld_Left || this.keyHeld_Right) {
			this.prevY = this.Y;
			this.Y += Math.sin(this.ang) * this.speedMult;
			this.prevX = this.X;
			this.X += Math.cos(this.ang) * this.speedMult;
		}

		if ((this.keyHeld_Up || this.keyHeld_Down) && (this.keyHeld_Left || this.keyHeld_Right)) {
			this.speedMult = Math.cos(Math.PI * (1 / 4)) * this.speedMult;
		}

		this.dungeonHandling();
		this.speedMult = this.baseSpeed;
	}

	attack() {
		// Check if projectile hit
		if (this.projectile != null && !this.projectile.isActive) {
			this.projectile = null;
		}
		if (this.projectile === null) {
			if (this.archer) {
				console.log("test");
				this.projectile = new Projectile(this.X, this.Y, this.ang, 5, 2, 1);
			}
		}
	}

	setWarriorWeapon() {
		if (!this.archer) {
			this.archer = true;
			this.setWarriorLevelPic();
		} else if (this.archer) {
			this.archer = false;
			this.setWarriorLevelPic();
		}
	}

	setWarriorLevelPic() {
		if (this.archer) {
			if (this.level === 1) {
				this.Pic = archer1Pic;
			}
			if (this.level === 2) {
				this.Pic = archer2Pic;
			}
			if (this.level === 3) {
				this.Pic = archer3Pic;
			}
		} else {
			if (this.level === 1) {
				this.Pic = warrior1Pic;
			}
			if (this.level === 2) {
				this.Pic = warrior2Pic;
			}
			if (this.level === 3) {
				this.Pic = warrior3Pic;
			}
		}
	}

	WarriorReset(name) {
		this.keysOwn = 0;
		this.setWarriorLevelPic();
		this.reset(this.Pic, name);
	}
	draw() {
		drawBitmapCenteredWithRotation(this.Pic, this.X, this.Y, 0);
	}
	damage() {
		// Process hit from enemy
		if (this.level <= 1) { // Hero has no armor
			this.health--;
			if (this.health === 0) {
				this.alive = false;
			}
			if (dungeonGrid[194] === DUNGEON_GROUND) {
				dungeonGrid[193] = DUNGEON_GROUND;
				console.log("you lost cunt");
			} else {
				dungeonGrid[194] = DUNGEON_GROUND;
			}
		}
		if (this.level > 1) {
			this.level--;
			this.setWarriorLevelPic();
		}
	}
	pickKey(index) {
		dungeonGrid[index] = DUNGEON_GROUND;
		for (let j = 6; j < 10; j++) {
			var dungeonIndex = j + (dungeonnumV - 1) * dungeonnumH;
			if (dungeonGrid[dungeonIndex] === DUNGEON_GROUND) {
				dungeonGrid[dungeonIndex] = DUNGEON_KEY;
				break;
			}
		}
		this.keysOwn++;
		console.log("Found Key! KeyCount: " + this.keysOwn);
	}
	useKey(index) {
		if (this.keysOwn > 0) {
			dungeonGrid[index] = DUNGEON_GROUND;
			for (let j = 10; j > 5; j--) {
				var dungeonIndex = j + (dungeonnumV - 1) * dungeonnumH;
				if (dungeonGrid[dungeonIndex] === DUNGEON_KEY) {
					dungeonGrid[dungeonIndex] = DUNGEON_GROUND;
					break;
				}
			}
			this.keysOwn--;
			console.log(this.keysOwn);
		} else {
			objectWallHandling(this);
		}
	}
	pickArmor(index) {
		if (this.level === this.MaxLevel) {
			console.log("YOU already reached max armor level");
		} else {
			dungeonGrid[index] = DUNGEON_GROUND;
			this.level++;
			this.setWarriorLevelPic();
			console.log("Found Aromor! ArmorCount: " + this.level);
		}
	}
	pickHealth(index) {
		if (this.health === this.MaxHealth) {
			console.log("YOU already reached max health level");
		} else {
			dungeonGrid[index] = DUNGEON_GROUND;
			dungeonGrid[194] = DUNGEON_HEALTH;
			this.health++;
			this.setWarriorLevelPic();
			console.log("health: " + this.health);
		}
	}
	activateLever(index) {
		dungeonGrid[index] = DUNGEON_LEVER_OPEN;
		if (this.getIndex(DUNGEON_GATE) != null) {
			dungeonGrid[this.getIndex(DUNGEON_GATE)] = DUNGEON_GATE_OPEN;
		}
	}
	useGate(index) {
		console.log(this.name + "WINS!");
		if (dungeonGrid[194] === DUNGEON_HEALTH) {
			ADD_LIFE = true;
		}
		loadLevel(++level_id);
	}
	collectTreasure(index) {
		dungeonGrid[index] = DUNGEON_GROUND;
		dungeonGrid[196] = DUNGEON_TREASURE;
		this.treasureOwn++;
		console.log("Found Treasure! You have: " + this.treasureOwn + " treasure");
	}
	useTeleport(index) {
		for (let i = 0; i < dungeonnumV; i++) {
			for (let j = 0; j < dungeonnumH; j++) {
				var dungeonIndex = j + i * dungeonnumH;
				if (dungeonGrid[dungeonIndex] === DUNGEON_TELEPORT && dungeonIndex != index) {
					if (this.ang == Math.PI * (1 / 4)) {
						this.X = j * dungeonwidth + dungeonwidth + Math.cos(this.ang) * this.speedMult;
						this.Y = i * dungeonheight + dungeonheight + Math.sin(this.ang) * this.speedMult;
					} else if (this.ang == Math.PI * (3 / 4)) {
						this.X = j * dungeonwidth + Math.cos(this.ang) * this.speedMult;
						this.Y = i * dungeonheight + dungeonheight + Math.sin(this.ang) * this.speedMult;
					} else if (this.ang == Math.PI * (-1 / 4)) {
						this.X = j * dungeonwidth + dungeonwidth + Math.cos(this.ang) * this.speedMult;
						this.Y = i * dungeonheight + Math.sin(this.ang) * this.speedMult;
					} else if (this.ang == Math.PI * (-3 / 4)) {
						this.X = j * dungeonwidth + Math.cos(this.ang) * this.speedMult;
						this.Y = i * dungeonheight + Math.sin(this.ang) * this.speedMult;
					} else {
						this.X = j * dungeonwidth + Math.cos(this.ang) * this.speedMult + this.prevX % dungeonwidth;
						this.Y = i * dungeonheight + Math.sin(this.ang) * this.speedMult + this.prevY % dungeonheight;
					}
				}
			}
		}
	}
	dungeonHandling() {
		var dungeonCol = Math.floor(this.X / dungeonwidth);
		var dungeonRow = Math.floor(this.Y / dungeonheight);
		var index = rowColToArrayIndex(dungeonCol, dungeonRow);

		if (dungeonCol >= 0 && dungeonCol < dungeonnumH && dungeonRow >= 0 && dungeonRow < dungeonnumV) {
			if (dungeonGrid[index] === DUNGEON_WALL || dungeonGrid[index] === DUNGEON_GATE) {
				objectWallHandling(this);
			} else if (dungeonGrid[index] === DUNGEON_KEY) {
				this.pickKey(index);
			} else if (dungeonGrid[index] === DUNGEON_ARMOR) {
				this.pickArmor(index);
			} else if (dungeonGrid[index] === DUNGEON_HEALTH) {
				this.pickHealth(index);
			} else if (dungeonGrid[index] === DUNGEON_DOOR) {
				this.useKey(index);
			} else if (dungeonGrid[index] === DUNGEON_TELEPORT) {
				this.useTeleport(index);
			} else if (dungeonGrid[index] === DUNGEON_LEVER) {
				this.activateLever(index);
			} else if (dungeonGrid[index] === DUNGEON_GATE_OPEN) {
				this.useGate(index);
			} else if (dungeonGrid[index] === DUNGEON_TREASURE) {
				this.collectTreasure(index);
			}
		}
	}
}