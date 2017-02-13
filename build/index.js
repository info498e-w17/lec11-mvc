"use strict";
var model_1 = require("./model");
var view_1 = require("./view");
var controller_1 = require("./controller");
var game = new model_1.Model();
var view = new view_1.View(game);
var ctrl = new controller_1.Controller(game, view);
console.log("starting game...");
ctrl.play();
