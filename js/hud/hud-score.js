/** 
 * Show player score on screen. 
 *
 * @author Matthew Page <work@mjp.co>
 * @class
 * @extends hudComponent
 */
class hudScore extends hudComponent {
	/**
	 * Create a new score HUD display
	 *
	 * @param {SpaceInvaders} game - The current game instance
	 */
	constructor(game) {
		/* hudComponent(game, player) */
		super(game, false);
		this.domElement = document.getElementById('hudScore');
	}
	/**
	 * Update the score value in the HTML DOM element
	 *
	 */
	update() {
		this.domElement.innerHTML = "Score : "+this.game.score;
		return true;
	}
}