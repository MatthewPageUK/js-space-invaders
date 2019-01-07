/* Gun reload on screen representation (Bullet factory max bullets) */

class hudReload extends hudComponent {
	constructor(game, gun) {
		// hudComponent(game, player)
		super(game, false);
		this.domElement = document.getElementById('hudReload');
		this.gun = gun;
	}
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