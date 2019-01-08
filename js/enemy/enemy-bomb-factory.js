/** 
 * Controls the creation and destruction of enemy bombs.
 *
 * @author Matthew Page <work@mjp.co>
 * @extends Factory
 */
class EnemyBombFactory extends Factory {
	/**
	 * Create the bomb factory.
	 *
	 * @param {SpaceInvaders} game - The current game instance.
	 */
	constructor(game) {
		/* Factory(game, maxItems, minDelay, maxDelay) */
		super(game, 100, 0, 0);
	}
	/**
	 * Public make method to drop a new bomb.
	 *
	 * @param {EnemyShip} droppedBy - The enemy ship that dropped this bomb.
	 * @returns {boolean} True or false if bomb was dropped.
	 */
	make(droppedBy) {
		if(this.canMake()) {
			this.makeCounter += 1;
			this.items.push(this.makeItem(droppedBy));
			return true;
		} else {
			return false;
		}
	}
	/**
	 * Private method, make a new Bomb and return the instance.
	 *
	 * @param {EnemyShip} droppedBy - The enemy ship that dropped this bomb.
	 * @returns {EnemyBomb} The bomb instance created.
	 */
	makeItem(droppedBy) {								
		return new EnemyBomb(this.game, this, droppedBy, "enemyBomb"+this.makeCounter)
	}		
}