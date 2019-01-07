/** 
 * Bubble wrapper for Score, Health and Damage bubbles displayed on screen.
 * They float up or down and fade out. Once faded out they die.
 *
 * @author Matthew Page <work@mjp.co>
 * @extends Sprite
 * @property {number} value - The value displayed in the bubble
 */
class Bubble extends Sprite {
	/**
	 * Create a new bubble on screen.
	 *
	 * @param {SpaceInvaders} game - The current game.
	 * @param {number} startX - Starting X position.
	 * @param {number} startY - Starting Y position.
	 * @param {string} id - Unique HTML DOM id.
	 * @param {number} value - Value displayed in the bubble.
	 */
	constructor(game, startX, startY, id, value) {
		/* Sprite(game, id, posX, posY, width, height, velocity, direction, hitPoints) */
		super(game, id, startX, startY, 25, 25, 1, 0, 1);
		this.value = value;
		this.opacity = 1;
		this.makeDomElement('bubble');
		this.domElement = document.getElementById(this.id);
		this.domElement.innerHTML = `<p>${this.value}</p>`;
		this.domElement.style.opacity = this.opacity;
	}
	/**
	 * Update the bubble, call move and fade it out. 
	 * When faded out disable it. BubbleFactory will kill it
	 * on the next update.
	 *
	 * @returns {boolean} 
	 */
	update() {
		if(this.isActive) {
			this.opacity -= 0.01;
			if(this.opacity < 0) {
				this.isActive = false;
				return false;
			}
			else {
				this.domElement.style.opacity = this.opacity;
				this.move();
				this.draw();
				return true;
			}
		}
	}
	/**
	 * Move the bubble up or down based on direction.
	 * Collision detection on screen edges.
	 *
	 * @returns {boolean}
	 */
	move() {
		if(this.isActive) {
			if(this.direction == 180) {	
				/* Move down the screen */
				this.posY += this.velocity;
				if(this.posY > this.game.height) this.isActive = false;
			}
			if(this.direction == 0) {	
				/* Move up the screen */
				this.posY -= this.velocity;
				if(this.posY < 0) this.isActive = false;
			}
		}
	}
}
