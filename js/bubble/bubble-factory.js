/** 
 * Creates and manages score / damage and health bubbles (circles with a number in them).
 * Call BubbleFactory.make(type, value, x, y) to make new bubbles
 *
 * @author Matthew Page <work@mjp.co>
 * @extends Factory
 */
class BubbleFactory extends Factory {
	/**
	 * Create a score bubble.
	 *
	 * @param {SpaceInvaders} game - The current game.
	 */
	constructor(game) {
		/* Factory(game, maxItems, minDelay, maxDelay) */
		super(game, 0, 0, 0);
	}
	/**
	 * Public make method to make new bubbles. Overides extended Factory.make method.
	 *
	 * @param {string} type - Type of bubble (score, health, damage).
	 * @param {number} value - Value of the bubble.
	 * @param {number} startX - Starting X position.
	 * @param {number} startY - Starting Y position.
	 * @returns {boolean} True if bubble is made.
	 */
	make(type, value, startX, startY) {
		this.makeCounter += 1;
		this.items.push(this.makeItem(type, value, startX, startY));
		return true;	
	}
	/**
	 * Private makeItem method to make new bubbles.
	 *
	 * @param {string} type - Type of bubble (score, health, damage).
	 * @param {number} value - Value of the bubble.
	 * @param {number} startX - Starting X position.
	 * @param {number} startY - Starting Y position.
	 * @returns {Bubble} The bubble made.
	 */
	makeItem(type, value, startX, startY) {
		switch(type) {
			case "score" :
				return new BubbleScore(this.game, startX, startY, 'bubble'+this.makeCounter, value);
				break;
			case "health" :
				return new BubbleHealth(this.game, startX, startY, 'bubble'+this.makeCounter, value);
				break;
			case "damage" : 
				return new BubbleDamage(this.game, startX, startY, 'bubble'+this.makeCounter, value);
				break;
		}
	}	
}