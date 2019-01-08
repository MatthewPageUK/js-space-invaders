/**
 * Player 1 ship
 *
 * @author Matthew Page <work@mjp.co>
 * @extends Sprite
 * @property {string} keyState - The current key state
 * @property {number} killstreak - The currnet killstreak value
 * @property {number} maxHitPoints - Maximum health / hit points this ship can have
 * @property {number} upgradeLevel - The level of upgrade for the gun from bonus drops
 */
class PlayerShip extends Sprite {
	/**
	 * Create the ship instance
	 *
	 * @param {Game} game - The current game instance.
	 * @param {string} id - Unique DOM element id.
	 */
	constructor(game, id) {
		/* Sprite(game, id, posX, posY, width, height, velocity, direction, hitPoints) */
		super(game, id, 200, game.height-45, 35, 27, 5, 90, 25);
		
		this.domElement = document.getElementById(id);
		this.domElement.classList.add('ship1');
		this.gun = new PlayerGun(this.game, this);
		this.keyState = "";	
		this.killstreak = 0;
		this.maxHitPoints = 30;
		this.upgradeLevel = 0;
	}
	/**
	 * Reset the player to default
	 *
	 */
	reset() {
		this.posX = 200;
		this.removeUpgrade();
		this.killstreak = 0;
		this.gun = new PlayerGun(this.game, this);
		this.keyState = "";
		this.hitPoints = 25;
	}
	/**
	 * Receive the keydown and keyup events from the main game instance
	 *
	 * @param {string} type - Keydown or Keyup
	 * @param {string} command - Left, Right or Fire
	 */
	receiveCommand(type, command) {	
		if(type=='keydown') {
			if(command=='right') this.keyState = 'right';
			if(command=='left') this.keyState = 'left';
			if(command=='fire') this.gun.fireGun();
		}
		else if(type=='keyup') {
			if(command=='right') this.keyState = (this.keyState=='left')?'left':'';
			if(command=='left') this.keyState = (this.keyState=='right')?'right':'';
		}
	}
	/**
	 * Get a gun upgrade, called from BonusDrop / Gun object
	 *
	 * @param {number} upgradeAmount - Amount of gun upgrade applied
	 */
	receiveUpgrade(upgradeAmount) {
		if(this.upgradeLevel==0) {
			this.upgradeLevel = 1;
			this.domElement.classList.add('ship2');
			this.domElement.classList.remove('ship1');
			this.gun.maxItems = upgradeAmount;
		}
		return true;		
	}
	/**
	 * Remove the gun upgrade
	 *
	 */
	removeUpgrade() {
		if(this.upgradeLevel==1) {
			this.upgradeLevel = 0;
			this.domElement.classList.add('ship1');
			this.domElement.classList.remove('ship2');
			this.gun.maxItems = 1;
		}
		return true;
	}
	/**
	 * Receive a health bonus
	 *
	 * @param {number} health - Amount of health / hit points received
	 */
	receiveHealth(health) {
		this.hitPoints += health;			
		if(this.hitPoints > this.maxHitPoints) this.hitPoints = this.maxHitPoints;
		this.game.bubbleFactory.make("health", health, this.posX, this.posY);
	}
	/**
	 * Receive damage from enemy bombs, removes upgrades
	 *
	 * @param {number} damage - Amount of damage received
	 */
	receiveDamage(damage) {
		this.hitPoints -= damage;
		this.removeUpgrade();
		this.killstreak = 0;
		this.game.bubbleFactory.make("damage", damage, this.posX, this.posY);
		this.game.explosionFactory.make(this.posX+(this.width/2), this.posY+5, 'black', 10, 4, 1);
		new Audio('sfx/playerhit.mp3').play();
	}
	/**
	 * Main player update loop, move, draw etc.
	 *
	 */
	update() {
		if(this.isActive) {
			this.move();
			this.draw();
			this.gun.update();
		}
	}
	/**
	 * Overide Sprite default move() method, base movement on the current keyState
	 *
	 */
	move() {
		if(this.keyState == "right")
		{
			this.posX += this.velocity;
			if(this.posX + this.width > this.game.width) this.posX = this.game.width - this.width;
		}
		if(this.keyState == "left")
		{
			this.posX -= this.velocity;
			if(this.posX < 1) this.posX = 1;
		}
	}
}
