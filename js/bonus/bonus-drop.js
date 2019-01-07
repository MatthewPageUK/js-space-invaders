/** 
 * Standard details of a bonus drop, Health / Gun / Score bonus extend this class 
 * Bonus drops are created by BonusDropper
 *
 * @author Matthew Page <work@mjp.co>
 * @extends Sprite
 */
class BonusDrop extends Sprite {
	/**
	 * Create a bonus drop.
	 *
	 * @param {SpaceInvaders} game - The current game.
	 * @param {BonusDropper} factory - Factory that dropped this bonus.
	 * @property {SpaceInvaders} game
	 * @property {Factory} factory
	 */
	constructor(game, factory, id) {
		/* Sprite(game, id, posX, posY, width, height, velocity, direction, hitPoints) */
		super(game, id, Math.random()*game.width, -25, 25, 25, 4, 180, 1);
		this.factory = factory;
		this.makeDomElement('bonusDrop');
		this.domElement = document.getElementById(this.id);
	}
	/**
	 * Main update loop, move the box down, collision detection with player ship.
	 *
	 * @param {PlayerShip} player - The player who collected this bonus.
	 * @returns {boolean} Success or failure.
	 */
	update() {
		this.move();
		if(this.posY > this.game.height) {
			/* Missed it - gone off screen */
			this.factory.destroy(this);
			return true;
		} else if(this.detectCollisionWith(this.game.player)) {
			/* Collect it - collided with the player ship */
			this.collectBonus(this.game.player);
			new Audio('sfx/health.mp3').play();
			this.factory.destroy(this);
			return true;
		} else {
			/* Keep falling */
			this.draw();
			return true;
		}
	}
	/**
	 * Move the bonus drop down
	 *
	 */
	move() {
		this.posY += this.velocity;
	}
	/**
	 * Collect bonus and give it the player - overide this in classes extending this class
	 * such as BonusHealth or BonusGun
	 *
	 * @param {PlayerShip} player - The player who collected this bonus.
	 * @returns {boolean} Success or failure.
	 */
	collectBonus(player) {
		// Overide by parent class 
		return true;
	}
}
