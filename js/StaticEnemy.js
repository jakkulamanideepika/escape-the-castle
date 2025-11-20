var staticEnemy_t = {
	WALL_BALLISTA: 0,
	TOURETTES_TURRET: 1,
};

class StaticEnemy {
	constructor(X, Y, ang, interval, ranged, wall_mounted) {

		this.interval = interval;
		this.ranged = ranged; // True if shoots projectiles
		this.damage = null;
		this.range = null;
		this.wall_mounted = wall_mounted; // True if part of wall, false for wall traps
		this.type = null;
		this.X = X;
		this.Y = Y;
		this.ang = ang;
		this.default_ang = ang;
		this.intervalID = setInterval(
			(function(self) {
				return function() {
					self.activate();
				}
			})(this),
			this.interval
		);
	}

	activate() {
		/*
		  Activate static enemy. This happens at time interval specified by this. interval.
		  acivate() should behave differently based on type of enemy.
		*/
		console.log("ERR: Accessing function prototype and ACTIVATE method should be implemented in subclass");
	}

	update() {
		/*
		  Function called every frame of the game to update status of StaticEnemy.
		  Should move all projectiles and check wheter Human is in range of non-range trap
		*/
		console.log("ERR: Accessing function prototype and UPDATE method should be implemented in subclass");
	}
}

class RangedStaticEnemy extends StaticEnemy {
	constructor(X, Y, ang, interval, damage, wall_mounted) {
		super(X, Y, ang, interval, true, wall_mounted);
		this.projectile = null;
		this.damage = damage;
	}
	activate() {
		console.log("Traps: fire");
		this.fire();
	}
	fire() {
		if (this.projectile == null) {
			this.projectile = [];
		}
		let deltaX = Math.cos(this.default_ang);
		let deltaY = Math.sin(this.default_ang);
		if (Math.abs(deltaY) > Math.abs(deltaX)) {
			deltaY = dungeonTile_s / 2 * Math.sign(deltaY);
			deltaX = 0;
		} else if (Math.abs(deltaY) < Math.abs(deltaX)) {
			deltaX = dungeonTile_s / 2 * Math.sign(deltaX);
			deltaY = 0;
		}
		let new_projectile = new Projectile(
			this.X + deltaX,
			this.Y + deltaY,
			this.ang, 5, 2, 1);
		this.projectile.push(new_projectile);
	}
	update() {
		if (this.projectile == null) {
			console.log("ERR: projectile is undefined");
			return;
		}
		var self = this;
		this.projectile.forEach(function(value, key) {
			value.moveProjectile();
			if (!value.isActive) {
				//console.log("Deleting projectile at " + key);
				self.projectile.splice(key, 1);
			}
		});
	}
}

class ContactStaticEnemy extends StaticEnemy {
	constructor(interval, wall_mounted) {
		super(interval, false, wall_mounted);
	}
}