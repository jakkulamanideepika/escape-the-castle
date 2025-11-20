const delta_angle = 0.0001;

class WallMountedRangedEnemy extends RangedStaticEnemy {
	constructor(X, Y, ang, interval, damage) {
		super(X, Y, ang, interval, damage, true);
	}
}

class Ballista extends WallMountedRangedEnemy {
	constructor(X, Y, ang, interval, damage) {
		super(X, Y, ang, interval, damage);
	}
}

class TourettesTurret extends Ballista {
	constructor(X, Y, ang, ang_range, interval, damage) {
		super(X, Y, ang, interval, damage);
		this.ang_range = ang_range;
	}
	activate() {
		let rdm = (Math.random() - 0.5) * 2 * this.ang_range;
		this.ang = this.default_ang + rdm;
		if (this.ang > 2 * Math.PI) {
			this.ang -= 2 * Math.PI;
		}
		if (Math.sign(rdm) > 0) {
			console.log("My dick is on fire");
		} else {
			console.log("Fuck a biscuit");
		}
		this.fire();
	}
}