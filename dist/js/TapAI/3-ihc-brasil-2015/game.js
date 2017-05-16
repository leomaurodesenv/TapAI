/**
 * Game System
 * This function execute the game TapAI to IHC Brasil 2017 tests
 *
 * @author Leonardo Mauro <leo.mauro.desenv@gmail.com>
 * @link http://leonardomauro.com/portfolio/ Portfolio of Leonardo Mauro
 * @version 2.2.1
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

/**
 * Game Executor
 * @access public
 * @param	{String} ielement	SVG element {id}.
 * @returns	void
 */

function TapAIGame(ielement){
	// Defines
	this.maxError = 3;
	this.maxReaction = 5000;
	this.maxRound = 2;
	this.maxDifficulty = 4;
	
	// Game vars
	this.game = {'round':1, 'difficult':1, 'time':3000, 'trap':false};
	this.reaction = {'click':0, 'best':NaN, 'worse':NaN};
	this.points = {'score':0, 'error':0, 'current':0};
    this.posReaction = {'x':0, 'y':0, 'width':0, 'height':0};
	this.clock = {'date':new Date()};
	
	// Call external functions
	this.layout = new TapAILayout(ielement);
	this.logic = new TapAILogic(this.maxDifficulty, this.maxRound, this.maxReaction);
	this.toFile = new toFile(); // Only to save CSV
	
	// Draw Init Layout
	this.layout.init();
}

TapAIGame.prototype = {
	/**
	 * Start the Game
	 * @access public
	 * @param	void
	 * @returns	void
	 *//* Start the game */
	start:function(){
		// Begin
		this.reset();
		this.game.time = 3000;
		this.layout.beginning();
	},
	/**
	 * Waiting to show the "Tap"
	 * @access public
	 * @param	void
	 * @returns	void
	 */
	waiting:function(){
		this.layout.waiting();
		var $this = this;
		this.clock.waiting = setTimeout(function(){
			$this.tap();
			$this.clock.date = new Date();
		}, this.game.time);
	},
	/**
	 * Call Tap & Trap screen
	 * @access public
	 * @param	void
	 * @returns	void
	 */
	tap:function(){
		// Trap 4x
		if(this.game.trap){
            var pos =
                (this.game.round == 2) ? 0 : 
                (this.game.round == 4) ? 2 : 
                (this.game.round == 6) ? 3 : 1 ;
            this.layout.tap(1, pos);
		}
		// Normal tap
		else this.layout.tap(0);
	},
	/**
	 * Error - Click early or click in *Trap*
	 * @access public
	 * @param	void
	 * @returns	void
	 */
	error:function(){
		// Setting datas of event error
		clearInterval(this.clock.waiting);
		this.points.error++;
		this.updateReaction(this.maxReaction);
        this.posReaction = {'x':0, 'y':0, 'width':0, 'height':0};
		// Layout
		this.layout.error();
	},
	/**
	 * Click (reaction event)
	 * @access public
	 * @param	void
	 * @returns	void
	 */
	click:function(event){
		// Get miliseconds
		var nowdate = new Date(), milisecond;
		milisecond = (nowdate.getTime() - tapAI.clock.date.getTime());
		milisecond = (milisecond > tapAI.maxReaction) ? tapAI.maxReaction : milisecond;
		// Update reaction
		tapAI.updateReaction(milisecond);
        tapAI.updatePosReaction(event);
		// Layout
		tapAI.layout.showReaction(milisecond);
	},
    /**
	 * Update data of this.posReaction
	 * @access public
	 * @param	{Object} event	event of click
	 * @returns	void
	 *//* Update reaction */
	updatePosReaction:function(event){
		// Update reaction
		var dim = event.target.getBoundingClientRect();
        var x = event.clientX - dim.left;
        var y = event.clientY - dim.top;
        this.posReaction = {
            'x':Math.round10(x, -2), 'y':Math.round10(y, -2), 
            'width':Math.round10(dim.width, -2), 'height':+Math.round10(dim.height, -2)
        };
	},
	/**
	 * Update data of this.reaction
	 * @access public
	 * @param	{Number} milisecond	time reaction
	 * @returns	void
	 *//* Update reaction */
	updateReaction:function(milisecond){
		// Update reaction
		if(isNaN(this.reaction.best) || milisecond < this.reaction.best)
			this.reaction.best = milisecond;
		if(isNaN(this.reaction.worse) || milisecond > this.reaction.worse)
			this.reaction.worse = milisecond;
		this.reaction.click = milisecond;
	},
	/**
	 * Analysis the reaction
	 * @access public
	 * @param	void
	 * @returns	void
	 */
	analysis:function(){
		// Execute logic game
		var aScore = this.logic.score(this.game, this.reaction.click);
		var logic = this.logic.execute(this.game, this.reaction.click);
		// Update values
        this.points.current = Math.round10(aScore, -2);
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
	/**
	 * End: Statistics
	 * @access public
	 * @param	void
	 * @returns	void
	 */
	end:function(){
		console.log('-> End');
		this.layout.end(this.game.round-1, this.reaction.best, this.reaction.worse, this.points.score);
		this.toFile.save();
	},
	/**
	 * Print CSV file
	 * @access public
	 * @param	void
	 * @returns	void
	 */
	printCSV:function(){
		console.log('*-------------------*');
		console.debug(this.game);
		console.debug(this.reaction);
		console.debug(this.points);
		console.debug(this.posReaction);
		// Only to save CSV
		this.toFile.add(this.game, this.reaction, this.points, this.posReaction);
	},
	/**
	 * Reset game values
	 * @access public
	 * @param	void
	 * @returns	void
	 */
	reset:function(){
		this.game = {'round':1, 'difficult':1, 'time':3000, 'trap':false};
		this.reaction = {'click':0, 'best':NaN, 'worse':NaN};
		this.points = {'score':0, 'error':0, 'current':0};
        this.posReaction = {'x':0, 'y':0, 'width':0, 'height':0};
		this.clock = {'date':new Date()};
	}
}