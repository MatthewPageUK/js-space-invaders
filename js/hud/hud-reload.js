/** 
 * Gun reload on screen representation (Bullet factory max bullets) 
 *
 * @author Matthew Page <work@mjp.co>
 * @extends hudComponent
 */
class hudReload extends hudComponent {
	/**
	* Create the accuracy hud component.
	*
	* @param {SpaceInvaders} game - The current game.
	* @param {PlayerGun} - The current player gun.
	*/
	constructor(game, gun) {
		/* hudComponent(game, player) */
		super(game, false);
		this.domElement = document.getElementById('hudReload');
		this.gun = gun;
	}
	/**
	* Update the content of the gun reload DOM element <div>.
	*
	* @returns {boolean} Success or failure.
	*/
	update() {
		if(this.gun.canFire()) {
			this.domElement.innerHTML = "READY";
			this.domElement.classList.remove('reloading');
			this.domElement.classList.add('ready');
		} else {
			this.domElement.innerHTML = "RELOADING";
			this.domElement.classList.remove('ready');
			this.domElement.classList.add('reloading');
		}
		return true;
	}
}