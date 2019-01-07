/** 
 * HTML DOM based sprite used for enemies, bullets, bombs etc
 * Handles drawing, collision detection base routines
 *
 * @property {string} id - Unique HTML DOM id
 * @property {string} isActive - Is this sprite active or not
 * @property {string} game - The main game instance
 * @property {string} posX - X position in the world (HTML DOM coords)
 * @property {string} posY - X position in the world (HTML DOM coords)
 * @property {string} width - Width of this sprite in pixels
 * @property {string} height - Height of this sprite in pixels
 * @property {string} velocity - Speed this sprite is moving (pixels per frame)
 * @property {string} direction - Bearing from north in degrees
 * @property {string} hitPoints - Current hit points / health
 * @property {string} domElement - The HTML DOM element of this sprite (usually a div)
 * @author Matthew Page <work@mjp.co>
 *
 */
class Sprite {
	/**
	 * Create a new sprite, sets properties.
	 *
	 * @param {Game} game - The game instance.
	 * @param {string} id - Unique DOM element id.
	 * @param {number} posX - Position in the world / screen.
	 * @param {number} posY - Position in the world / screen.
	 * @param {number} width - Element width
	 * @param {number} height - Element height
	 * @param {number} velocity - Speed of element, pixels move per frame
	 * @param {number} direction - Direction of element, bearing in degress from north. 0-up, 180-down etc
	 * @param {number} hitPoints - Number of hit points to start with
	 */
	constructor(game, id, posX, posY, width, height, velocity, direction, hitPoints) {
		this.id = id;
		this.isActive = true;
		this.game = game;
		this.posX = posX;
		this.posY = posY;
		this.width = width;
		this.height = height;
		this.velocity = velocity;
		this.direction = direction;
		this.hitPoints = hitPoints;
		this.domElement = false;
	}
	/**
	 * Make the DOM element for this sprite inside the Game element.
	 *
	 * @param {string} css - CSS style to apply to the element.
	 * @returns {boolean}
	 */
	makeDomElement(css) {
		this.makeDomElementInside(this.game, css);
		return true;
	}
	/**
	 * Make the DOM element for this sprite inside the supplied element
	 * and assign it the supplied css class.
	 *
	 * @param {Sprite} parent - The parent sprite or object with a DOM element.
	 * @param {string} css - CSS style to apply to the element.
	 * @returns {boolean}
	 */
	makeDomElementInside(parent, css) {
		let div = document.createElement('div');
		div.id = this.id;
		div.setAttribute('class', css);
		parent.domElement.appendChild(div);	
		return true;
	}
	/**
	 * Remove this DOM element from the HTML document.
	 *
	 * @returns {boolean}
	 */
	destroyDomElement() {
		this.domElement.parentNode.removeChild(this.domElement);
		return true;
	}
	/**
	 * Update loop, call the move() and draw() methods.
	 *
	 * @returns {boolean}
	 */
	update() {
		if(this.isActive) {
			this.move();
			this.draw();
		}
		return true;
	}
	/**
	 * Move the sprite, overide this method in classes extending the Sprite class.
	 * Called on every game loop.
	 *
	 * @returns {boolean}
	 */
	move() {
		// Overide this function in the parent class
		return true;
	}
	/**
	 * Update the DOM Element style properties to move the sprite
	 *
	 */
	draw() {
		if(this.isActive) {
			this.domElement.style.left = `${Math.round(this.posX)}px`;
			this.domElement.style.top = `${Math.round(this.posY)}px`;
			this.domElement.style.width = `${Math.round(this.width)}px`;
			this.domElement.style.height = `${Math.round(this.height)}px`;
		}
	}
	/**
	 * Detect collision between two sprites. Checks for any gaps between
	 * the sprites.
	 *
	 * @param {Sprite} sprite - The sprite we are checking for a collision with.
	 * @returns {boolean} True if collision
	 */
	detectCollisionWith(sprite) {
		return !(
			((this.posY + this.height) < (sprite.posY)) ||
			(this.posY > (sprite.posY + sprite.height)) ||
			((this.posX + this.width) < sprite.posX) ||
			(this.posX > (sprite.posX + sprite.width))
		);
	}
	/**
	 * Is the x, y game world point inside this sprite.
	 *
	 * @param {number} x - The X position.
	 * @param {number} y - The Y position.
	 * @returns {boolean} True if inside
	 */
	inMe(x, y) {
		return ( x > this.posX && x < this.posX+this.width && y > this.posY && y < this.posY+this.height );
	}
	/**
	 * Receive damage on this sprite, what happens when hit points < 0 is handled
	 * by the class that extended the sprite class.
	 * If hit points < 0 returns True to indicate this was a kill
	 *
	 * @param {number} damage - The amount of damage received.
	 * @returns {boolean} True if this was a kill shot
	 */
	receiveDamage(damage) {
		this.hitPoints -= damage;
		return (this.hitPoints<=0)?true:false;
	}
	/**
	 * Receive health
	 *
	 * @param {number} health - The amount of health / hit points received.
	 * @returns {boolean}
	 */
	receiveHealth(health) {
		this.hitPoints += health;	
		return true;
	}
}