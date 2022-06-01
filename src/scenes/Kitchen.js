class Kitchen extends Phaser.Scene {
    constructor() {
        super("kitchen");
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
        this.load.image('nextPage',
            'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
        this.load.spritesheet('cat', './assets/sprites/furlockSpriteSheet.png',
            { frameWidth: 115, frameHeight: 183 });
        this.load.image('simplebg', './assets/Simplebg.png');

        // load collision walls
        this.load.image('wallCollisionHorizontal', './assets/blackHorizontal1100.png');
        this.load.image('wallCollisionVertical', './assets/blackVertical800.png');

        this.load.image('backWall', './assets/livingRoom/livingRoom_backWall.png');
        this.load.image('leftWall', './assets/livingRoom/livingRoom_leftWall.png');
        this.load.image('rightWall', './assets/livingRoom/livingRoom_rightWall.png');
        this.load.image('floor', './assets/livingRoom/carpetBG.png');
        this.load.image('tableA', './assets/kitchenTableA.png');
        this.load.image('tableB', './assets/kitchenTableB.png');
        this.load.image('tableC', './assets/kitchenTableC.png');
        this.load.image('tableD', './assets/kitchenTableD.png');
        this.load.image('boxWhite', './assets/whiteBox100.png');
        this.load.image('boxBrown', './assets/brownSquare100.png');
        this.load.image('stairSwitch', './assets/blueCircle25.png');


    }
    create() {

        // Add collision sprites
        this.wallColliderUp = this.physics.add.sprite(game.config.width / 2, 300, 'wallCollisionHorizontal');
        this.wallColliderUp.setImmovable(true);
        this.wallColliderUp.body.allowGravity = false;

        this.wallColliderDown = this.physics.add.sprite(game.config.width / 2, game.config.height - 5, 'wallCollisionHorizontal');
        this.wallColliderDown.setImmovable(true);
        this.wallColliderDown.body.allowGravity = false;

        this.wallColliderLeft = this.physics.add.sprite(20, game.config.height / 2, 'wallCollisionVertical');
        this.wallColliderLeft.setImmovable(true);
        this.wallColliderLeft.body.allowGravity = false;

        this.wallColliderRight = this.physics.add.sprite(game.config.width - 20, game.config.height / 2, 'wallCollisionVertical');
        this.wallColliderRight.setImmovable(true);
        this.wallColliderRight.body.allowGravity = false;

        this.background = this.add.tileSprite(0, 0, 1100, 800, 'simplebg').setOrigin(0, 0);

        this.tableA = this.physics.add.sprite(450, 380, 'tableA');
        this.tableA.setImmovable(true);
        this.tableA.body.allowGravity = false;

        this.tableB = this.physics.add.sprite(840, 311, 'tableB');
        this.tableB.setImmovable(true);
        this.tableB.body.allowGravity = false;

        this.tableC = this.physics.add.sprite(960, 380, 'tableC');
        this.tableC.setImmovable(true);
        this.tableC.body.allowGravity = false;

        this.tableD = this.physics.add.sprite(850, 449, 'tableD');
        this.tableD.setImmovable(true);
        this.tableD.body.allowGravity = false;

        this.tableE = this.physics.add.sprite(850, 449, 'tableD');

        this.stairColliderA = this.physics.add.sprite(900, 400, 'boxWhite');
        this.stairColliderA.setImmovable(true);
        this.stairColliderA.body.allowGravity = false;

        this.stairColliderB = this.physics.add.sprite(900, 800, 'boxWhite');
        this.stairColliderB.setImmovable(true);
        this.stairColliderB.body.allowGravity = false;

        this.stairs = this.physics.add.sprite(900, 700, 'boxBrown');
        this.stairs.setImmovable(true);
        this.stairs.body.allowGravity = false;

        this.stairSwitch = this.physics.add.sprite(780, 750, 'stairSwitch');
        this.stairSwitch.setImmovable(true);
        this.stairSwitch.body.allowGravity = false;

        // add interact button indicator
        this.indicator = this.add.sprite(0, 0, 'mKey').setOrigin(.5,.5);
        this.indicator.setScale(.2,.2);
        this.indicator.setDepth(500);
        this.indicator.setAlpha(.85);
        this.indicator.setVisible(false);
       
        // define keys
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.playerCat = new Cat(this, 150, game.config.height/2 + 100, 'cat').setOrigin(.5, .5);

        this.anims.create({
            key: 'cat-up',
            frames: this.anims.generateFrameNumbers('cat', {frames: [0]}),
            repeat: -1
        });
        this.anims.create({
            key: 'cat-down',
            frames: this.anims.generateFrameNumbers('cat', {frames: [1]}),
            repeat: -1
        });
        this.playerCat.play('cat-down');

        this.meow = this.sound.add('meow', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: false,
            delay: 0
        });

        this.physics.add.collider(this.playerCat, this.tableA);
        this.physics.add.collider(this.playerCat, this.tableB);
        this.physics.add.collider(this.playerCat, this.tableC);
        this.physics.add.collider(this.playerCat, this.tableD);

        this.physics.add.overlap(this.stairColliderA, this.stairs, this.touchingStairColliderA, null, this);
        this.physics.add.overlap(this.stairColliderB, this.stairs, this.touchingStairColliderB, null, this);


        this.physics.add.overlap(this.playerCat, this.stairSwitch, this.touchingStairSwitch, null, this);


        this.switchOn == false;
        this.touchingStairsA = false; 
        this.touchingStairsB = false; 

    }

    update(){

        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            //this.scene.restart();
            this.scene.start("menuScene");
        }
        // debug options
        if (Phaser.Input.Keyboard.JustDown(key1)) {
            this.scene.start("bedroom");
        }
        if (Phaser.Input.Keyboard.JustDown(key2)) {
            this.scene.start("livingroom");
        }
        if (Phaser.Input.Keyboard.JustDown(key3)) {
            //this.scene.start("labroom");
        }

        this.playerCat.update();

        if (this.switchOn == true && !this.touchingStairsA) {
            this.stairs.y -= 8;
        }
        
        if(this.switchOn == false && !this.touchingStairsB){
            this.stairs.y += 8;
        }

        

    }

    touchingStairSwitch(cat, obj) {
        console.log('Touching Stair Switch');
        this.setIndicator(this, obj.x, obj.y, this.indicator);

        if (Phaser.Input.Keyboard.JustDown(keyM)){
            if (this.switchOn == true) {
                this.switchOn = false;
                console.log('Switch On');
            }
            else{
                this.switchOn = true;
                console.log('Switch Off');
            }
        }
    }

    touchingStairColliderA(cat, obj) {
        this.touchingStairsA = true;
        this.touchingStairsB = false;
        this.tableD.destroy();
    }

    touchingStairColliderB(cat, obj) {
        this.touchingStairsB = true;
        this.touchingStairsA = false;
    }


    setIndicator(scene, x, y, indicator){
        this.delayClock;
        indicator.x = x;
        indicator.y = y - 80;
        indicator.setVisible(true);

        this.delayClock = scene.time.addEvent({delay: 50, callback: () =>{
            indicator.setVisible(false);
            //this.delayClock.remove();
            scene.time.removeEvent(this.delayClock);

        }, callbackScope: scene, repeat: 0});
    }
}