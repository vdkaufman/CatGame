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
        // load white box
        this.load.image('box', './assets/whiteBox100.png');
        // load collision walls
        this.load.image('wallCollisionHorizontal', './assets/blackHorizontal1100.png');
        this.load.image('wallCollisionVertical', './assets/blackVertical800.png');

    }
    create() {
        // simple background for playable prototype
        this.background = this.add.tileSprite(0, 0, 1100, 800, 'simplebg').setOrigin(0, 0);
  
        // Add box object
        this.box = new Box(this, game.config.width/4, game.config.height/2, 'box').setOrigin(.5, .5);
        this.box.body.allowGravity = false; 

        // Add collision sprites
        this.wallColliderUp = this.physics.add.sprite(game.config.width/2, 300, 'wallCollisionHorizontal');
        this.wallColliderUp.setImmovable(true);
        this.wallColliderUp.body.allowGravity = false; 
        
        this.wallColliderDown = this.physics.add.sprite(game.config.width/2, game.config.height - 5, 'wallCollisionHorizontal');
        this.wallColliderDown.setImmovable(true);
        this.wallColliderDown.body.allowGravity = false; 
        
        this.wallColliderLeft = this.physics.add.sprite(20, game.config.height/2, 'wallCollisionVertical');
        this.wallColliderLeft.setImmovable(true);
        this.wallColliderLeft.body.allowGravity = false; 
        
        this.wallColliderRight = this.physics.add.sprite(game.config.width - 20, game.config.height/2, 'wallCollisionVertical');
        this.wallColliderRight.setImmovable(true);
        this.wallColliderRight.body.allowGravity = false; 

        // define keys
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.playerCat = new Cat(this, game.config.width/3, game.config.height/2, 'cat').setOrigin(0, 0);

        // add text
        this.text = 'test text... once the text is finished, press the spacebar to reactivate it. ______________________________________________________________________________________________________kljahsdfkjh jkhsdfkjh jkhsdf sdf sdf kjsdf khjsdf kjhhufndfxkcv iuse kjshef xvkejfs kjshdf kjsdfn kaejh xzdvj jhzdfkmnzsef uixdf zjxkn kjdk sdg jklzxchv jzsnezsd kjzhxv kmzxnfskjfzxjklhv lxzkjhdf jzser';
        this.myTestTextBox = new TextBox(this, 1, game.config.height - 1, 'cat', 0, this.text);
        
        // add collider
        this.physics.add.collider(this.playerCat, this.box);

        // Add colliders for collision sprites
        this.physics.add.collider(this.playerCat, this.wallColliderUp);
        this.physics.add.collider(this.playerCat, this.wallColliderDown);
        this.physics.add.collider(this.playerCat, this.wallColliderLeft);
        this.physics.add.collider(this.playerCat, this.wallColliderRight);
        
        // Add colliders for collision wall sprites
        this.physics.add.collider(this.box, this.wallColliderUp);
        this.physics.add.collider(this.box, this.wallColliderDown);
        this.physics.add.collider(this.box, this.wallColliderLeft);
        this.physics.add.collider(this.box, this.wallColliderRight);

        // define meow sfx
        this.meow = this.sound.add('meow', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: false,
            delay: 0
        });

    }

    update(){
        this.myTestTextBox.update();
        // check key input for restart
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            //this.scene.restart();
            this.scene.start("menuScene");
        }

        // play meow sfx
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.meow.play();
        }

        this.playerCat.update();
    }  
}