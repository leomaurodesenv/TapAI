/**
 * Game Logic

 */

function TapAILogic(difficult, round){
	this.maxDifficult = difficult;
	this.maxRound = round;
}

TapAILogic.prototype = {
	/* Get Config Game */
	execute:function(game){
		// Analisy the game
		var aDifficult, aTime, aTrap, out = {};
		aDifficult = Math.ceil(game.round/(this.maxRound/this.maxDifficult));
		aTime = Math.round10(Math.randomf(2000.0, (aDifficult*2000.0) + 5000.0), -2);
		aTrap = (Math.randomi(0, this.maxDifficult+1) < aDifficult);
		// Return
		out.difficult = aDifficult;
		out.time = aTime;
		out.trap = aTrap;
		return out;
	},
	/* Get Score/Points */
	score:function(game, reaction, maxReaction){
		return game.difficult*((maxReaction - reaction)/50.0);
	}
}