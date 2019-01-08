/** 
 * Hud Component wrapper (abstractish class)
 *
 * @author Matthew Page <work@mjp.co>
 * @property {SpaceInvaders} game - The current game instance
 * @property {Player} player - The current player
 * @property {Object} domElement - The DOM element for this component on screen
 */
class hudComponent {
	/**
	 * Create the hudComponent instance
	 * 
	 * @param {SpaceInvaders} game - The main game instance.
	 * @param {Player} player - The player instance.
	 */
	constructor(game, player) {
		this.game = game;
		this.player = player;
		this.domElement = false;
	}
	/**
	 * Update loop
	 *
	 * @returns {boolean}
	 */
	update() {
		return true;
	}
}