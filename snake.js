/*global console*/
/*global $*/

(function (root) {
  "use strict";
  
  var SG = root.SG = (root.SG || {}),
  
      Coord = SG.Coord = function (xCoord, yCoord) {
        this.X = xCoord;
        this.Y = yCoord;
      },
  
      Snake = SG.Snake = function (board) {
        this.board = board;
        this.currentDir = "N";
        this.segments = [];
        this.create(board.dimX, board.dimY);
      },
      
      Board = SG.Board = function SGB(dimX, dimY) {
        this.dimX = dimX;
        this.dimY = dimY;
        this.grid = this.create(dimX, dimY);
        this.gameOver = false;
        this.snake = new Snake(this);
        this.apples = new Apples(this);
        this.render();
      },
      
      Apples = SG.Apples = function (board) {
        this.board = board;
        this.appleCoords = [];
        this.placeApples();
      };
      
  Snake.DIRECTIONS = {
    "N" : new Coord(-1, 0),
    "S" : new Coord(1, 0),
    "E" : new Coord(0, 1),
    "W" : new Coord(0, -1)
  };
      
  Apples.prototype.placeApples = function () {
    var numApples = 10, i = 0, max = this.board.dimX - 1;
    
    for (i = 0; i < numApples; i+=1) {
      var x = Math.floor((Math.random()*max)+1),
          y = Math.floor((Math.random()*max)+1),
          appleCoord = new Coord(x, y);
        
      if (!this.isSnake(appleCoord)) {
        console.log("no snake segment matches")
        this.appleCoords.push(appleCoord);
      }
    }
  };
  
  Apples.prototype.isSnake = function (appleCoord) {
    var index = 0, segments = this.board.snake.segments;
    
    for (index = 0; index < segments.length; index+=1) {
      if (appleCoord.equal(segments[index])) {
        console.log("apple === snake")
        console.log(appleCoord)
        console.log(segments[index])
        return true;
      }
    }
    return false;
  };
      
  Coord.prototype.plus = function (coord1, coord2) {
    var newX = coord1.X + coord2.X,
        newY = coord1.Y + coord2.Y;
    return new Coord(newX, newY);
  };
  
  Coord.prototype.equal = function (otherCoord) {
    return (this.X === otherCoord.X) && (this.Y === otherCoord.Y);
  };
  
  Snake.prototype.create = function (dimX, dimY) {
    var newX = dimX / 2,
        newY = dimY / 2;
    this.segments.push(new Coord(newX, newY));
    this.segments.push(new Coord(newX, newY + 1));
  };
  
  Snake.prototype.move = function () {
    var headCoord = this.segments[0],
        newHead = headCoord.plus(headCoord, Snake.DIRECTIONS[this.currentDir]);
        
    if (this.board.apples.appleCoords.length < 5) {
      this.board.apples.placeApples();
    }
        
    if (this.board.validMove(newHead)) {
      this.segments.splice(0, 0, newHead);
      if (!this.eatsApple(newHead)) {
        this.tailCoord = this.segments.pop();
      }
    } else {
      this.board.gameOver = true;
    }
  };
  
  Snake.prototype.eatsApple = function (newHead) {
    var index = 0, appleCoords = this.board.apples.appleCoords;
    
    for (index =0; index < appleCoords.length; index+=1) {
      if (appleCoords[index].equal(newHead)) {
        appleCoords.splice(index, 1);
        return true;
      }
    }
    return false;
  };
  
  Snake.prototype.turn = function (newDir) {
    this.currentDir = newDir;
  };
  
  Board.prototype.create = function(dimX, dimY) {
    var boardArr = [],
        rowArr = null,
        i = null,
        j = null;
        
    $('.snake-board').css('width', dimX * 10 + 'px');
    $('.snake-board').css('height', dimY * 10 + 'px');
        
    for (i = 0; i < dimY; i+=1) {
      rowArr = [];
     for (j = 0; j < dimX; j+=1) {
       rowArr.push("tile");
     }
     boardArr.push(rowArr);
    }
    return boardArr;
  };
  
  Board.prototype.validMove = function (newHead) {
    var inside = (newHead.X >= 0) && (newHead.X < this.dimX) && (newHead.Y >= 0)
    && (newHead.Y < this.dimY);
    return inside;
  };
  
  Board.prototype.placeSnake = function () {
    var index = null, segment = null;
    
    for(index = 0; index < this.snake.segments.length; index+=1) {
      segment = this.snake.segments[index];
      this.grid[segment.X][segment.Y] = "snake";
    }
    
    if (this.snake.tailCoord) {
      this.grid[this.snake.tailCoord.X][this.snake.tailCoord.Y] = "tile";
    }
    return this.grid;
  };
  
  Board.prototype.placeApples = function () {
    var index = null, apple = null;
    
    for(index = 0; index < this.apples.appleCoords.length; index+=1) {
      apple = this.apples.appleCoords[index];
      this.grid[apple.X][apple.Y] = "apple";
    }
    return this.grid;
  };
  
  Board.prototype.render = function () {
    var row = 0, col = 0, $el = $('.snake-board');
    
    this.placeSnake();
    this.placeApples();
    
    $el.html("");
    
    for(row = 0; row < this.grid.length; row +=1) {
      for(col = 0; col < this.grid[row].length; col+=1) {
        $el.append($('<div>').addClass(this.grid[row][col]));
      }
    }
  }; 
      
}(this));


