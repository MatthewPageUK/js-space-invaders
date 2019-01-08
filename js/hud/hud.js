/**
 * HUD Wrapper to hold UI components and handle update loops (score, accuracy, health) 
 *
 * @author Matthew Page <work@mjp.co>
 * @property {SpaceInvaders} game - The current game instance
 * @property {PlayerShip} player - The player instance
 * @property {HUDComponent[]} components - Array of HUD components being displayed.
 */
class HUD {
	/**
	 * Create a new HUD display
	 *
	 * @param {SpaceInvaders} game - The current game instance
	 * @param {PlayerShip} player - The player
	 */
	constructor(game, player)
	{
		this.game = game;
		this.player = player;
		this.components = [];
		this.addComponent(new hudHealth(this.game, this.player));
		this.addComponent(new hudScore(this.game));
		this.addComponent(new hudAccuracy(this.game, this.player));
		this.addComponent(new hudReload(this.game, this.player.gun));
		this.addComponent(new hudKillstreak(this.game, this.player));
		this.addComponent(new hudEnemy(this.game, this.player, this.game.enemyFleet));
	}
	/**
	 * Make a call to all the component update() methods. Called by main
	 * game loop.
	 *
	 */
	update() {
		this.components.forEach((component, index) => {
			component.update();	
		});
	}
	/**
	 * New game reset - because the HUD only represents data elsewhere nothing
	 * needs to happen here.
	 *
	 */
	reset() {
		this.update();
	}
	/**
	 * Add a new component to the HUD 
	 *
	 * @param {HUDComponent} component - The HUD component to add to the main HUD display
	 */
	addComponent(component) {
		this.components.push(component);
	}
}