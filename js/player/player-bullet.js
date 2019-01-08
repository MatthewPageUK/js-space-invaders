/**
 * Player bullet, created by the player gun. Movement and collision detection
 *
 * @author Matthew Page <work@mjp.co>
 * @extends Sprite
 * @property {Player} player - The player who fired this bullet
 * @property {PlayerGun} gun - The players gun that fired this bullet
 * @property {number} damage - The amount of damage this bullet inflicts
 */
class Bullet extends Sprite {
	/**
	 * Create the individual bullet instance.
	 *
	 * @param {Game} game - The current game instance.
	 * @param {Gun} gun - The player gun that fired this bullet.
	 * @param {Player} player - The player instance.
	 * @param {string} id - Unique DOM element id.
	 */
	constructor(game, gun, player, id) {
		/* Sprite(game, id, posX, posY, width, height, velocity, direction, hitPoints) */
		super(game, id, player.posX+10, player.posY-15, 10, 16, 4, false, false);
		
		this.player = player;
		this.gun = gun;
		this.damage = 1;
		this.makeDomElement('bullet');
		this.domElement = document.getElementById(this.id);
	}
	/**
	 * Main update loop, movement and collision detection.
	 *
	 * @returns {boolean} Success or failure.
	 */
	update()
	{
		this.posY -= this.velocity;
		
		/* Gone off screen, missed so destroy the bullet */
		if(this.posY < -this.height)								
		{
			this.gun.notifyMiss(this);
			this.player.killstreak = 0;
			this.gun.destroy(this);
			return false;
		}
		else
		{
			/* Collision detection - is this bullet inside the ShieldGrid / ShieldBlock */
			let shieldBlock = false;
			shieldBlock = this.game.shieldGrid.getShieldBlockAt(this.posX+(this.width/2), this.posY);
			if(shieldBlock) {
				this.game.explosionFactory.make(this.posX+(this.width/2), this.posY-8, 'black', 10, 6, 1);
				shieldBlock.destroy();
				this.player.killstreak = 0;
				this.gun.notifyMiss(this);
				this.gun.destroy(this);
				return false;
			}
			
			/* Collision detection - is this bullet inside an enemy ship. */
			for (let index = 0; index < this.game.enemyFleet.items.length; ++index) {
				if(this.detectCollisionWith(this.game.enemyFleet.items[index])) {
					this.inflictDamage(this.game.enemyFleet.items[index]);
					this.gun.notifyHit(this);
					this.gun.destroy(this);
					return false;
				}
			}
		}
		this.draw();
		return true;
	}
	/**
	 * Inflict damage on an enemy ship by calling its receiveDamage method.
	 *
	 * @param {EnemyShip} enemyShip - The ship we are inflicting damage on.
	 * @returns {boolean} Success or failure.
	 */
	inflictDamage(enemyShip) {
		this.game.explosionFactory.make(this.posX+(this.width/2), this.posY-20, 'grey', 15, 4, 0);
		if(enemyShip.receiveDamage(this.damage)) {
			/* Kill shot */
			this.player.killstreak += 1;
		} else {
			/* Hit but didn't die */
			this.player.killstreak = 0;
		}
		return true;
	}
}

