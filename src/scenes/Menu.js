class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }
    preload(){
        this.load.spritesheet('TitleAnimation', './assets/TitleAnimation.png', 
        {frameWidth: 1100, frameHeight: 393});
    }
    create() {

        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            backgroundColor: '#3b243e',
            color: '#716d7b',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // Set Menu background color

        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x3b243e).setOrigin(0, 0);

        // Show Title image

        this.anims.create({
            key: 'TitleAnimation',
            frames: this.anims.generateFrameNumbers('TitleAnimation', {frames: [0,1]}),
            frameRate: 4,
            repeat:-1
        });

        this.startMenu = this.add.sprite(550, 300, 'TitleAnimation');
        this.startMenu.play('TitleAnimation');

        // Display Menu Text
        this.add.text(game.config.width/2, 550, ' Press [SPACE] to start ', 
        menuConfig).setOrigin(0.5);

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
        // pass to the next scene
        this.scene.start('playScene');
        }
    }
}