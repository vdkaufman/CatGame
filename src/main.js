let config = {
    type: Phaser.AUTO,
    width: 800,
    height:500,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);
// ***** Reserve Keyboard Variables *****
let keyUP, keyDOWN, keyLEFT, keyRIGHT;
// ***** Set UI Sizes *****
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;