/**
 * Game Layout
 * This function draw the game TapAI
 *
 * @author Leonardo Mauro <leo.mauro.desenv@gmail.com>
 * @link http://leonardomauro.com/portfolio/ Portfolio of Leonardo Mauro
 * @version 2.0.0
 * @copyright 2016 Leonardo Mauro
 * @license https://opensource.org/licenses/GPL-2.0 GNU Public License (GPL v2)
 * @package TapAI
 * @access public
 * @param	{String} ielement	SVG element {id}.
 * @param	{String} igame		Variable name {TapAIGame}.
 * @returns	Game Layout.
 */

function TapAILayout(igame, ielement){
	this.svg = ielement;
	this.game = igame;
}

TapAILayout.prototype = {
	/**
	 * Init Layout
	 * @access public
	 * @param	void
	 * @returns	{Dom} SVG Layout
	 */
	init:function(){
		var htmlLayout = "<text class=\"center\" y=\"120\"><tspan class=\"title color-white\" x=\"0\" text-anchor=\"middle\">TapAI!</tspan><tspan class=\"color-gray\" x=\"0\" dy=\"40\" text-anchor=\"middle\">Teste sua velocidade</tspan></text><g class=\"btn-init center\" onClick=\""+this.game+".start()\"><rect x=\"-55\" y=\"180\" width=\"110\" height=\"40\" rx=\"10\" ry=\"10\"/><text y=\"205\" text-anchor=\"middle\">Começar</text></g>";
		this.svg.innerHTML = htmlLayout;
	},
	/**
	 * Beginning Layout
	 * @access public
	 * @param	void
	 * @returns	{Dom} SVG Layout
	 */
	beginning:function(){
		var htmlLayout = "<g class=\"screen-click\" onClick=\""+this.game+".waiting()\"><rect class=\"color-green\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" rx=\"10\" ry=\"10\"/><text class=\"center\" y=\"140\" text-anchor=\"middle\"><tspan class=\"color-white\" x=\"0\">Clique para</tspan><tspan class=\"color-white\" x=\"0\" dy=\"40\">Começar !</tspan></text></g>";
		this.svg.innerHTML = htmlLayout;
	},
	/**
	 * Waiting Layout
	 * @access public
	 * @param	void
	 * @returns	{Dom} SVG Layout
	 */
	waiting:function(){
		var htmlLayout = "<g class=\"screen-click\" onClick=\""+this.game+".error()\"><rect class=\"color-green\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" rx=\"10\" ry=\"10\"/><text class=\"center\" y=\"50%\" text-anchor=\"middle\"><tspan class=\"color-white\" x=\"0\">Espere &#8987;</tspan></text></g>";
		this.svg.innerHTML = htmlLayout;
	},
	/**
	 * Error Layout
	 * @access public
	 * @param	void
	 * @returns	{Dom} SVG Layout
	 */
	error:function(){
		var htmlLayout = "<g class=\"screen-click\" onClick=\""+this.game+".analysis()\"><rect class=\"color-orange\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" rx=\"10\" ry=\"10\"/><text class=\"center\" y=\"120\"><tspan class=\"color-white\" x=\"0\" text-anchor=\"middle\">&#10007; Calma &#10007;</tspan></text><text class=\"center\" y=\"155\"><tspan class=\"small color-white\" x=\"0\" text-anchor=\"middle\">Não tenha pressa..</tspan></text><text class=\"center\" y=\"185\"><tspan class=\"smaller color-white\" x=\"0\" text-anchor=\"middle\">Clique para continuar</tspan></text></g>";
		this.svg.innerHTML = htmlLayout;
	},
	/**
	 * Tap Layout
	 * @access public
	 * @param	{Number} screen (how many tiles in screen)
	 * @returns	{Dom} SVG Layout
	 */
	tap:function(screen){
		var htmlLayout = "";
		if(screen == 0){ // No trap
			htmlLayout = "<g class=\"screen-click\" onClick=\""+this.game+".click()\"><rect class=\"color-blue\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" rx=\"10\" ry=\"10\"/><text class=\"center\" y=\"50%\" text-anchor=\"middle\"><tspan class=\"color-white\" x=\"0\">&raquo; Tap &laquo;</tspan></text></g>";
		}
		else{
			var textTap = '&raquo; Tap &laquo;', colorTap = 'blue', eventTap = 'click',
			textTrap = '&lsaquo; Trap &rsaquo;', colorTrap = 'purple', eventTrap = 'error',
			pos, x, y, width, height, center, tY, count;
			
			/* 2x */
			if(screen == 1){
				count = 1;
				x = ['0', '50%']; y = ['0', '0'];
				center = ['25', '75']; tY = ['50%', '50%'];
				width = '50%'; height = '100%';
			}
			/* 4x */
			else if(screen == 2){
				count = 3;
				x = ['0', '50%', '0', '50%']; y = ['0', '0', '50%', '50%'];
				center = ['25', '75', '25', '75']; tY = ['28%', '28%', '78%', '78%'];
				width = '50%'; height = '50%';
			}
			/* 6x */
			else{
				count = 5;
				x = ['0', '50%', '0', '50%', '0', '50%']; y = ['0', '0', '33%', '33%', '66%', '66%'];
				center = ['25', '75', '25', '75', '25', '75']; tY = ['20%', '20%', '53%', '53%', '86%', '86%'];
				width = '50%'; height = '33.3333%';
			}
			pos = Math.randomi(0, count);
			for(var i = 0; i<=count; i++){
				if(i == pos) htmlLayout += this.getTapTrap(eventTap, colorTap, x[i], y[i], width, height, center[i], tY[i], textTap);
				else htmlLayout += this.getTapTrap(eventTrap, colorTrap, x[i], y[i], width, height, center[i], tY[i], textTrap);
			}
		}
		this.svg.innerHTML = htmlLayout;
	},
	/**
	 * Tap and Trap HTML
	 * @access public
	 * @param	onClick	function to call on click
	 * @param	color	background color
	 * @param	x		x pos
	 * @param	y		y pos
	 * @param	width	width size
	 * @param	height	height size
	 * @param	center	align text with class
	 * @param	tY		y of text
	 * @param	txt		text {Tap, Trap}
	 * @returns	{String} Dom HTML
	 */
	getTapTrap:function(onClick, color, x, y, width, height, center, tY, txt){
		return "<g class=\"screen-click\" onClick=\""+this.game+"."+onClick+"()\"><rect class=\"color-"+color+"\" x=\""+x+"\" y=\""+y+"\" width=\""+width+"\" height=\""+height+"\" rx=\"10\" ry=\"10\"/><text class=\"center-"+center+"\" y=\""+tY+"\" text-anchor=\"middle\"><tspan class=\"color-white\" x=\"0\">"+txt+"</tspan></text></g>";
	},
	/**
	 * Show time in miliseconds - Layout
	 * @access public
	 * @param	time	time in miliseconds
	 * @returns	{Dom} SVG Layout
	 */
	showReaction:function(time){
		var htmlLayout = "<g class=\"screen-click\" onClick=\""+this.game+".analysis()\"><rect class=\"color-green\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" rx=\"10\" ry=\"10\"/><text class=\"center\" y=\"140\"><tspan class=\"color-white\" x=\"0\" text-anchor=\"middle\">&#9656; "+time+" ms &#9666;</tspan></text><text class=\"center\" y=\"175\"><tspan class=\"small color-white\" x=\"0\" text-anchor=\"middle\">Clique para continuar</tspan></text></g>";
		this.svg.innerHTML = htmlLayout;
	},
	/**
	 * Game Over by errors - Layout
	 * @access public
	 * @param	void
	 * @returns	{Dom} SVG Layout
	 */
	gameOver:function(){
		var htmlLayout = "<g class=\"screen-click\" onClick=\""+this.game+".end()\"><rect class=\"color-red\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" rx=\"10\" ry=\"10\"/><text class=\"center\" y=\"140\"><tspan class=\"color-white\" x=\"0\" text-anchor=\"middle\">&#10008; Fim &#10008;</tspan></text><text class=\"center\" y=\"170\"><tspan class=\"smaller color-white\" x=\"0\" text-anchor=\"middle\">Clique para continuar</tspan></text></g>";
		this.svg.innerHTML = htmlLayout;
	},
	/**
	 * End: evaluate game - Layout
	 * @access public
	 * @param	round	count matches
	 * @param	best	best reaction
	 * @param	worse	worse reaction
	 * @param	score	total player score
	 * @returns	{Dom} SVG Layout
	 */
	end:function(round, best, worse, score){
		var htmlLayout = "<text class=\"center\" y=\"60\"><tspan class=\"title color-white\" x=\"0\" text-anchor=\"middle\">TapAI!</tspan><tspan class=\"color-gray\" x=\"0\" dy=\"50\" text-anchor=\"middle\">Rodadas: "+round+"</tspan><tspan class=\"color-gray\" x=\"0\" dy=\"30\" text-anchor=\"middle\">Melhor: "+best+" ms</tspan><tspan class=\"color-gray\" x=\"0\" dy=\"30\" text-anchor=\"middle\">Pior: "+worse+" ms</tspan><tspan class=\"color-gray\" x=\"0\" dy=\"30\" text-anchor=\"middle\">Pontos: "+score+"</tspan></text><g class=\"btn-init center\" onClick=\""+this.game+".start()\"><rect x=\"-55\" y=\"230\" width=\"110\" height=\"40\" rx=\"10\" ry=\"10\"/><text y=\"255\" text-anchor=\"middle\">Denovo ?</text></g>";
		this.svg.innerHTML = htmlLayout;
	}
}