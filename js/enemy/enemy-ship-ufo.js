/** 
 * Enemy UFO - has more hitPoints, higher score, different image and movement logic.
 *
 * @author Matthew Page <work@mjp.co>
 * @extends EnemyShip
 */
class EnemyUFO extends EnemyShip {
	/**
	 * Create an enemy UFO ship.
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
		super(game, fleet, bombFactory, startX, startY, direction, id, 'ufo');
		this.hitPoints = 10;
		this.scoreValue = 50;
		this.velocity = 1.3;
		this.maxBombReload = 100;
		this.height = 38;
		this.width = 80;
	}
	/**
	 * Overide the default EnemyShip.move() method to give the UFO a different movement pattern 
	 * Moves back and forwards across the screen, if it's the last enemy on screen it also 
	 * starts to drop down.
	 *
	 * @returns {boolean}
	 */
	move() {
		switch (this.direction) {
			case 90:			
				this.posX += this.velocity;
				if (this.posX >= this.game.width - this.width) {
					this.posX = this.game.width - this.width;
					this.direction = 270;					
				}
				break;
			case 270:
				this.posX -= this.velocity;
				if (this.posX <= 0) {
					this.posX = 0;
					this.direction = 90;
				}
				break;
		}
		/* Last man standing, start coming down and speed up */
		if(this.fleet.totalAlive==1) {
			this.posY += 0.15;
			this.velocity = 2.5;
		}
		
	}
}