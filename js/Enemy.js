class Enemy extends Human {
	constructor() {
		super(5, "Enemy", DUNGEON_ENEMY);
		this.attacked = false; // If enemy is in attack mode
		this.canHit = true;
		this.time = 2000;
		this.deplacement = 18;
	}

	wallHandling() {
		var dungeonCol = Math.floor(this.X / dungeonwidth);
		var dungeonRow = Math.floor(this.Y / dungeonheight);
		var dungeonIndexUnderEnemy = rowColToArrayIndex(dungeonCol, dungeonRow);
		var _this = this;
		if (dungeonCol >= 0 && dungeonCol < dungeonnumH && dungeonRow >= 0 && dungeonRow < dungeonnumV) {
			if (dungeonGrid[dungeonIndexUnderEnemy] === DUNGEON_WALL) { //this sends CG to opposite direction if wall and sometimes stuns him if he misses the enemy
				if (this.ang === 0) {
					this.ang = Math.PI;
					this.X -= this.speedMult;
				} else if (this.ang === Math.PI) {
					this.ang = 0;
					this.X += this.speedMult;
				} else {
					this.ang *= -1;
					this.Y += Math.sin(this.ang) * this.speedMult;
				}
				if (this.attacked === true) { //if CG hits the wall and a did not attacked, but enemy was spotted, CG gets stunned and THEN speed will be reset
					this.speedMult = 0;
					setTimeout(function() {
						_this.resetSpeed();
						_this.attacked = false;
						_this.canHit = true;
					}, this.time);
				} // end of case when CG missed warrior
			} // end of case when CG hits the wall
		}
	} // end of function wallHandling()

	attack(whichEnemy) {
		this.speedMult *= 1.025;
		this.attacked = true;
		if (Math.abs(this.X - whichEnemy.X) <= dungeonwidth && Math.abs(this.Y - whichEnemy.Y) <= dungeonheight) {
			if (this.canHit === true) {
				this.resetSpeed();
				whichEnemy.damage();
				this.canHit = false;
			}
			this.attacked = false;
		} else {
			this.canHit = true;
		}
	} //if not hit continue faster until wall is hit then reset speed and attacked boolean

	checkIfEnemySpotted(whichEnemy) {
		let spotted = false;
		if (this.ang === Math.PI / 2 && this.Y < whichEnemy.Y) {
			if (Math.abs(this.X - whichEnemy.X) < dungeonwidth) {
				spotted = true;
			}
		}
		if (this.ang === -Math.PI / 2 && this.Y > whichEnemy.Y) {
			if (Math.abs(this.X - whichEnemy.X) < dungeonwidth) {
				spotted = true;
			}
		}
		if (this.ang === 0 && this.X < whichEnemy.X) {
			if (Math.abs(this.Y - whichEnemy.Y) < dungeonheight) {
				spotted = true;
			}
		}
		if (this.ang === Math.PI && this.X > whichEnemy.X) {
			if (Math.abs(this.Y - whichEnemy.Y) < dungeonheight) {
				spotted = true;
			} //this just checks if enemy is within range
		} //this chcecks if enemy in the same direction

		if (spotted) {
			this.attack(whichEnemy);
		}
	}

	draw() {
		if (this.alive) {
			drawBitmapCenteredWithRotation(this.Pic, this.X, this.Y, 0);
		}
	}
}