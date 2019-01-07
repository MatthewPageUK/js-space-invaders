/** 
 * A player health bonus 
 *
 * @author Matthew Page <work@mjp.co>
 * @extends BonusDrop
 */
class BonusHealth extends BonusDrop {
	/**
	 * Create a health bonus drop
	 *
	 * @param {SpaceInvaders} game - Current game
	 * @param {BonusDropper} factory - The bonus dropper factory that created this drop
	 * @param {string} id - Unique DOM ID string
	 */
	constructor(game, factory, id) {
		/* BonusDrop(game, factory, id) */
		super(game, factory, id);
		this.health = 5;
		this.domElement.classList.add('health');
	}
    /**
     * Collect bonus and give it the player - call player receive health.
	 *
	 * @param {PlayerShip} player - The player who collected this bonus
     * @return {Boolean} True or false.
     */
	collectBonus(player) {
		player.receiveHealth(this.health);
		return true;
	}
}
