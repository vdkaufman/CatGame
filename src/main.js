// ***** Set Game Config *****
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
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);
// ***** Reserve Keyboard Variables *****
let keySPACE, keyUP, keyDOWN, keyLEFT, keyRIGHT, keyM, keyR;
// ***** Set UI Sizes *****
let borderUISize = game.config.height / 20;
let borderPadding = borderUISize / 3;
