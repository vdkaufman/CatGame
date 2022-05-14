// ***** Set Game Config *****

//  colors of textbox ui
const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

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
    // plugins:{
    //     scene:[{
    //         key: 'rexUI',
    //         plugin: UIPlugin,
    //         mapping: 'rexUI'
    //     }]
    // },
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);
// ***** Reserve Keyboard Variables *****
let keySPACE, keyUP, keyDOWN, keyLEFT, keyRIGHT, keyM, keyR;
// ***** Set UI Sizes *****
let borderUISize = game.config.height / 20;
let borderPadding = borderUISize / 3;
