/**
 * Game CSV saver

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
	/* Add TapAI Statistics*/
	add:function(game, reaction, points){
		var newRow = {
			'game':JSON.parse(JSON.stringify(game)),
			'reaction':JSON.parse(JSON.stringify(reaction)),
			'points':JSON.parse(JSON.stringify(points))
		};
		this.rows.push(newRow);
	},
	/* Save CSV */
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