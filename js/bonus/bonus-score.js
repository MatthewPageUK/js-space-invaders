/** 
 * A score bonus dropped from the sky. Created by the BonusDropper factory.
 *
 * @author Matthew Page <work@mjp.co>
 * @extends BonusDrop
 * @property {number} score - The score bonus the player gets when collected.
 */
class BonusScore extends BonusDrop {
	/**
	 * Create a new score bonus drop
	 *
	 * @param {SpaceInvaders} game - Current game
	 * @param {BonusDropper} factory - The bonus dropper factory that created this drop
	 * @param {string} id - Unique DOM ID string
	 */
	constructor(game, factory, id) {
		/* BonusDrop(game, factory, id) */
		super(game, factory, id);
		this.score = 50;
		this.domElement.classList.add('score');
	}
    /**
     * Collect bonus and give it the player - update score and make a bubble fx.
	 *
	 * @param {PlayerShip} player - The player who collected this bonus
     * @return {Boolean} True or false.
     */
	collectBonus(player) {
		this.game.score += this.score;
		this.game.bubbleFactory.make("score", this.score, this.posX+(this.width/2), this.posY-(this.height));
		return true;
	}
}