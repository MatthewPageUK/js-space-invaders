/** 
 * Particle Explosion  factory - controls creation and destruction of particle explosions.
 *
 * @author Matthew Page <work@mjp.co>
 * @extends Factory
 */
class ExplosionFactory extends Factory {
	/**
	 * Create a new explosion factory
	 *
	 * @param {SpaceInvaders} game - The current game instance
	 */
	constructor(game) {
		/* Factory(game, maxItems, minDelay, maxDelay) */
		super(game, 100, 0, 0);
		this.particleCounter = 0;	
	}
	/**
	 * Call this to create a new explosion on screen 
	 *
	 * @param {number} startX - The center point 
	 * @param {number} startY - The center point
	 * @param {string} colour - Colour of the particles
	 * @param {number} particlesMax - Maximum number of particles
	 * @param {boolean} gravity - Simulate gravity on the explosion particles 
	 */
	make(startX, startY, colour, particlesMax, particleSize, gravity) {
		if(this.canMake()) {
			this.makeCounter += 1;
			this.items.push(this.makeItem(startX, startY, colour, particlesMax, particleSize, gravity));
			return true;	
		} else {
			return false;
		}
	}
	/**
	 * Return a new Explosion instance, called by the make() method.
	 *
	 * @param {number} startX - The center point 
	 * @param {number} startY - The center point
	 * @param {string} colour - Colour of the particles
	 * @param {number} particlesMax - Maximum number of particles
	 * @param {number} particleSize - Size of particles in new explosion
	 * @param {boolean} gravity - Simulate gravity on the explosion particles 
	 * @retruns {Explosion} 
	 */
	makeItem(startX, startY, colour, particlesMax, particleSize, gravity) {
		return new Explosion(this.game, this, startX, startY, colour, particlesMax, particleSize, gravity);
	}
	/**
	 * Main update loop called by game loop. Calls update on all active Explosion instances
	 *
	 */
	update() {				
		this.items.forEach((explosion, index) => {
			if(explosion.isActive) explosion.update();
		});
		return true;
	}
}
