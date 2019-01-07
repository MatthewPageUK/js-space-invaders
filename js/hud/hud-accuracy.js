/** 
 * Show player shot accuracy on screen. 
 *
 * @author Matthew Page <work@mjp.co>
 * @extends hudComponent
 */
class hudAccuracy extends hudComponent {
	/**
	* Create the accuracy hud component.
	*
	* @param {SpaceInvaders} game - The current game.
	* @param {PlayerShip} - The current player ship.
	*/
	constructor(game, player) {
		/* hudComponent(game, player) */
		super(game, player);
		this.domElement = document.getElementById('hudAccuracy');
	}
	/**
	* Update the content of the accuracy DOM element <div>.
	*
	* @returns {boolean} Success or failure.
	*/
	update() {
		this.domElement.innerHTML = `Accuracy: ${this.player.gun.accuracy}%`;
		return true;
	}
}