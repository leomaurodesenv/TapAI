/**
 * Artificial Intelligence Game Logic
 * This function return process the game infos
 * Here is used a system elo-based (more details in paper "Jogo de Raciocínio Rápido Adaptativo - MORAES, L.M.P.")
 *
 * @author Leonardo Mauro <leo.mauro.desenv@gmail.com>
 * @link http://leonardomauro.com/portfolio/ Portfolio of Leonardo Mauro
 * @version 2.1.1
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
	 * Get Config Game with Elo evaluation
	 * @access public
	 * @param	{Json} game		Game infos
	 * @returns	{Json} configures of new match
	 */
	execute:function(game, reaction){
		var aDifficult, aTime, aTrap, elo, out = {};
		// Elo analisys
		elo = this.score(game, reaction);
		if(this.pertinences[game.difficult-1].elo <= elo)
			aDifficult = (game.difficult == this.maxDifficult) ? this.maxDifficult : game.difficult+1;
		else if(game.difficult > 2 && this.pertinences[game.difficult-2].elo <= elo)
			aDifficult = game.difficult;
		else
			aDifficult = (game.difficult == 1) ? 1 : game.difficult-1;
		// Weighted adjust
		var weighted = function(alfa, w1, w2){
			return ((1-alfa)*w1 + alfa*w2);
		}
		var ratemodif = 0.1, rounding = 6, rate, rateLower = 0.5;
		if(elo != 0) // Case error
		for(i=(game.difficult > 2) ? game.difficult-2 : 0; i<this.pertinences.length && i<(game.difficult+1); i++){
			rate = ratemodif/(Math.abs(game.difficult-(i+1))+1);
			if(aDifficult > game.difficult) rate *= 2;
			this.pertinences[i].elo = Math.round10(weighted(rate, this.pertinences[i].elo, elo), -rounding);
		}
		//aDifficult = Math.ceil(game.round/(this.maxRound/this.maxDifficult));
		aTime = Math.round10(Math.randomf(2000.0, (aDifficult*2000.0) + 5000.0), -2);
		aTrap = (Math.randomi(0, this.maxDifficult+1) < aDifficult);
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
		return game.difficult*((this.maxReaction - reaction)/50.0);
	},
	/**
	 * Pertinences to used in 'this.execute'
	 * @access public
	 * @param	{Json} params to difficulty adjust intelligent
	 */
	pertinences:[{'elo':60.0}, {'elo':160.0}, {'elo':260.0}, {'elo':360.0}, {'elo':460.0}],
}