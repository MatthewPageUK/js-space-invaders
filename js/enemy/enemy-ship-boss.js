/** 
 * Enemy Boss - has more hitPoints, higher score and different image. Extends the standard EnemyShip
 *
 * @author Matthew Page <work@mjp.co>
 * @extends EnemyShip
 */
class EnemyBoss extends EnemyShip {
	/**
	 * Create an enemy boss ship.
	 *
	 * @param {SpaceInvaders} game - The current game.
	 * @param {EnemyFleet} fleet - Factory that created this instance.
	 * @param {EnemyBombFactory} bombFactory - Factory to create enemy bombs.
	 * @param {number} startX - Starting X position.
	 * @param {number} startY - Starting Y position.
	 * @param {number} direction - Direction ship is moving.
	 * @param {string} id - Unique DOM ID.
	 */
	constructor(game, fleet, bombFactory, startX, startY, direction, id) {
		/* EnemyShip(game, fleet, bombFactory, startX, startY, direction, id, css) */
		super(game, fleet, bombFactory, startX, startY, direction, id, 'boss');
		this.hitPoints = 2;
		this.scoreValue = 25;
	}
}