/** 
 * Controls creation and destruction of bonus drops.
 * Uses inherited Factory random timer (minDelay, maxDelay) to create new Bonus Drops 
 * at random intervals
 *
 * @author Matthew Page <work@mjp.co>
 * @extends Factory
 */
class BonusDropper extends Factory {
	/**
	* Create a bonus dropper factory.
	*
	* @param {SpaceInvaders} game - The current game.
	*/
	constructor(game) {
		/* Factory(game, maxItems, minDelay, maxDelay) */
		super(game, 5, 100, 500);
	}
    /**
     * Make a new Bonus Drop item based on a random selection and return it.
	 * Usually called from the inherited Factory.make() method.
	 *
     * @return {BonusDrop} The bonus drop created.
     */
	makeItem() {
		let id = `bonus${this.makeCounter}`;
		if(Math.random() > 0.5) {	
			return(new BonusScore(this.game, this, id));
		} else {
			if(Math.random() > 0.5) {
				return(new BonusHealth(this.game, this, id));
			} else {
				return(new BonusGun(this.game, this, id));	
			}
		}
	}
}
