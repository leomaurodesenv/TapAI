/**
 * Game System
 * This function execute the game TapAI
 *
 * @author Leonardo Mauro <leo.mauro.desenv@gmail.com>
 * @link http://leonardomauro.com/portfolio/ Portfolio of Leonardo Mauro
 * @version 2.0.0
 * @copyright 2016 Leonardo Mauro
 * @license https://opensource.org/licenses/GPL-2.0 GNU Public License (GPL v2)
 * @package TapAI
 * @access public
 * @param	{String} ielement	SVG element {id}.
 * @returns	Game.
 */

function TapAI(ielement){
	// Create tapAI to call the Game
	window.tapAI = new TapAIGame(ielement);
}

function TapAIGame(ielement){
	// Defines
	this.maxError = 3;
	this.maxReaction = 5000;
	this.maxRound = 10;
	this.maxDifficulty = 5;
	
	// Game vars
	this.game = {'round':1, 'difficult':1, 'time':3000, 'trap':false};
	this.reaction = {'click':0, 'best':NaN, 'worse':NaN};
	this.points = {'score':0, 'error':0};
	this.clock = {'date':new Date()};
	
	// Call external functions
	this.layout = new TapAILayout('tapAI', ielement);
	this.logic = new TapAILogic(this.maxDifficulty, this.maxRound);
	this.toFile = new toFile(); // Only to save CSV
	
	// Draw Init Layout
	this.layout.init();
}

TapAIGame.prototype = {
	/* Start the game */
	start:function(){
		// Begin
		this.reset();
		this.game.time = 3000;
		this.layout.beginning();
	},
	/* Waiting x time (seconds) */
	waiting:function(){
		this.layout.waiting();
		var $this = this;
		this.clock.waiting = setTimeout(function(){
			$this.tap();
			$this.clock.date = new Date();
		}, this.game.time);
	},
	/* Check tap and trap */
	tap:function(){
		// Trap 2x, 4x, 6x,
		if(this.game.trap){
			var diff = (this.game.difficult/this.maxDifficulty > 0.6) ? 3
				: (this.game.difficult/this.maxDifficulty > 0.3) ? 2 : 1;
			this.layout.tap(diff);
		}
		// Normal tap
		else this.layout.tap(0);
	},
	/* Click early or click in *Trap* */
	error:function(){
		// Setting datas of event error
		clearInterval(this.clock.waiting);
		this.points.error++;
		this.updateReaction(this.maxReaction);
		// Layout
		this.layout.error();
	},
	/* Click event */
	click:function(){
		// Get miliseconds
		var nowdate = new Date(), milisecond;
		milisecond = (nowdate.getTime() - this.clock.date.getTime());
		milisecond = (milisecond > this.maxReaction) ? this.maxReaction : milisecond;
		// Update reaction
		this.updateReaction(milisecond);
		// Layout
		this.layout.showReaction(milisecond);
	},
	/* Update reaction */
	updateReaction:function(milisecond){
		// Update reaction
		if(isNaN(this.reaction.best) || milisecond < this.reaction.best)
			this.reaction.best = milisecond;
		if(isNaN(this.reaction.worse) || milisecond > this.reaction.worse)
			this.reaction.worse = milisecond;
		this.reaction.click = milisecond;
	},
	/* Analysis reaction */
	analysis:function(){
		// Execute logic game
		var aScore = this.logic.score(this.game, this.reaction.click, this.maxReaction);
		var logic = this.logic.execute(this.game);
		// Update values
		this.points.score = Math.round10(aScore + this.points.score, -2);
		this.printCSV();
		this.game.round++;
		this.game.difficult = logic.difficult;
		this.game.trap = logic.trap;
		this.game.time = logic.time;
		
		// Next game/over
		if(this.game.round > this.maxRound) this.end(); // evaluate game
		else if(this.points.error >= this.maxError) this.layout.gameOver(); // end game
		else this.waiting(); // continue
	},
	/* End: Statistics */
	end:function(){
		console.log('-> End');
		this.layout.end(this.game.round-1, this.reaction.best, this.reaction.worse, this.points.score);
		this.toFile.save();
	},
	/* Analysis reaction */
	printCSV:function(){
		console.log('*-------------------*');
		console.debug(this.game);
		console.debug(this.reaction);
		console.debug(this.points);
		// Only to save CSV
		this.toFile.add(this.game, this.reaction, this.points);
	},
	/* Reset game values */
	reset:function(){
		this.game = {'round':1, 'difficult':1, 'time':3000, 'trap':false};
		this.reaction = {'click':0, 'best':NaN, 'worse':NaN};
		this.points = {'score':0, 'error':0};
		this.clock = {'date':new Date()};
	}
}