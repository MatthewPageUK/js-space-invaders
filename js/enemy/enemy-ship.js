/** 
 * The basic enemy ship, bomb countdown, movement logic etc. Extended by other ship types. 
 *
 * @author Matthew Page <work@mjp.co>
 * @extends Sprite
 * @property {SpaceInvaders} game
 * @property {EnemyFleet} fleet - The Enemy Fleet factory instance.
 * @property {number} scoreValue - Score player gets for shooting this ship down.
 * @property {number} rotation - Rotation angle for death animation.
 * @property {number} lastDirection - The last direction the ship was moving.
 * @property {number} moveCounter - Counter used in the movement logic.
 * @property {boolean} isDying - Is this ship in its death animation.
 * @property {number} maxBombReload - Max number of frames before another bomb can be dropped.
 */
class EnemyShip extends Sprite {
	/**
	* Create an enemy ship.
	*
	* @param {SpaceInvaders} game - The current game.
	* @param {EnemyFleet} fleet - Factory that created this instance.
	* @param {EnemyBombFactory} bombFactory - Factory to create enemy bombs.
	* @param {number} startX - Starting X position.
	* @param {number} startY - Starting Y position.
	* @param {number} direction - Direction ship is moving.
	* @param {string} id - Unique DOM ID.
	* @param {string} css - Additional CSS class to be assigned to this ship.
	*/
	constructor(game, fleet, bombFactory, startX, startY, direction, id, css) {
		/* Sprite(game, id, posX, posY, width, height, velocity, direction, hitPoints) */
		super(game, id, startX, startY, 40, 40, 1, direction, 1);
		this.fleet = fleet;
		this.bombFactory = bombFactory;
		this.scoreValue = 10;
		this.rotation = 0;
		this.lastDirection = direction;
		this.moveCounter = 0;
		this.isDying = false;
		this.makeDomElement('enemyShip');
		this.domElement = document.getElementById(this.id);
		this.domElement.classList.add(css);
		this.maxBombReload = 1500;
		this.startBombCountdown();
	}
	/**
	 * Reset the bomb counter to a random number, drops 1 each game loop.
	 * When it reaches 0 the update loop will trigger a new bomb to be 
	 * created from the EnemyBombFactory.
	 *
	 */
	startBombCountdown() {
		this.bombCountdown = Math.floor((Math.random() * this.maxBombReload) + 1);
	}
	/**
	 * Main update loop called every animation frame.
	 * Dying - If the ship is dying rotate and shrink it until width < 5
	 * Hit Points - If < 0 start the dying process
	 * Bomb launch - Check the countdown and if < 0 make new bomb
	 * Collision detection - player ship and shieldblock
	 *
	 * @returns {boolean} Success or failure.
	 */
	update() {

		if(this.isDying) {
			/* Ship has been hit and is in its dying animation, spin and shrink */
			this.rotation += 5;
			this.width -= 1;
			this.height -= 1;
			this.posY += 1;
			this.domElement.style.transform = "rotate("+this.rotation+"deg)";
			if(this.width < 5) {
				/* It has died, final object destruction */
				this.fleet.removeShip(this);
			}
		}
		else if(this.hitPoints<=0 && this.isActive) {
			/* Ship is alive, but hitPoints is at or below 0 - time to die */
			this.kill();
		}
		else
		{
			/* Bomb countdown logic */
			this.bombCountdown -= 1;
			if(this.bombCountdown==0) {
				this.bombFactory.make(this);
				this.startBombCountdown();
			}
			/* Move the ship */
			this.move();	

			/* Collision detection - inside player ship */
			if(this.detectCollisionWith(this.game.player)) {
			   	this.game.player.receiveDamage(1000);
				this.isDying = true;
				return true;
			}

			/* Collision detection - inside shieldBlock */
			let blocksHit = this.game.shieldGrid.getShieldBlocksCollidingWith(this);
			blocksHit.forEach((shieldBlock, index) => {
				shieldBlock.receiveDamage(1000);
			});
			
			//console.log(`Shield Block Hit - ${shieldBlockHit}`);
			if(blocksHit.length>0) {
				//console.log('SHIELD HIT BY SHIP');
				this.isDying = true;
				return true;
			}
			
		}
		this.draw();
	}
	/**
	 * Process the movememnt logic - Move till edge, move down for 25 frames, move back other direction.
	 *
	 */
	move() {
		switch (this.direction) {
			case 90:										// Move right
				this.posX += this.velocity;
				if (this.posX >= 600)						// Reached end of display
				{
					this.posX = 600;
					this.lastDirection = this.direction;	// Remember the last direction
					this.direction = 180;					// New direction is down
					this.velocity = 2;						// New speed
					this.moveCounter = 0;					// Reset move counter to record how far down we go
				}
				break;
			case 180:										// Move down
				this.posY += this.velocity;
				this.moveCounter += 1;
				if(this.moveCounter > 25)
				{
					this.direction = (this.lastDirection == 90)?270:90;
					this.velocity = 1;
					this.moveCounter = 0;
				}
				break;
			case 270:
				this.posX -= this.velocity;
				if (this.posX <= 0)
				{
					this.posX = 0;
					this.lastDirection = this.direction;
					this.direction = 180;
					this.velocity = 2;
					this.moveCounter = 0;
				}
				break;
		}
	}
	/**
	 * Kills the enemy ship and starts the death animation loop, updates Score.
	 *
	 */
	kill() {
		this.isDying = true;
		new Audio('sfx/enemydie.mp3').play();
		this.game.score += this.scoreValue;
		this.game.bubbleFactory.make("score", this.scoreValue, this.posX, this.posY);
	}
}
