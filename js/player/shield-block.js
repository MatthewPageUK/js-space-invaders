/**
 * Individual shield block item (16x16 block), lots of these make up
 * the entire shield grid
 *
 * @author Matthew Page <work@mjp.co>
 * @extends Sprite
 * @property {number} gridX - The position of this block in the main shield grid
 * @property {number} gridY - The position of this block in the main shield grid
 * @property {ShieldGrid} shieldGrid - The main shield grid this block is a part of
 */
class ShieldBlock extends Sprite {
	/**
	 * Create a single shield block
	 *
	 * @param {SpaceInvaders} game - The current game instance
	 * @param {ShieldGrid} shieldGrid - The whole shield grid instance (factory)
	 * @param {number} gridX - The shield grid X position
	 * @param {number} gridY - The shield grid Y position
	 */
	constructor(game, shieldGrid, gridX, gridY) {
		/* Sprite(game, id, posX, posY, width, height, velocity, direction, hitPoints) */
		super(game, "shieldBlock"+gridX+"x"+gridY, gridX * 16, gridY * 16, 16, 16, 0, 0, 1);
		this.gridX = gridX;
		this.gridY = gridY;
		this.shieldGrid = shieldGrid;
		this.makeDomElementInside(this.shieldGrid, 'shieldBlock');
		this.domElement = document.getElementById(this.id);
		this.domElement.style.top = this.posY+"px";
		this.domElement.style.left = this.posX+"px";
	}
	/**
	 * Receive damage and destroy this shield block
	 *
	 * @returns {boolean} True if this killed it, false if just wounded
	 */
	receiveDamage(damage) {
		if(this.isActive) {
			new Audio('sfx/shieldhit.mp3').play();
			this.game.explosionFactory.make(this.posX+(this.width/2), this.posY+(this.height/2)+this.shieldGrid.posY, 'black', 10, 6, 1);
			this.destroy();
			return true;
		}
	}
	/**
	 * Destroy this shield block, hide the DOM Element and remove
	 * instance from the shieldBlocks array.
	 *
	 * @returns {boolean}
	 * @todo Delete the DOM element, pass this control to the shieldBlock factory?
	 */
	destroy() {
		this.domElement.style.display = "none";
		this.shieldGrid.shieldBlocks[this.gridY][this.gridX] = false;
		// dom element ?
		return true;
	}
}