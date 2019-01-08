/** 
 * Show enemy fleet / total enemies on screen. 
 *
 * @author Matthew Page <work@mjp.co>
 * @extends hudComponent
 */
class hudEnemy extends hudComponent {
	/**
	* Create the enemy fleet totals hud component.
	*
	* @param {SpaceInvaders} game - The current game.
	* @param {PlayerShip} - The current player ship.
	* @param {EnemyFleet} - The enemy fleet of ships.
	*/
	constructor(game, player, enemyFleet) {
		/* hudComponent(game, player) */
		super(game, player);
		this.domElement = document.getElementById('hudEnemy');
		this.enemyFleet = enemyFleet;
	}
	/**
	* Update the content of the enemy DOM element <div>.
	*
	* @returns {boolean} Success or failure.
	*/
	update() {
		this.domElement.innerHTML = `Enemies : ${this.enemyFleet.totalAlive}`;
		return true;
	}
}