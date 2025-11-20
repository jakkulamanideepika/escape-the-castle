class Projectile {
	constructor(X, Y, ang, speed, size, dmg) {
		this.X = X;
		this.Y = Y;
		this.ang = ang;
		this.speed = speed;
		this.size = size;
		this.dmg = dmg;
		this.isActive = true;
	}
	moveProjectile() {
		if (this.isActive) {
			this.X += this.speed * Math.cos(this.ang);
			this.Y += this.speed * Math.sin(this.ang);
			this.projectileHandling(e1);
			this.drawProjectile();
		}
	}
	projectileHandling(whichEnemy) {
		var projectileDungeonCol = Math.floor(this.X / dungeonwidth);
		var projectileDungeonRow = Math.floor(this.Y / dungeonheight);
		var dungeonIndexUnderProjectile = rowColToArrayIndex(projectileDungeonCol, projectileDungeonRow);

		if (dungeonGrid[dungeonIndexUnderProjectile] === DUNGEON_WALL ||
			dungeonGrid[dungeonIndexUnderProjectile] === DUNGEON_DOOR) {
			this.isActive = false;
		} else if ((Math.abs(this.X - whichEnemy.X) <= dungeonTile_s / 2) &&
			(Math.abs(this.Y - whichEnemy.Y) <= dungeonheight / 2)) {
			console.log("I hit him cunt!");
			this.isActive = false;
			if (whichEnemy.level > 1) {
				whichEnemy.level--;
				whichEnemy.setWarriorLevelPic();
			}
		}
	}

	drawProjectile() {
		colorBall(this.X, this.Y, this.size, 'white');
	}
}