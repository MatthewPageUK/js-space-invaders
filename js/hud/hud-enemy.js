/** 
 * Show enemy fleet / total enemies on screen. 
 *
 * @author Matthew Page <work@mjp.co>
 * @class
 * @extends hudComponent
 */
class hudEnemy extends hudComponent {
	constructor(game, player, enemyFleet) {
		// hudComponent(game, player)
		super(game, player);
		this.domElement = document.getElementById('hudEnemy');
		this.enemyFleet = enemyFleet;
	}
	update() {
		this.domElement.innerHTML = `Enemies : ${this.enemyFleet.totalAlive}`;
		return true;
	}
}