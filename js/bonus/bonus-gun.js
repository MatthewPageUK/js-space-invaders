/** 
 * A gun bonus, increases bullet factory max bullets (rapid fire) and changes ship image
 *
 * @author Matthew Page <work@mjp.co>
 * @extends BonusDrop
 */
class BonusGun extends BonusDrop {
	/**
	 * Create a gun bonus drop
	 *
	 * @param {SpaceInvaders} game - Current game
	 * @param {BonusDropper} factory - The bonus dropper factory that created this drop
	 * @param {string} id - Unique DOM ID string
	 */
	constructor(game, factory, id) {
		/* BonusDrop(game, factory, id) */
		super(game, factory, id);
		this.upgrade = 5;
		this.domElement.classList.add('gun');
	}
	/**
	 * Collect bonus and give it the player - call player receive upgrade.
	 *
	 * @param {PlayerShip} player - The player who collected this bonus
	 * @return {Boolean} True or false.
	 */
	collectBonus(player) {
		player.receiveUpgrade(this.upgrade);
		return true;
	}
}
