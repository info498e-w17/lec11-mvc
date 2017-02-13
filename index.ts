import {Model} from './model';
import {View} from './view-web';
import {Controller} from './controller-web';

let game:Model = new Model();
let view:View = new View(game);
let ctrl:Controller = new Controller(game, view);

console.log("starting game... with changes!");
ctrl.play();
