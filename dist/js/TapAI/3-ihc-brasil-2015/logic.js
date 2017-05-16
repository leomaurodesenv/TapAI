/**
 * Game Logic
 * This function return process the game infos to IHC Brasil 2017 tests
 *
 * @author Leonardo Mauro <leo.mauro.desenv@gmail.com>
 * @link http://leonardomauro.com/portfolio/ Portfolio of Leonardo Mauro
 * @version 2.2.1
 * @copyright 2016 Leonardo Mauro
 * @license https://opensource.org/licenses/GPL-2.0 GNU Public License (GPL v2)
 * @package TapAI
 * @param	{Number} difficult	max difficult.
 * @param	{Number} round		max matches.
 * @access public
 */

function TapAILogic(difficult, round, reaction){
	this.maxDifficult = difficult;
	this.maxRound = round;
	this.maxReaction = reaction;
}

TapAILogic.prototype = {
	/**
	 * Get Config Game
	 * @access public
	 * @param	{Json} game		Game infos
	 * @returns	{Json} configures of new match
	 */
	execute:function(game, reaction){
		// Analisy the game
		var aDifficult, aTime, aTrap, out = {};
		aDifficult = Math.ceil(game.round/(this.maxRound/this.maxDifficult));
		aTime = Math.round10(Math.randomf(2000.0, (aDifficult*2000.0) + 5000.0), -2);
		aTrap = ((game.round+1)%2 == 0);
		// Return
		out.difficult = aDifficult;
		out.time = aTime;
		out.trap = aTrap;
		return out;
	},
	/**
	 * Get Score/Points
	 * @access public
	 * @param	{Json} game		Game infos
	 * @param	{Json} reaction	Reaction infos
	 * @returns	{Number} score
	 */
	score:function(game, reaction){
		return ((this.maxReaction - reaction)/50.0);
	}
}