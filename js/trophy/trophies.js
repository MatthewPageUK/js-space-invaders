/** 
 * The Trophies system wrapper / factory
 *
 * @author Matthew Page <work@mjp.co>
 * @property {SpaceInvaders} game - The current game instance
 * @property {array} trophies - Array of trophies for this game
 */
class Trophies {
	/**
	 * Make a new trophy system and setup the trophies.
	 *
	 * @param {SpaceInvaders} game - The current game instance.
	 */
	constructor(game) {
		this.game = game;
		this.trophies = [];
		this.trophies.push(new TrophyFirstStrike(this.game.player.gun, this.game.enemyFleet));
		this.trophies.push(new TrophyKillstreak(this.game.player));
		this.trophies.push(new TrophyRoswell(this.game.enemyFleet));
	}
	/**
	 * Reset the trophies 
	 * 
	 * @todo Something is meant to happen here?
	 */
	reset() {
		this.trophies.forEach((trophy) => {
			if(trophy.isActive) trophy.update();
		});
	}
	/**
	 * Update loop issues update to each trophy
	 * 
	 */
	update() {
		this.trophies.forEach((trophy) => {
			if(trophy.isActive) trophy.update();
		});
	}
}