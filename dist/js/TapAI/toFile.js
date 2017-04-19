/**
 * toFile
 * This function save in CSV the matches of game TapAI
 *
 * @author Leonardo Mauro <leo.mauro.desenv@gmail.com>
 * @link http://leonardomauro.com/portfolio/ Portfolio of Leonardo Mauro
 * @version 2.1.1
 * @copyright 2016 Leonardo Mauro
 * @license https://opensource.org/licenses/GPL-2.0 GNU Public License (GPL v2)
 * @package TapAI
 * @access public
 */

function toFile(){
	function pad(s) { return (s < 10) ? '0' + s : s; };
	var today = new Date(),
		yyyy = today.getFullYear(), mm = today.getMonth()+1, dd = today.getDate(),
		hh = today.getHours(), ii = today.getMinutes(), ss = today.getSeconds();
		
	// Variables
	this.fileName = 'tapAI.'+([yyyy, pad(mm), pad(dd), hh, ii, ss].join('-'));
	this.extension = 'csv';
	this.rows = [];
}

toFile.prototype = {
	/**
	 * Add TapAI Statistics
	 * @access public
	 * @param	{Json} game		Game infos
	 * @param	{Json} reaction	Reaction infos
	 * @param	{Json} points	Points infos
	 * @returns	void
	 */
	add:function(game, reaction, points){
		var newRow = {
			'game':JSON.parse(JSON.stringify(game)),
			'reaction':JSON.parse(JSON.stringify(reaction)),
			'points':JSON.parse(JSON.stringify(points))
		};
		this.rows.push(newRow);
	},
	/**
	 * Save CSV
	 * Create the CSV file and add all this.rows data
	 * @access public
	 * @returns	void
	 */
	save:function(){
		var str = 'game.round,game.difficult,game.time,game.trap,reaction.click,reaction.best,reaction.worse,points.score,points.error\n';
		for(var i=0; i<this.rows.length; i++){
			str += this.rows[i].game.round+','+this.rows[i].game.difficult+','+this.rows[i].game.time+','+this.rows[i].game.trap+',';
			str += this.rows[i].reaction.click+','+this.rows[i].reaction.best+','+this.rows[i].reaction.worse+',';
			str += this.rows[i].points.score+','+this.rows[i].points.error+'\n';
		}
		
		var strBlob = new Blob([str], {type : 'application/csv'});
		saveAs(strBlob, (this.fileName+'.'+this.extension));
	}
}