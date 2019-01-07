/** 
 * Hud Component wrapper (abstractish class)
 *
 * @author Matthew Page <work@mjp.co>
 * @class hudComponent
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
	 */
	update() {
		return true;
	}
}