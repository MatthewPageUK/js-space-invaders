/** 
 * Explosion Particle logic and movement
 *
 * @author Matthew Page <work@mjp.co>
 * @property {SpaceInvaders} game - The current game
 * @property {Explosion} explosion - The explosion this particle is in
 * @property {number} width - Width of this particle
 * @property {number} height - Width of this particle
 * @property {number} posX - Position on screen
 * @property {number} posY - Position on screen
 * @property {number} velocity - Speed of particle
 * @property {number} direction - Direction of particle (angle from North)
 * @property {number} opacity - DOM element opacity (fade out)
 * @property {boolean} isActive - Is this particle still active / alive
 * @property {Object} domElement - The DOM element for this particle
 */
class ExplosionParticle {
	/**
	 * Create an individual particle instance
	 *
	 * @param {SpaceInvaders} game - The current game
	 * @param {Explosion} explosion - The explosion this particle is in
	 * @param {string} id - Unique DOM element id
	 */
	constructor(game, explosion, id) {
		this.id = id;
		this.game = game;
		this.explosion = explosion;
		this.width = this.explosion.particlesSize;
		this.height = this.explosion.particlesSize;
		this.posX = this.explosion.width/2;
		this.posY = this.explosion.width/2;
		this.velocity = (Math.random() * 3)+1;
		this.direction = Math.round(Math.random()*360);
		this.opacity = 1;
		this.isActive = true;
		
		/* Create the HTML DOM elements inside explosion */
		let div = document.createElement('div');		
		div.id = this.id;
		div.setAttribute('class', 'particle');
		this.explosion.domElement.appendChild(div);
		this.domElement = document.getElementById(this.id);
		
		this.domElement.style.backgroundColor = this.explosion.colour;
		this.domElement.style.width = `${this.width}px`;
		this.domElement.style.height = `${this.height}px`;
	}
	/**
	 * Main particle update loop, move, fade and die
	 *
	 */
	update() {
		if(this.isActive) {

			/* Simple movement logic, expanded to keep it easy */
			if(this.direction >= 0 && this.direction <= 90) {
				this.posX += this.velocity * Math.sin(this.direction*Math.PI/180);
				this.posY -= this.velocity * Math.cos(this.direction*Math.PI/180);
				if(this.explosion.gravity) {
					this.direction += 1;
				}
			} else if(this.direction > 90 && this.direction <= 180) {
				this.posX += this.velocity * Math.cos((this.direction-90)*Math.PI/180);
				this.posY += this.velocity * Math.sin((this.direction-90)*Math.PI/180);
				if(this.explosion.gravity) {
					this.direction += 1;
					if(this.direction>180) this.direction = 180;
				}
			} else if(this.direction > 180 && this.direction <= 270) {
				this.posX -= this.velocity * Math.sin((this.direction-180)*Math.PI/180);
				this.posY += this.velocity * Math.cos((this.direction-180)*Math.PI/180);
				if(this.explosion.gravity) {
					this.direction -= 1;
					if(this.direction<180) this.direction = 180;
				}
			} else if(this.direction > 270 && this.direction <=360) {
				this.posX -= this.velocity * Math.cos((this.direction-270)*Math.PI/180);
				this.posY -= this.velocity * Math.sin((this.direction-270)*Math.PI/180);
				if(this.explosion.gravity) {
					this.direction -= 1;
				}
			}
			this.opacity -= 0.005;
			if(this.opacity < 0) this.isActive = false;
		}
		this.draw();
	}
	/**
	 * Update the dom element to show it on screen.
	 *
	 */
	draw() {
		this.domElement.style.left = `${Math.round(this.posX)}px`;
		this.domElement.style.top = `${Math.round(this.posY)}px`;
		this.domElement.style.opacity = this.opacity;
	}
}