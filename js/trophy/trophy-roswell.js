/** 
 * Roswell Trophy - kill the UFO while other enemies remain
 *
 * @author Matthew Page <work@mjp.co>
 * @property {EnemyFleet} enemyFleet - The enemy fleet and ships
 * @property {boolean} isActive - Is it active or been won
 * @property {Object} domElement - The HTML DOM element
 */
class TrophyRoswell {
	/**
	 * Make the trophy instance.
	 *
	 * @param {EnemyFleet} enemyFleet - The enemy fleet instance.
	 */
	constructor(enemyFleet) {
		this.enemyFleet = enemyFleet;
		this.isActive = true;
		this.domElement = document.getElementById('trophyRoswell');
		this.domElement.style.opacity = 0.1;
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
	 * Check if there is no UFO ship but still have enemy ships
	 *
	 * @returns {boolean}
	 * @todo This is not efficient for what it is ...
	 */
	check() {
		let hasUFO = false;
		this.enemyFleet.items.forEach((enemyShip) => {
			if(enemyShip.constructor.name == "EnemyUFO") hasUFO = true;			
		});	
		return (!hasUFO && this.enemyFleet.items.length > 0);
	}
}