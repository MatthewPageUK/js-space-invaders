/** 
 * First Strike Trophy - First shot gets a kill
 *
 * @author Matthew Page <work@mjp.co>
 * @property {PlayerGun} gun - The player gun
 * @property {EnemyFleet} enemyFleet - The enemy fleet and ships
 * @property {boolean} isActive - Is it active or been won
 * @property {Object} domElement - The HTML DOM element
 */
class TrophyFirstStrike {
	/**
	 * Make a first strike trophy instance.
	 *
	 * @param {PlayerGun} gun - The player gun.
	 * @param {EnemyFleet} enemyFleet - The enemy fleet and ships.
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
	 */
	update() {
		if(this.check()) this.giveToPlayer();
	}
	/**
	 * Give this trophy to the player, just sets the opacity but could do more.
	 *
	 */
	giveToPlayer() {
		this.domElement.style.display = 'block';
		this.domElement.style.opacity = 1;
	}
	/**
	 * One shot one kill BUGGED !!!!!
	 *
	 * @returns {boolean} True if trophy requirements have been met
	 * @todo This is bugged code, fix it
	 */
	check() {
		return (this.gun.shotsFired == 1 && this.enemyFleet.deaths == 1);
	}
}