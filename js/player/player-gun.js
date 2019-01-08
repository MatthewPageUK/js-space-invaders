/**
 * Player bullet factory aka a Gun - controls creation and destruction of bullets
 *
 * @author Matthew Page <work@mjp.co>
 * @extends Factory
 * @property {number} shotsFired - Total shots fired by this gun during current game
 * @property {number} shotsHit - Total shots hit by this gun during current game
 * @property {number} shotsMissed - Total shots missed by this gun during current game
 */
class PlayerGun extends Factory {
	/**
	 * Create a new player gun
	 *
	 * @param {SpaceInvaders} game - The current game instance
	 * @param {PlayerShip} player - The player instance
	 */
	constructor(game, player) {
		/* Factory(game, maxItems, minDelay, maxDelay) */
		super(game, 1, 0, 0);
		this.player = player;
		this.shotsFired = 0;
		this.shotsHit = 0;
		this.shotsMissed = 0;
	}
	/**
	 * Make a request to fire the gun, won't guarantee a bullet
	 * Call the Factory.make() method to create the bullet instance
	 *
	 * @returns {boolean} True is it was fired, false if not
	 */
	fireGun() {
		if(this.make()) {
			this.shotsFired += 1;
			new Audio('sfx/playerfire.mp3').play();
			return true;
		} else {
			return false;
		}
	}
	/**
	 * Make a new Bullet if the gun can fire, overides default
	 * Factory.make() method
	 *
	 * @returns {boolean} True is it was made, false if not
	 */
	make() {
		if(this.canMake()) {
			this.makeCounter += 1;
			this.items.push(this.makeItem(this.player));
			return true;
		} else {
			return false;
		}
	}
	/**
	 * Makes a new Bullet and returns it, called from 
	 * Factory.make() method
	 *
	 * @returns {Bullet} Return Bullet instance
	 */
	makeItem() {								
		return new Bullet(this.game, this, this.player, "bullet"+this.makeCounter)
	}
	/**
	 * Can the gun fire (can the factory make a new instance at the moment)
	 *
	 * @returns {boolean}
	 */
	canFire() {
		return this.canMake();
	}
	/**
	 * Get the accuracy percentage
	 *
	 * @returns {number}
	 */
	get accuracy() {
		if(this.shotsHit>0) {
			return Math.round((this.shotsHit / (this.shotsHit+this.shotsMissed))*100);	
		} else {
			return 0;	
		}
	}
	/**
	 * Recieve a notification a bullet has hit. Called from Bullet
	 *
	 * @returns {boolean}
	 */
	notifyHit(bullet) {
		this.shotsHit += 1;
		return true;
	}
	/**
	 * Recieve a notification a bullet has missed. Called from Bullet
	 *
	 * @returns {boolean}
	 */
	notifyMiss(bullet) {
		this.shotsMissed += 1;
		return true;
	}
}