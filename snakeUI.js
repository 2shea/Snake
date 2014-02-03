/*global window*/
/*global $*/

(function(root) {
  "use strict";
  var SG = root.SG = (root.SG || {}),
  
      UI = SG.UI = function (board, mainContainer) {
        this.board = board;
        this.$el = mainContainer;
        this.start();
      };
      
  UI.KEYS  = {
    38: "N",
    39: "E",
    40: "S",
    37: "W"
  };
  
  UI.prototype.handleKeyEvent = function (event) {
    if (event.keyCode in UI.KEYS) {
      this.board.snake.turn(UI.KEYS[event.keyCode]);
    }
  };
  
  UI.prototype.start = function () {
    var UI = this;
    
     $(window).keydown(this.handleKeyEvent.bind(this));
    
    var gameLoop = window.setInterval(function () {
      UI.step();

      if (UI.board.gameOver) {
        alert("Game Over!")
        clearInterval(gameLoop);
      }
    }, 200);
  };
  
  UI.prototype.step = function () {
    this.board.snake.move();
    this.board.render();
  };
}(this));
