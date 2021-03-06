class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }
    preload(){
        this.load.audio('meow', './assets/sfx/meow.wav');
        this.load.audio('meow1','./assets/sfx/meow1_yfjesse.wav');
        this.load.audio('meow2','./assets/sfx/meow2_yfjesse.wav');
        this.load.audio('meow3','./assets/sfx/meow3_abir19.wav');
        this.load.audio('music','./assets/AfterRain.mp3');

        this.load.spritesheet('TitleAnimation', './assets/TitleAnimation.png', 
        {frameWidth: 1100, frameHeight: 393});

        //this.load.script('SingleDayA', './assets/fonts/SingleDay.ttf');
        
    }
    create() {

        // menu text configuration
        let menuConfig = {
            fontFamily: 'SingleDay',
            fontSize: '26px',
            backgroundColor: '#3b243e',
            color: '#ffffff',
            align: 'center',
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
        this.add.text(game.config.width/2, 650, ' [M] - interact/next text\n\n[WASD] - walk ', 
        menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 750, ' Press [C] to see credits ', 
        menuConfig).setOrigin(0.5);

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        // define sounds

        this.music = this.sound.add('music', {
            mute: false,
            volume: .1,
            rate: 1, 
            loop: true,
            delay: 0
        });
        
        if (!Cat.musicOn){
            this.music.play();
            Cat.musicOn = true;
        }

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            // pass to the next scene
            //this.meow.play();
            this.scene.start('bedroom');
        }
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            // pass to the next scene
            //this.meow.play();
            this.scene.start('credits');
        }
    }
}