# TapAI #

Links:      
[Online Example](http://projects.leonardomauro.com/tapai/) and [JS Classes](https://www.jsclasses.org/tapai)   
   
___
   
This is a quick reaction game in which the player must click as fast as possible on the "tap" screen.   
   
The game is designed in SVG (HTML5) responsively to fit any size of screen. Designed for web browsers to desktop, mobile phones and tablets.   
   
After 10 matches the result of the game appears and a CSV file with all the game information is saved.   
   
The examples debug the player performance in Web Console of browser.
   
___
   
   
This game has been developed with the purpose of studying human-game interaction. In this game, it is possible to manipulate any information about the game in order to interact and to study the behaviors and actions of the player. In addition, this game can be used to develop a database of players and their game states (at the end of the game a CSV file is generated).
   
___
   
* Normal Game   

```
/dist/js/TapAI/
  |__ game.js - mechanics of the game
  |__ layout.js - SVG HTML layout
  |__ logic.js - difficulty/score logic
  |__ toFile.js - export the results to CSV file
/example/
  |__ index.html - normal game
```
    
* Edited Game	

```
/dist/js/TapAI/
  |__ AIlogic.js - game logic (with PCG heuristic elo-based)
/example/
  |__ index-intelligent.html - edited game
```
    
	
___
   
## Also look ~  	
- [License GPL v3](LICENSE)
- Create by Leonardo Mauro (leo.mauro.desenv@gmail.com)
- Git: [leomaurodesenv](https://github.com/leomaurodesenv/)
- Site: [Portfolio](http://leonardomauro.com/portfolio/)
