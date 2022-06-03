class Credits extends Phaser.Scene {
    constructor(){
        super("credits");
    }
    preload(){
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
        this.add.text(game.config.width/2, 550, ' Credits', 
        menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 650, 'Vincent Kaufman ', 
        menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 700, 'Jeff Row ', 
        menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 750, 'Keli Lindsey ', 
        menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 850, 'Thanks for playing! ', 
        menuConfig).setOrigin(0.5);

        // define keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // define sounds

        this.music = this.sound.add('music', {
            mute: false,
            volume: .1,
            rate: 1, 
            loop: true,
            delay: 0
        });

        this.music.play();

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
        this.scene.start('MenuScene');
        }
    }
}