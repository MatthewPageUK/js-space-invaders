/** 
 * Show player kill streak on screen. 
 *
 * @author Matthew Page <work@mjp.co>
 * @class
 * @extends hudComponent
 */
class hudKillstreak extends hudComponent {
	constructor(game, player) {
		// hudComponent(game, player)
		super(game, player);
		this.domElement = document.getElementById('hudKillstreak');
	}
	update() {
		this.domElement.innerHTML = `<span>Killstreak</span>${this.player.killstreak}`;
		return true;
	}
}