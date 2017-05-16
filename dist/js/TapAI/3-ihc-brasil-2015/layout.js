/**
 * Game Layout
 * This function draw the game TapAI to IHC Brasil 2017 tests
 *
 * @author Leonardo Mauro <leo.mauro.desenv@gmail.com>
 * @link http://leonardomauro.com/portfolio/ Portfolio of Leonardo Mauro
 * @version 2.2.1
 * @copyright 2016 Leonardo Mauro
 * @license https://opensource.org/licenses/GPL-2.0 GNU Public License (GPL v2)
 * @package TapAI
 * @access public
 * @param	{String} ielement	SVG element {id}.
 * @returns	Game Layout.
 */

function TapAILayout(ielement){
	this.svg = ielement;
}

TapAILayout.prototype = {
	/**
	 * Init Layout
	 * @access public
	 * @param	void
	 * @returns	{Dom} SVG Layout
	 */
	init:function(){
		var htmlLayout = "<text x=\"50%\" text-anchor=\"middle\" class=\"title color-white\" y=\"120\">TapAI!</text><text x=\"50%\" class=\"color-gray\" text-anchor=\"middle\" y=\"160\">Teste sua velocidade</text><g class=\"btn-init\" onClick=\"tapAI.start()\"><rect x=\"50%\" text-anchor=\"middle\" y=\"180\" width=\"110\" height=\"40\" rx=\"10\" ry=\"10\" class=\"center-rect\"/><text y=\"205\" x=\"50%\" text-anchor=\"middle\">Começar</text></g>";
		this.svg.innerHTML = htmlLayout;
	},
	/**
	 * Beginning Layout
	 * @access public
	 * @param	void
	 * @returns	{Dom} SVG Layout
	 */
	beginning:function(){
		var htmlLayout = "<g class=\"screen-click\" onClick=\"tapAI.waiting()\"><rect class=\"color-green\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" rx=\"10\" ry=\"10\"/><text x=\"50%\" y=\"140\" text-anchor=\"middle\" class=\"color-white\">Clique para</text><text x=\"50%\" y=\"180\" text-anchor=\"middle\" class=\"color-white\">Começar !</tspan></text></g>";
		this.svg.innerHTML = htmlLayout;
	},
	/**
	 * Waiting Layout
	 * @access public
	 * @param	void
	 * @returns	{Dom} SVG Layout
	 */
	waiting:function(){
		var htmlLayout = "<g class=\"screen-click\" onClick=\"tapAI.error()\"><rect class=\"color-green\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" rx=\"10\" ry=\"10\"/><text x=\"50%\" text-anchor=\"middle\" y=\"50%\" class=\"color-white\">Espere &#8987;</text></g>";
		this.svg.innerHTML = htmlLayout;
	},
	/**
	 * Error Layout
	 * @access public
	 * @param	void
	 * @returns	{Dom} SVG Layout
	 */
	error:function(){
		var htmlLayout = "<g class=\"screen-click\" onClick=\"tapAI.analysis()\"><rect class=\"color-orange\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" rx=\"10\" ry=\"10\"/><text x=\"50%\" text-anchor=\"middle\" class=\"color-white\" y=\"120\">&#10007; Calma &#10007;</text><text x=\"50%\" text-anchor=\"middle\" class=\"small color-white\" y=\"155\">Não tenha pressa..</text><text x=\"50%\" text-anchor=\"middle\" class=\"smaller color-white\" y=\"185\">Clique para continuar</text></g>";
		this.svg.innerHTML = htmlLayout;
	},
	/**
	 * Tap Layout
	 * @access public
	 * @param	{Number} screen (how many tiles in screen)
	 * @returns	{Dom} SVG Layout
	 */
	tap:function(screen, pos){
		var htmlLayout = "";
		if(screen == 0){ // No trap
			htmlLayout = "<g class=\"screen-click\" id=\"gTrap\"><rect class=\"color-blue\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" rx=\"10\" ry=\"10\"/><text x=\"50%\" text-anchor=\"middle\" class=\"color-white\" y=\"50%\">&raquo; Tap &laquo;</text></g>";
		}
		else{
			var textTap = '&raquo; Tap &laquo;', colorTap = 'blue', eventTap = 'id="gTrap"',
			textTrap = '&lsaquo; Trap &rsaquo;', colorTrap = 'purple', eventTrap = 'onclick="tapAI.error(this)"',
			x, y, width, height, center, tY, count;
			/* 4x */
			count = 3;
			x = ['0', '50%', '0', '50%']; y = ['0', '0', '50%', '50%'];
			center = ['25', '75', '25', '75']; tY = ['28%', '28%', '78%', '78%'];
			width = '50%'; height = '50%';
			
			for(var i = 0; i<=count; i++){
				if(i == pos) htmlLayout += this.getTapTrap(eventTap, colorTap, x[i], y[i], width, height, center[i], tY[i], textTap);
				else htmlLayout += this.getTapTrap(eventTrap, colorTrap, x[i], y[i], width, height, center[i], tY[i], textTrap);
			}
		}
		this.svg.innerHTML = htmlLayout;
        document.getElementById('gTrap').addEventListener("click", tapAI.click);
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
		return "<g class=\"screen-click\" "+onClick+" ><rect class=\"color-"+color+"\" x=\""+x+"\" y=\""+y+"\" width=\""+width+"\" height=\""+height+"\" rx=\"10\" ry=\"10\"/><text x=\""+center+"%\" text-anchor=\"middle\" class=\"color-white\" y=\""+tY+"\">"+txt+"</text></g>";
	},
	/**
	 * Show time in miliseconds - Layout
	 * @access public
	 * @param	time	time in miliseconds
	 * @returns	{Dom} SVG Layout
	 */
	showReaction:function(time){
		var htmlLayout = "<g class=\"screen-click\" onClick=\"tapAI.analysis()\"><rect class=\"color-green\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" rx=\"10\" ry=\"10\"/><text x=\"50%\" text-anchor=\"middle\" class=\"color-white\" y=\"140\">&#9656; "+time+" ms &#9666;</text><text x=\"50%\" text-anchor=\"middle\" class=\"small color-white\" y=\"175\">Clique para continuar</text></g>";
		this.svg.innerHTML = htmlLayout;
	},
	/**
	 * Game Over by errors - Layout
	 * @access public
	 * @param	void
	 * @returns	{Dom} SVG Layout
	 */
	gameOver:function(){
		var htmlLayout = "<g class=\"screen-click\" onClick=\"tapAI.end()\"><rect class=\"color-red\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" rx=\"10\" ry=\"10\"/><text x=\"50%\" text-anchor=\"middle\" class=\"color-white\" y=\"140\">&#10008; Fim &#10008;</text><text x=\"50%\" text-anchor=\"middle\" class=\"smaller color-white\" y=\"170\">Clique para continuar</text></g>";
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
		var htmlLayout = "<text x=\"50%\" text-anchor=\"middle\" class=\"title color-white\" y=\"60\">TapAI!</text><text x=\"50%\" text-anchor=\"middle\" class=\"color-gray\" y=\"110\">Rodadas: "+round+"</text><text x=\"50%\" text-anchor=\"middle\" class=\"color-gray\" y=\"140\">Melhor: "+best+" ms</text><text x=\"50%\" text-anchor=\"middle\" class=\"color-gray\" y=\"170\">Pior: "+worse+" ms</text><text x=\"50%\" text-anchor=\"middle\" class=\"color-gray\" y=\"200\">Pontos: "+score+"</text><g class=\"btn-init\" onClick=\"tapAI.start()\"><rect x=\"50%\" text-anchor=\"middle\" y=\"230\" width=\"110\" height=\"40\" rx=\"10\" ry=\"10\" class=\"center-rect\"/><text y=\"255\" x=\"50%\" text-anchor=\"middle\">De novo</text></g>";
		
		this.svg.innerHTML = htmlLayout;
	}
}