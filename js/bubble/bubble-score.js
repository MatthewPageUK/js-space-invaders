/** 
 * Score bubble - gold and moves up the screen
 *
 * @author Matthew Page <work@mjp.co>
 * @extends Sprite
 */
class BubbleScore extends Bubble {
	/**
	 * Create a score bubble.
	 *
	 * @param {SpaceInvaders} game - The current game.
	 * @param {number} startX - Starting X position.
	 * @param {number} startY - Starting Y position.
	 * @param {string} id - Unique HTML DOM id.
	 * @param {number} value - Value displayed in the bubble.
	 */
	constructor(game, startX, startY, id, value) {
		super(game, startX, startY, id, value);
		this.direction = 180;
		this.domElement.classList.add('score');
	}
}