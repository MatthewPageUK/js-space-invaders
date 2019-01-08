/** 
 * Damage Bubble - red and white colouring, moves up
 *
 * @author Matthew Page <work@mjp.co>
 * @extends Bubble
 */
class BubbleDamage extends Bubble {
	/**
	 * Create a damage bubble.
	 *
	 * @param {SpaceInvaders} game - The current game.
	 * @param {number} startX - Starting X position.
	 * @param {number} startY - Starting Y position.
	 * @param {string} id - Unique HTML DOM id.
	 * @param {number} value - Value displayed in the bubble.
	 */
	constructor(game, startX, startY, id, value) {
		super(game, startX, startY, id, value);
		this.direction = 0;
		this.domElement.classList.add('damage');
	}
}