/** 
 * First Strike Trophy - First shot gets a kill
 *
 * @author Matthew Page <work@mjp.co>
 * @class
 */
class TrophyFirstStrike {
	/**
	 * Make a new enemy bomb.
	 *
	 * @param {SpaceInvaders} game - The current game instance.
	 * @param {EnemyBombFactory} bombFactory - The bomb factory that created this bomb.
	 * @param {EnemyShip} droppedBy - The enemy ship that dropped this bomb.
	 * @param {string} id - Unique HTML DOM id.
	 */
	constructor(gun, enemyFleet) {
		this.gun = gun;
		this.enemyFleet = enemyFleet;
		this.isActive = true;
		this.domElement = document.getElementById('trophyFirstStrike');
		this.domElement.style.opacity = 0.1
	}
	/**
	 * Update loop checks if this trophy has been won
	 * 
	 * @method update
	 */
	update() {
		if(this.check()) this.giveToPlayer();
	}
	/**
	 * Give this trophy to the player, just sets the opacity but could do more.
	 *
	 * @method giveToPlayer
	 */
	giveToPlayer() {
		this.domElement.style.display = 'block';
		this.domElement.style.opacity = 1;
	}
	/**
	 * One shot one kill BUGGED !!!!!
	 *
	 * @method check
	 * @returns {boolean} True if trophy requirements have been met
	 */
	check() {
		return (this.gun.shotsFired == 1 && this.enemyFleet.deaths == 1);
	}
}