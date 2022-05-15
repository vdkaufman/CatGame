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
        this.photoBox = new Box(this, game.config.width/2, game.config.height/2 - 50, 'box').setOrigin(.5, .5);
        this.mirrorBox = new Box(this, game.config.width/5 - 150, game.config.height/1.5, 'box').setOrigin(.5, .5);


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
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.playerCat = new Cat(this, game.config.width/3, game.config.height/2, 'cat').setOrigin(0, 0);

        // add text
        this.text = 'test text... once the text is finished, press the spacebar to reactivate it. ______________________________________________________________________________________________________kljahsdfkjh jkhsdfkjh jkhsdf sdf sdf kjsdf khjsdf kjhhufndfxkcv iuse kjshef xvkejfs kjshdf kjsdfn kaejh xzdvj jhzdfkmnzsef uixdf zjxkn kjdk sdg jklzxchv jzsnezsd kjzhxv kmzxnfskjfzxjklhv lxzkjhdf jzser';
        this.myTestTextBox = new TextBox(this, 1, game.config.height - 1, 'cat', 0, this.text);
        
        this.controls = 'Reset: R / Meow: M / Move: WASD / Text Test: Space / Clue Test: C ';
        this.controlUI = this.add.text(game.config.width/4, 20, this.controls);

        this.clueText = 'clue test';
        this.familyPhotoText = 'family photo';
        this.mirrorText = 'interaction with mirror';
       // this.myTestClueBox = new TextBox(this, 1, game.config.height - 1, 'cat', 0, this.clue);

       // Cat box overlap
       this.physics.add.overlap(this.playerCat, this.photoBox, this.touchingBox, null, this);
       this.physics.add.overlap(this.playerCat, this.mirrorBox, this.touchingMirror, null, this);


        // Add colliders for collision sprites
        this.physics.add.collider(this.playerCat, this.wallColliderUp);
        this.physics.add.collider(this.playerCat, this.wallColliderDown);
        this.physics.add.collider(this.playerCat, this.wallColliderLeft);
        this.physics.add.collider(this.playerCat, this.wallColliderRight);
        
        // Add colliders for collision wall sprites
       /* this.physics.add.collider(this.box, this.wallColliderUp);
        this.physics.add.collider(this.box, this.wallColliderDown);
        this.physics.add.collider(this.box, this.wallColliderLeft);
        this.physics.add.collider(this.box, this.wallColliderRight);
        */
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
    touchingBox(){
        if(Phaser.Input.Keyboard.JustDown(keyC)) {
        this.myTestClueBox = new TextBox(this, 1, game.config.height - 1, 'cat', 0, this.familyPhotoText);
    }
    }
    touchingMirror(){
        if(Phaser.Input.Keyboard.JustDown(keyC)) {
        this.myTestClueBox = new TextBox(this, 1, game.config.height - 1, 'cat', 0, this.mirrorText);
    }
    }
}