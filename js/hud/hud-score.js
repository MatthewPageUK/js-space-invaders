/** 
 * Show player score on screen. 
 *
 * @author Matthew Page <work@mjp.co>
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
	* Update the content of the score DOM element <div>.
	*
	* @returns {boolean} Success or failure.
	*/
	update() {
		this.domElement.innerHTML = "Score : "+this.game.score;
		return true;
	}
}