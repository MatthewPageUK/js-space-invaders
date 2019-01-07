/** 
 * Killstreak Trophy - Get 10 kills in a row without taking damage or missing
 *
 * @author Matthew Page <work@mjp.co>
 * @class
 */
class TrophyKillstreak {
	/**
	 * Make a new enemy bomb.
	 *
	 * @param {SpaceInvaders} game - The current game instance.
	 * @param {EnemyBombFactory} bombFactory - The bomb factory that created this bomb.
	 * @param {EnemyShip} droppedBy - The enemy ship that dropped this bomb.
	 * @param {string} id - Unique HTML DOM id.
	 */
	constructor(player) {
		this.player = player;
		this.isActive = true;
		this.domElement = document.getElementById('trophyKillstreak');
		this.domElement.style.opacity = 0.1;
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
	 * Check the player killstreak value
	 *
	 * @method check
	 * @returns {boolean}
	 */
	check() {
		return ( this.player.killstreak == 10 );
	}
}
