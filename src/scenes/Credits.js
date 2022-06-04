class Credits extends Phaser.Scene {
    constructor(){
        super("credits");
    }
    preload(){
        this.load.audio('music','./assets/AfterRain.mp3');

        this.load.spritesheet('creditsBG', './assets/bg_spritesheet.png', 
        {frameWidth: 1100, frameHeight: 800});

        //this.load.script('SingleDayA', './assets/fonts/SingleDay.ttf');
        
    }
    create() {

        let titleConfig = {
            fontFamily: 'SingleDay',
            fontSize: '34px',
            //backgroundColor: '#3b243e',
            color: '#ffffff',
            align: 'center',
            padding: {
                top: 0,
                bottom: 0,
            },
            fixedWidth: 0
        }
        let subTitleConfig = {
            fontFamily: 'SingleDay',
            fontSize: '28px',
            //backgroundColor: '#3b243e',
            color: '#ffffff',
            align: 'center',
            padding: {
                top: 3,
                bottom: 3,
            },
            fixedWidth: 0
        }
        let credConfig = {
            fontFamily: 'SingleDay',
            fontSize: '26px',
            //backgroundColor: '#3b243e',
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
            key: 'creditsBG',
            frames: this.anims.generateFrameNumbers('creditsBG', {frames: [0,1,2,3,4,5]}),
            frameRate: 4,
            repeat:-1
        });

        this.startMenu = this.add.sprite(550, 400, 'creditsBG');
        this.startMenu.play('creditsBG');

        // init text
        this.title = this.add.text(game.config.width/2, game.config.height, 'CREDITS', 
            titleConfig).setOrigin(0.5,0);

        this.vTitles = this.credits = this.add.text(game.config.width/2, game.config.height+105, 'Lead Level Designer', 
            subTitleConfig).setOrigin(0.5,0);
        this.jTitles = this.credits = this.add.text(game.config.width/2, game.config.height+205, 'Lead Character Artist', 
            subTitleConfig).setOrigin(0.5,0);
        this.kTitles = this.credits = this.add.text(game.config.width/2, game.config.height+305, 'Lead Environment & UI Artist', 
            subTitleConfig).setOrigin(0.5,0);

        this.vincent = this.add.text(game.config.width/2, game.config.height+135, 'Vincent Kaufman', 
            credConfig).setOrigin(0.5,0);
        this.jeff = this.add.text(game.config.width/2, game.config.height+235, 'Jeff Row', 
            credConfig).setOrigin(0.5,0);
        this.keli = this.add.text(game.config.width/2, game.config.height+335, 'Keli Lindsey', 
            credConfig).setOrigin(0.5,0);

        this.musicCred = this.add.text(game.config.width/2, game.config.height+525, 'Background music: After Rain — \nZackross [Audio Library Release]\n\nMusic provided by Audio Library Plus\n\nWatch: https://youtu.be/RW83XjwJKVA\n\nFree Download/Stream: https://alplus.io/after-rain', 
            credConfig).setOrigin(0.5,0);

        this.finalTxt = this.add.text(game.config.width/2, game.config.height+825, 'Press [SPACE] to return to the main menu', 
            credConfig).setOrigin(0.5,0);
            
        // text scroll speed
        this.scrollSpd = .8;
        // this.add.text(game.config.width/2, game.config.height/3,  ' Credits', 
        // menuConfig).setOrigin(0.5,.5);
        // this.add.text(game.config.width/2, game.config.height/3 + 150, 'Vincent Kaufman ', 
        // menuConfig).setOrigin(0.5,.5);
        // this.add.text(game.config.width/2, game.config.height/3 + 200, 'Jeff Row ', 
        // menuConfig).setOrigin(0.5,.5);
        // this.add.text(game.config.width/2, game.config.height/3 + 300, 'Keli Lindsey ', 
        // menuConfig).setOrigin(0.5,.5);
        // this.add.text(game.config.width/2, game.config.height/3 + 400, 'Thanks for playing! ', 
        // menuConfig).setOrigin(0.5,.5);
        // Track: After Rain — Zackross [Audio Library Release]
        // Music provided by Audio Library Plus
        // Watch: https://youtu.be/RW83XjwJkVA
        // Free Download / Stream: https://alplus.io/after-rain

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // define sounds

        this.music = this.sound.add('music', {
            mute: false,
            volume: .1,
            rate: 1, 
            loop: true,
            delay: 0
        });

        // this.music.play();

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('menuScene');
        }

        this.title.y -= this.scrollSpd;
        this.vTitles.y -= this.scrollSpd;
        this.jTitles.y -= this.scrollSpd;
        this.kTitles.y -= this.scrollSpd;
        this.vincent.y -= this.scrollSpd;
        this.jeff.y -= this.scrollSpd;
        this.keli.y -= this.scrollSpd;
        this.musicCred.y -= this.scrollSpd;
        if (this.finalTxt.y >= 400){
            console.log('in if statement');
            this.finalTxt.y -= this.scrollSpd;
        }
    }
}