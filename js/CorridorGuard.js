///////////////////////////////////////////////////////////
// Type of enemy which moves in sideways motion
// Movement type: horizontal/vertical is based on boolean called upon constructor
//////////////////////////////////////////////////////////

class CorridorGuard extends Enemy {
	constructor(health, name, vertical) {
		super(health, name, DUNGEON_ENEMY);
		// Determines whether CG moves sideways or horizontal
		if (vertical) {
			this.speedX = 0;
		} else {
			this.speedY = 0;
		}
		this.dir = "up"; //depreceted
	}
}
