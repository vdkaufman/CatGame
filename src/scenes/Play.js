class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        //this must be preloaded for each scene that requires text boxes
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
        this.load.image('nextPage', 
            'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
        this.load.image('cat', './assets/cat.png');
        this.load.image('simplebg', './assets/Simplebg.png');
    }
    create() {
        // white UI background
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        // simple background for playable prototype
        this.background = this.add.tileSprite(0, 0, 1100, 800, 'simplebg').setOrigin(0, 0);
  
        // define keys
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.playerCat = new Cat(this, game.config.width/2, game.config.height/2, 'cat').setOrigin(0, 0);



        this.text = 'test text... once the text is finished, press the spacebar to reactivate it. ______________________________________________________________________________________________________kljahsdfkjh jkhsdfkjh jkhsdf sdf sdf kjsdf khjsdf kjhhufndfxkcv iuse kjshef xvkejfs kjshdf kjsdfn kaejh xzdvj jhzdfkmnzsef uixdf zjxkn kjdk sdg jklzxchv jzsnezsd kjzhxv kmzxnfskjfzxjklhv lxzkjhdf jzser';
        this.myTestTextBox = new TextBox(this, 1, game.config.height - 1, 'cat', 0, this.text);
        
        // define meow sfx
        this.meow = this.sound.add('meow', {
            mute: false,
            volume: .3,
            rate: 1,
            loop: false,
            delay: 0
        });

    }

    update(){
        this.myTestTextBox.update();
        // check key input for restart
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        // check key input for menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start("menuScene");
        }   

        // play meow sfx
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.meow.play();
        }

        this.playerCat.update();
    }  

}

