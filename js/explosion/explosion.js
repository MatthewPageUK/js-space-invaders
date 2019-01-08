/** 
 * On screen explosion with particles.
 *
 * @author Matthew Page <work@mjp.co>
 * @extends Sprite
 */
class Explosion extends Sprite {
	/**
	 * Create a new explosion instance
	 *
	 * @param {SpaceInvaders} game - The current game instance
	 * @param {ExplosionFactory} explosionFactory The explosion factory that created this explosion
	 * @param {string} colour - Colour of the particles
	 * @param {array} particles - Array of particles
	 * @param {number} particlesMax - Maximum particle size
	 * @param {number} particlesSize Minimum particle size
	 * @param {boolean} gravity - Gravity simulation
	 * @param {number} activeCount - Number of active particles still alive
	 */
	constructor(game, explosionFactory, startX, startY, colour, particlesMax, particlesSize, gravity) {
		/* Sprite(game, id, posX, posY, width, height, velocity, direction, hitPoints) */
		super(game, "explosion"+Math.random().toString(36).substr(2, 5), startX-200, startY-200, 400, 400, 0, 0, 1);
		this.explosionFactory = explosionFactory;
		this.colour = colour;
		this.particles = [];
		this.particlesMax = particlesMax;
		this.particlesSize = particlesSize;
		this.gravity = gravity;
		this.activeCount = 0;
		this.makeDomElement('particleExplosion');
		this.domElement = document.getElementById(this.id);		
		this.makeParticles();
	}
	/**
	 * Destroy this explosion
	 *
	 */
	destroy() {
		this.explosionFactory.destroy(this);
	}
	/**
	 * Make the particles for this explosion, all start in the center with random attributes.
	 *
	 */
	makeParticles() {
		for(let a=0; a<this.particlesMax; ++a) {
			this.particles.push(new ExplosionParticle(this.game, this, this.id+this.particles.length));	
			this.explosionFactory.particleCounter += 1;
		}
	}
	/**
	 * Explosion update loop, calls update() on all the particles.
	 *
	 */
	update() {
		this.activeCount = 0;
		this.particles.forEach((particle, index) => {
			if(particle.isActive) {
				particle.update();	
				this.activeCount += 1;
			}
		});
		/* When there are no more active particles, destroy the explosion instance */
		if(this.activeCount<1) this.destroy();
		this.draw();
	}
}