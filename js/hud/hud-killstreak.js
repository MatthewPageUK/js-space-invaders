/** 
 * Show player kill streak on screen. 
 *
 * @author Matthew Page <work@mjp.co>
 * @extends hudComponent
 */
class hudKillstreak extends hudComponent {
	/**
	* Create the accuracy hud component.
	*
	* @param {SpaceInvaders} game - The current game.
	* @param {PlayerShip} - The current player ship.
	*/
	constructor(game, player) {
		/* hudComponent(game, player) */
		super(game, player);
		this.domElement = document.getElementById('hudKillstreak');
	}
	/**
	* Update the content of the killstreak DOM element <div>.
	*
	* @returns {boolean} Success or failure.
	*/
	update() {
		this.domElement.innerHTML = `<span>Killstreak</span>${this.player.killstreak}`;
		return true;
	}
}