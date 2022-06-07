// Vincent Kaufman, Jeff Row, Keli Lindsey
// CMPM/AGPM 120 Final Game

// ***** Set Game Config *****

//  colors of textbox ui
const COLOR_PRIMARY = 0x3b243e;
const COLOR_LIGHT = 0xf18255;
const COLOR_DARK = 0x716d7b;

// import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
let config = {
    type: Phaser.CANVAS,
    width: 1100,
    height: 800,
    physics: {
        default: 'arcade',
        arcade:{
            debug: false
        }
    },
    fps: {
        target: 60,
        forceSetTimeOut: true 
    },
    scene: [ Menu, Bedroom, Livingroom, Kitchen, Credits ]
}

let game = new Phaser.Game(config);
// ***** Reserve Keyboard Variables *****
let keySPACE, keyUP, keyDOWN, keyLEFT, keyRIGHT, keyM, keyR, keyC, key1, key2, key3, key4;

// ***** Set UI Sizes *****
// let borderUISize = game.config.height / 20;
// let borderPadding = borderUISize / 3;
// ***** Set Colors *****
let white = 0x000000;
let blue = 0x3e31ef;
let pink = 0xe09cef;
let red = 0xef3331;
