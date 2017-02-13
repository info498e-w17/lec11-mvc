/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var model_1 = __webpack_require__(2);
var view_1 = __webpack_require__(3);
// import {Controller} from './controller';
var game = new model_1.Model();
var view = new view_1.View(game);
// let ctrl:Controller = new Controller(game, view);
console.log("starting game...");
// ctrl.play();


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Represents a game of Tic Tac Toe.
 * Board size is hard-coded at 3.
 */
var Model = (function () {
    function Model() {
        this.currentPlayer = 0;
        this.winner = undefined;
        this.size = 3; //hard-coded for simplicity
        /* Subject methods (Observer pattern) */
        this.observers = [];
        this.resetBoard(); //initialize board
    }
    Model.prototype.resetBoard = function () {
        this.gameBoard = [
            [undefined, undefined, undefined],
            [undefined, undefined, undefined],
            [undefined, undefined, undefined],
        ];
    };
    //returns if sucessful or not
    Model.prototype.makeMove = function (x, y) {
        if (this.winner)
            return false; //don't move if won
        if (x < 0 || x > 2 || y < 0 || y > 2)
            return false; //out of bounds
        if (this.gameBoard[x][y] !== undefined)
            return false; //don't move if illegal
        this.gameBoard[x][y] = this.currentPlayer; //make move
        //check if we now have a winner
        var gb = this.gameBoard;
        //check row
        if (gb[x][0] == gb[x][1] && gb[x][1] == gb[x][2])
            this.winner = this.currentPlayer;
        //check col
        if (gb[0][y] == gb[1][y] && gb[1][y] == gb[2][y])
            this.winner = this.currentPlayer;
        //check diag
        if (gb[1][1] !== undefined && ((gb[0][0] == gb[1][1] && gb[1][1] == gb[2][2]) ||
            (gb[2][0] == gb[1][1] && gb[1][1] == gb[0][2])))
            this.winner = this.currentPlayer;
        this.currentPlayer = (this.currentPlayer + 1) % 2; //toggle
        return true;
    };
    Model.prototype.getPiece = function (x, y) {
        if (x < 0 || x > 2 || y < 0 || y > 2)
            return undefined; //out of bounds
        return this.gameBoard[x][y];
    };
    Model.prototype.getBoard = function () {
        return this.gameBoard;
    };
    Model.prototype.getCurrentPlayer = function () {
        return this.currentPlayer;
    };
    Model.prototype.getWinner = function () {
        return this.winner;
    };
    Model.prototype.register = function (obs) {
        this.observers.push(obs);
    };
    Model.prototype.unregister = function (obs) {
        var index = this.observers.indexOf(obs);
        this.observers.splice(index, 1); //remove (untested :p)
    };
    Model.prototype.notifyAll = function () {
        this.observers.forEach(function (obs) { return obs.notify(); });
    };
    return Model;
}());
exports.Model = Model;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var View = (function () {
    function View(game) {
        this.game = game;
        this.playerSymbols = [' ', 'X', 'O']; //for display
    }
    View.prototype.printBoard = function () {
        //print the board
        console.log("    0   1   2");
        for (var i = 0; i < this.game.size; i++) {
            var row = i + "   ";
            for (var j = 0; j < this.game.size; j++) {
                var player = this.game.getPiece(i, j);
                if (player === undefined)
                    player = -1;
                row += this.playerSymbols[player + 1];
                if (j < this.game.size - 1)
                    row += " | ";
            }
            console.log(row);
            if (i < this.game.size - 1)
                console.log("   -----------");
        }
        console.log("");
    };
    View.prototype.printPrompt = function () {
        var player = this.playerSymbols[this.game.getCurrentPlayer() + 1];
        console.log(player + "'s turn. Pick a spot [row, col]");
    };
    View.prototype.printWinner = function (winner) {
        var player = this.playerSymbols[winner + 1];
        console.log(player + " is the winner!");
    };
    return View;
}());
exports.View = View;


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map