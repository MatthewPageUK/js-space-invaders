/** 
 * Enemy fleet of ships, could also be called Enemy Factory.
 *
 * @author Matthew Page <work@mjp.co>
 * @extends Factory
 * @property {EnemyBombFactory} bombFactory - This handles all the enemy bombs
 * @property {number} deaths - Number of enemy killed in action
 */
class EnemyFleet extends Factory {
	/**
	 * Make a new enemy fleet and populate it with ships.
	 *
	 * @param {SpaceInvaders} game - The current game instance.
	 * @param {EnemyBombFactory} bombFactory - The bomb factory that created this bomb.
	 */
	constructor(game, bombFactory) {
		/* Factory(game, maxItems, minDelay, maxDelay) */
		super(game, 1000, 0, 0);
		this.bombFactory = bombFactory
		this.deaths = 0;
		this.makeFleet();
	}
	/**
	 * Reset for a new game
	 *
	 * @returns {boolean} 
	 */
	reset() {
		this.items.forEach(function(item, index) {
			item.domElement.parentNode.removeChild(item.domElement);
		});
		this.items = [];
		this.makeCounter = 0;
		this.deaths = 0;
		this.resetCountdown();
		this.makeFleet();
	}
	/**
	 * Make a randomised fleet
	 *
	 * @returns {boolean} 
	 */
	makeFleet() {
		/* Make the enemies - randomise bosses, position off screen to start */
		for(let enemies = 0; enemies < 50; ++enemies) {
			if(Math.random() > 0.9) 
			{
				this.make('boss', enemies*-60, 70, 90);
			}
			else
			{
				this.make('standard', enemies*-60, 70, 90);
			}
		}
		this.make('ufo', 300, 25, 270);
	}
	/**
	 * Public make method to create a new enemy ship
	 *
	 * @param {string} type - Type of enemy ship to create (standard, boss, ufo).
	 * @param {number} startX - Starting X position.
	 * @param {number} startY - Starting Y position.
	 * @param {number} direction - Direction enemy ship is travelling
	 * @returns {boolean} 
	 */
	make(type, startX, startY, direction) {
		if(this.canMake()) {
			this.makeCounter += 1;
			this.items.push(this.makeItem(type, startX, startY, direction));
			return true;	
		} else {
			return false;
		}
	}
	/**
	 * Private make item method to create and return new ship instance.
	 *
	 * @param {string} type - Type of enemy ship to create (standard, boss, ufo).
	 * @param {number} startX - Starting X position.
	 * @param {number} startY - Starting Y position.
	 * @param {number} direction - Direction enemy ship is travelling.
	 * @returns {EnemyShip} - The enemy ship instance created.
	 */
	makeItem(type, startX, startY, direction) {
		switch(type) {
			case "standard" :
				return new EnemyShip(this.game, this, this.bombFactory, startX, startY, direction, `enemy${this.makeCounter}`, 'standard');
			break;
				
			case "boss" : 
				return new EnemyBoss(this.game, this, this.bombFactory, startX, startY, direction, `enemy${this.makeCounter}`);
			break;
				
			case "ufo" : 
				return new EnemyUFO(this.game, this, this.bombFactory, startX, startY, direction, `enemy${this.makeCounter}`);
			break;
					
		}
	}
	/**
	 * Get how many enemies are still alive.
	 *
	 * @returns {number} 
	 */
	get totalAlive() {
		return this.items.length;	
	}
	/**
	 * Remove a ship from the fleet.
	 *
	 * @param {EnemyShip} ship - The ship being removed 
	 */
	removeShip(ship) {
		this.deaths += 1;
		this.destroy(ship);
	}
}