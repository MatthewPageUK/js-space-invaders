/** 
 * Show player health bar on screen. 
 *
 * @author Matthew Page <work@mjp.co>
 * @extends hudComponent
 */
class hudHealth extends hudComponent {
/* Health on screen representation */
	/**
	* Create the accuracy hud component.
	*
	* @param {SpaceInvaders} game - The current game.
	* @param {PlayerShip} - The current player ship.
	*/
	constructor(game, player) {
		/* hudComponent(game, player) */
		super(game, player);
		this.domElement = document.getElementById('hudHealth');
	}
	/**
	 * Update the health display, draw a heart for each 5 hit points.
	 */
	update() {
		let hearts = "";
		for(let a=0; a<Math.round(this.player.hitPoints/5); ++a) {
			hearts += "<img src='gfx/health.png'>";	
		}
		this.domElement.innerHTML = hearts;
		return true;
	}
}