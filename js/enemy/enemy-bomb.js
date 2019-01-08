/** 
 * Individual enemy bomb.
 *
 * @author Matthew Page <work@mjp.co>
 * @extends Sprite
 */
class EnemyBomb extends Sprite {
	/**
	 * Make a new enemy bomb.
	 *
	 * @param {SpaceInvaders} game - The current game instance.
	 * @param {EnemyBombFactory} bombFactory - The bomb factory that created this bomb.
	 * @param {EnemyShip} droppedBy - The enemy ship that dropped this bomb.
	 * @param {string} id - Unique HTML DOM id.
	 */
	constructor(game, bombFactory, droppedBy, id) {
		/* Sprite(game, id, posX, posY, width, height, velocity, direction, hitPoints) */
		super(game, id, droppedBy.posX+(droppedBy.width/2)-5, droppedBy.posY+droppedBy.height, 10, 16, 4, 180, 1);
		this.bombFactory = bombFactory;
		this.droppedBy = droppedBy;
		this.damage = 5;
		this.makeDomElement('enemyBomb');
		this.domElement = document.getElementById(this.id);
	}
	/**
	 * Update the movement and perform collision detection for player ship and shield grid.
	 *
	 * @returns {boolean} 
	 */
	update()
	{
		this.move();
		if(this.posY > this.game.height)
		{
			//console.log('BOMB MISSED');
			this.isActive = false;	
		}
		else
		{
			let shieldBlockHit = this.game.shieldGrid.getShieldBlockAt(this.posX+(this.width/2), this.posY+this.height);
			if(shieldBlockHit) {
				//console.log('SHIELD HIT');
				this.inflictDamage(shieldBlockHit);
				this.bombFactory.destroy(this);	
				return true;
			}
			
			if(this.detectCollisionWith(this.game.player))
			{
				//console.log('PLAYER HIT');
				this.inflictDamage(this.game.player);
				this.bombFactory.destroy(this);
				return true;
			}
		}
		this.draw();
		return true;
	}
	/**
	 * Move the bomb down.
	 *
	 */
	move() {
		this.posY += this.velocity;	
	}
	/**
	 * Send damage to the target object via the receiveDamage method.
	 *
	 * @param {PlayerShip | ShieldBlock } target - The object the bomb hit, player ship or shield.
	 * @returns {boolean}
	 */
	inflictDamage(target) {
		target.receiveDamage(this.damage);
		return true;
	}
}