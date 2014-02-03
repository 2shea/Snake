/*global window*/

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
  }
      
  UI.prototype.play = function () {
    
  };
  
  UI.prototype.handleKeyEvent = function (event) {
    console.log(event.keyCode)
    if (event.keyCode in UI.KEYS) {
      this.board.snake.turn(UI.KEYS[event.keyCode]);
      console.log(UI.KEYS[event.keyCode])
    } else {
      console.log("another key was hit")
    }
  }
  
  UI.prototype.start = function () {
    var UI = this;
    
     $(window).keydown(this.handleKeyEvent.bind(this));
    
    var gameLoop = window.setInterval(function () {
      UI.step();

      if (UI.board.gameOver) {
        clearInterval(gameLoop);
      }
    }, 1000);
  };
  
  UI.prototype.step = function () {
    this.board.snake.move();
    this.board.render();
  };
}(this));
