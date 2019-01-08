/*  */
/**
 * Wrapper and factory for the entire grid of shield blocks. Makes up the whole
 * shield. 
 * 0 - No shield
 * 1 - Standard shield block
 * 2 - Different colour shield block
 *
 * @author Matthew Page <work@mjp.co>
 * @extends Sprite
 * @property {array} shieldBlocks - The main shield grid array, stores all the shield blocks
 * @property {array} shieldPattern - A pattern to read and turn into the shield grid
 */
class ShieldGrid extends Sprite {
	/**
	 * Create a new shield grid
	 *
	 * @param {SpaceInvaders} game - The current game instance
	 */
	constructor(game) {
		/* Sprite(game, id, posX, posY, width, height, velocity, direction, hitPoints) */
		super(game, 'shieldGrid1', 0, 350, 640, 64, 0, 0, 1);

		this.shieldBlocks = [];
		this.shieldPattern = [
			[0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0],
			[0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,2,2,2,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0],
			[0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0],
			[0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0]
		];
		this.makeDomElement('shieldGrid');
		this.domElement = document.getElementById(this.id);
		this.makeGrid(this.shieldPattern);
	}
	/**
	 * Make the grid pattern by creating new ShieldBlock instances
	 * Populates the shieldBlocks array from shieldPattern
	 *
	 * @param {array} pattern - The shield pattern array to make
	 */
	makeGrid(pattern) {
		this.shieldBlocks = [];
		/* Scan the shieldBlocks array and replace '1' or '2' with new ShieldBlock instances */
		for(let gridY=0; gridY<4; ++gridY) {
			this.shieldBlocks[gridY] = [];
			for(let gridX=0; gridX<40; ++gridX) {
				if(pattern[gridY][gridX]==1) {					
					this.shieldBlocks[gridY][gridX] = new ShieldBlock(this.game, this, gridX, gridY);
				}
				else if(pattern[gridY][gridX]==2) {					
					this.shieldBlocks[gridY][gridX] = new ShieldBlock(this.game, this, gridX, gridY);
					this.shieldBlocks[gridY][gridX].domElement.classList.add('strong');
					this.shieldBlocks[gridY][gridX].hitPoints = 1000; // not implemented in receiveDamage
				}
				else {
					this.shieldBlocks[gridY][gridX] = false;
				}
			}
		}
	}
	/**
	 * Reset the shield to default. Remove all the shield blocks from the
	 * shield grid HTML dom element.
	 *
	 */
	reset() {
		this.domElement.innerHTML = "";
		this.makeGrid(this.shieldPattern);
	}
	/**
	 * Return the ShieldBlock instance at the global pixel coord provided.
	 * Converts to the local shieldGrid coords (40x4 grid)
	 *
	 * @param {number} x - Global X pixel position
	 * @param {number} y - Global y pixel position
	 * @returns {ShieldBlock} Or false if position is empty
	 */
	getShieldBlockAt(x, y) {	
		if(this.inMe(x, y)) {
			let gridY = Math.floor( (y - this.posY)/16 );
			let gridX = Math.floor( x / 16 );
			return this.shieldBlocks[gridY][gridX];
		}
	}
	/**
	 * Return the ShieldBlock(s) that are colliding with the supplied
	 * Sprite instance. Uses the shieldGrid array to quickly find all
	 * the blocks touching the sprite
	 *
	 * @param {Sprite} sprite - The sprite instance colliding with the shield.
	 * @returns {ShieldBlock[]} Array of shieldBlocks in collision with sprite.
	 */
	getShieldBlocksCollidingWith(sprite) {
		let blocks = [];
		if(sprite.posY + sprite.height > this.posY) {
			/* The first row of the shield grid the sprite touches */
			let startY = Math.floor((sprite.posY-this.posY)/16);
			startY = startY < 0 ? 0 : startY;
			
			/* The last row of the shield grid the sprite touches */
			let endY = Math.ceil((sprite.posY+sprite.height-this.posY)/16);
			endY = endY < 0 ? 0 : endY;
			endY = endY > 3 ? 3 : endY;
			
			/* Loop through the shield grid */
			for(let gridY=startY; gridY<endY; ++gridY) {
				for(let gridX = Math.floor(sprite.posX/16); gridX <= Math.ceil((sprite.posX+sprite.width)/16); ++gridX) {					
					if(this.shieldBlocks[gridY][gridX]) {
						blocks.push(this.shieldBlocks[gridY][gridX]);
					}
				}
			}
		}
		return blocks;
	}
}
