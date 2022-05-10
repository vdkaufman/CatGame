class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('cat', './assets/cat.png');
    }
    create() {
        // white UI background
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0xFFFFFF).setOrigin(0, 0);
  
        // define keys
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        this.playerCat = new Cat(this, game.config.width/2, game.config.height/2, 'cat').setOrigin(0, 0);

    }

    update(){
        // check key input for restart
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        // check key input for menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start("menuScene");
        }   

        this.playerCat.update();
    }
}