/** 
 * Abstract factory, extended by BubbleFactory, EnemyFleet, BonusFactory etc - provides basic factory operations.
 * Timed auto creation option, random timer
 *
 * @author Matthew Page <work@mjp.co>
 * @property {SpaceInvaders} game - Main game instance
 * @property {number} makeCounter - Count of how many instances have been made by this factory
 * @property {array} items - Store the items created in here.
 * @property {number} maxItems - Maximum number of items in the store
 * @property {number} minDelay - Minimum delay before auto creating
 * @property {number} maxDelay - Maximum delay before auto creating
 * @property {number} countdown - Countdown till the next auto create
 */
class Factory {
	/**
	 * Make the factory instance
	 *
	 * @param {SpaceInvaders} game - Main game instance
	 * @param {number} maxItems - Maximum number of items in the store
	 * @param {number} minDelay - Minimum delay before auto creating
	 * @param {number} maxDelay - Maximum delay before auto creating
	 */
	constructor(game, maxItems, minDelay, maxDelay) {
		this.game = game;
		this.makeCounter = 0;
		this.items = [];
		this.maxItems = maxItems;
		this.minDelay = minDelay;
		this.maxDelay = maxDelay;
		this.countdown = 0;
		this.resetCountdown();
	}
	/**
	 * Restart the auto make countdown based on max / min delay 
	 *
	 */
	resetCountdown() {
		this.countdown = Math.floor(Math.random() * (this.maxDelay-this.minDelay)) + this.minDelay;
	}
	/**
	 * Usuall method called to make a new item in this factory 
	 *
	 */
	make() {
		if(this.canMake()) {
			this.makeCounter += 1;
			this.items.push(this.makeItem());
			return true;	
		} else {
			return false;
		}
	}
	/**
	 * Make the actual item, called by the make() method
	 *
	 * @returns {Object} Returns the instance created
	 */
	makeItem() {
		// Always overide by parent class
		// return new Object(x,y,z);
		// EnemyFleet.makeItem -> return new EmenyShip(x,y,z)
	}
	/**
	 * Check if we can make a new instance based on maxItems
	 *
	 * @returns {boolean}
	 */
	canMake() {
		return (this.maxItems > 0 && this.items.length < this.maxItems)?true:false;
	}
	/**
	 * Destroy an instance created by this factory
	 *
	 * @param {Object} item - The item / instance to destroy
	 * @returns {Object} Returns the instance created
	 */
	destroy(item) {		
		/* Loop the array in reverse to enable splicing out elements */
		for(let index=this.items.length-1; index >= 0; index--) {
			if(this.items[index].id == item.id) {
				this.items[index].isActive = false;
				this.items[index].destroyDomElement();  // ???????????????????
				this.items.splice(index, 1);
				return true;
			}
		} 
		return false;
	}
	/**
	 * Main update loop
	 *
	 */
	update() {
		/* Auto create on random time settings (BonusDrops) */
		if(this.maxDelay > 0) {
			this.countdown -= 1;
			if(this.countdown < 0) {
				this.make();
				this.resetCountdown();
			}
		}
		/* Call update() on all the items, or destroy if not active */
		this.items.forEach((item, index) => {
			if(item.isActive) {
				item.update();
			} else {
				this.destroy(item);	
			}
		});
		return true;
	}
	/**
	 * Destroy all items and reset the data
	 *
	 */
	reset() {
		this.items.forEach(function(item, index) {
			item.domElement.parentNode.removeChild(item.domElement);
		});
		this.items = [];
		this.makeCounter = 0;
		this.resetCountdown();
	}
	
}