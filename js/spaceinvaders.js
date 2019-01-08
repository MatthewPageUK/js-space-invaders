/** 
 * Space Invaders Game - main game code, loop, event handler 
 *
 * @author Matthew Page <work@mjp.co>
 * @property {number} width - Width of the game in pixels
 * @property {number} height - Height of the game in pixels
 * @property {Object} domElement - DOM element of the game
 * @property {number} score - Current game score
 * @property {boolean} isPaused - Is the game paused
 * @property {string} gameState - State of current game
 * @property {PlayerShip} player - Player 1
 * @property {EnemyBombFactory} bombFactory - Creates enemy bombs
 * @property {EnemyFleet} enemyFleet - The enemy fleet of ships
 * @property {BonusDropper} bonusDropper - Bonus drops
 * @property {BubbleFactory} bubbleFactory - Bubbles
 * @property {ExplosionFactory} explosionFactory - Explosions
 * @property {ShieldGrid} shieldGrid - Shield
 * @property {Trophies} trophySystem - Tophies
 * @property {HUD} HUD - On screen HUD
 * @property {Object} splashScreen - Splashscreen DOM element
 * @property {Object} gameOverScreen - Game over DOM element
 * @property {Object} winnerScreen - Winner DOM element
 */
class SpaceInvaders {
	/**
	 * Create a new space invaders game instance 
	 */
	constructor() {
		this.width = 640;
		this.height = 480;
		this.domElement = document.getElementById('game');
		this.score = 0;
		this.isPaused = true;
		this.gameState = "splash";

		this.player = new PlayerShip(this, 'player1');
		this.bombFactory = new EnemyBombFactory(this);
		this.enemyFleet = new EnemyFleet(this, this.bombFactory);
		this.bonusDropper = new BonusDropper(this);
		this.bubbleFactory = new BubbleFactory(this);
		this.explosionFactory = new ExplosionFactory(this);
		this.shieldGrid = new ShieldGrid(this);
		this.trophySystem = new Trophies(this);
		this.HUD = new HUD(this, this.player);

		this.splashScreen = document.getElementById('splashScreen');
		this.gameOverScreen = document.getElementById('gameOverScreen');
		this.winnerScreen = document.getElementById('winnerScreen');
		
		document.addEventListener("keydown", this, false);
		document.addEventListener("keyup", this, false);	
		this.HUD.update();
		this.update();
	}
	/**
	 * Handle the incoming DOM events (keyup and keydown). Pass relevant 
	 * key events to the PlayerShip instance
	 *
	 * @param {Event} e - The DOM event instance
	 * @returns {boolean} False, prevent the browser processing these events.
	 */
	handleEvent(e) {
		if (e===undefined) e = window.event; // for IE ?? do I still need to do this crap in 2019?
		switch(e.key) {
			case "ArrowLeft" :
				this.player.receiveCommand(e.type, 'left');
				break;
			case "ArrowRight" :
				this.player.receiveCommand(e.type, 'right');
				break;
			case " " :
				this.player.receiveCommand(e.type, 'fire');	
				break;
		}
		return false;
	}
	/**
	 * Restart the game
	 *
	 */
	restart() {
		this.score = 0;
		this.player.reset();
		this.bombFactory.reset();
		this.enemyFleet.reset();
		this.bonusDropper.reset();
		this.bubbleFactory.reset();
		this.explosionFactory.reset();
		this.shieldGrid.reset();
		this.trophySystem.reset();
		this.HUD.reset();
		
		this.isPaused = true;
		this.changeState("splash");
	}
	/**
	 * Change the game state - splash, play, gameover, win
	 *
	 * @param {string} state - The state code to change to
	 */
	changeState(state) {
		switch (state) {
			case "splash":
				this.isPaused = true;
				this.gameState = "splash";
				this.splashScreen.style.display = "block";
				this.gameOverScreen.style.display = "none";
				this.winnerScreen.style.display = "none";
				break;
	
			case "play":
				this.isPaused = false;
				this.gameState = "play";
				this.splashScreen.style.display = "none";
				this.gameOverScreen.style.display = "none";
				this.winnerScreen.style.display = "none";
				break;

			case "gameover":
				this.isPaused = true;
				this.gameState = "gameover";
				this.splashScreen.style.display = "none";
				this.gameOverScreen.style.display = "block";
				this.winnerScreen.style.display = "none";
				this.gameOverScreen.innerHTML = `
					<h2>Game Over</h2>
					<p>You failed, the aliens have taken over!</p>
					<div>
						<h3>Score : ${this.score}</h3>
						<p>Shots fired : ${this.player.gun.shotsFired}</p>
						<p>Shots on target : ${this.player.gun.shotsHit} (${this.player.gun.accuracy}%)</p>
						<p>Enemy Bombs dropped : ${this.bombFactory.makeCounter}</p>
						<p>Explosion particles made : ${this.explosionFactory.particleCounter}</p>
					</div>
					<p><a href="#" onclick="myGame.restart(); return false;">Play again</a></p>
				`;
				new Audio('sfx/gameover.mp3').play();
				break;
			case "win":
				this.isPaused = true;
				this.gameState = "win";
				this.splashScreen.style.display = "none";
				this.gameOverScreen.style.display = "none";
				this.winnerScreen.style.display = "block";
				this.winnerScreen.innerHTML = `
					<h2>WINNER !!!</h2>
					<p>You beat the invasion, well done.</p>
					<h3>Score : ${this.score}</h3>
					<p>Shots fired : ${this.player.gun.shotsFired}</p>
					<p>Shots on target : ${this.player.gun.shotsHit} (${this.player.gun.accuracy}%)</p>
					<p>Enemy Bombs dropped : ${this.bombFactory.makeCounter}</p>
					<p>Explosion particles made : ${this.explosionFactory.particleCounter}</p>
					<p><a href="#" onclick="myGame.restart(); return false;">Restart</a></p>
				`;
				break;
		}
	}
	/**
	 * Main update loop, calls update on other components.
	 *
	 */
	update() {
		if(!this.isPaused) {
			this.enemyFleet.update();
			this.player.update();
			this.HUD.update();
			this.bombFactory.update();
			this.bubbleFactory.update();
			this.bonusDropper.update();
			this.explosionFactory.update();
			this.domElement.style.backgroundPosition = "-"+(this.player.posX/12)+"px 0px";
			this.trophySystem.update();
			this.checkWin();
			this.checkLoss();			
		}
		/* Request this method be called again ... loop forever */
		window.requestAnimationFrame(() => this.update());
	}
	/**
	 * Toggle the pause status
	 *
	 */
	pauseToggle() {
		this.isPaused = (this.isPaused)?false:true;	
		this.domElement.style.opacity = (this.isPaused)?0.1:1;
	}
	/**
	 * Toggle the splash screen
	 *
	 */
	splashToggle() {
		if(this.gameState == "splash") {
			this.changeState("play");
		} else if(this.gameState == "play") {
			this.changeState("splash");
		}
		this.domElement.style.opacity = (this.isPaused)?0.1:1;
	}
	/**
	 * Check if we have won the game, killed all the enemy ships
	 *
	 * @returns {boolean}
	 */
	checkWin() {
		if(this.enemyFleet.totalAlive == 0) {
			this.changeState("win");
			return true;
		}
	}
	/**
	 * Check if we have lost the game, is it game over?
	 * Player hit points < 1
	 *
	 * @returns {boolean}
	 */
	checkLoss() {
		if(this.player.hitPoints < 1) {
			this.changeState("gameover");
			return true;
		}
	}
}