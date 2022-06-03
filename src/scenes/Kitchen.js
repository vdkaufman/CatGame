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

        this.load.image('kitchen_backWall', './assets/kitchen/kitchen_backwall.png');
        this.load.image('kitchen_rightWall', './assets/kitchen/kitchen_rightwall.png');

        // load furniture
        this.load.image('kitchen_floor', './assets/kitchen/floor.png');
        this.load.image('cabinet', './assets/kitchen/kitchen_cabinet.png');
        this.load.image('fridge', './assets/kitchen/kitchen_fridge.png');
        this.load.image('table', './assets/kitchen/kitchen_table.png');
        this.load.spritesheet('door', './assets/door.png',
            { frameWidth: 245, frameHeight: 264 });

        this.load.image('tableA', './assets/tableTop.png');
        this.load.image('tableB', './assets/tableLeft.png');
        this.load.image('tableC', './assets/tableRight.png');
        this.load.image('tableD', './assets/tableBottomA.png');
        this.load.image('tableE', './assets/tableBottomA.png');
        this.load.image('box1', './assets/whiteBox100.png');
        this.load.image('box2', './assets/whiteBox200.png');
        this.load.image('stairSwitch', './assets/sprites/catButton.png');
        this.load.image('magGlass', './assets/sprites/magnifyingGlass.png');
        this.load.image('stairs', './assets/sprites/catStairs2.png');


    }
    create() {
       

        // Add collision sprites
        this.wallColliderUp = this.physics.add.sprite(game.config.width / 2, 250, 'wallCollisionHorizontal');
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

        this.stairColliderA = this.physics.add.sprite(850, 240, 'box1');
        this.stairColliderA.setImmovable(true);
        this.stairColliderA.body.allowGravity = false;

        this.stairColliderB = this.physics.add.sprite(850, 800, 'box1');
        this.stairColliderB.setImmovable(true);
        this.stairColliderB.body.allowGravity = false;
       
        this.wallColliderA = this.physics.add.sprite(150, 270, 'box2');
        this.wallColliderA.setImmovable(true);
        this.wallColliderA.body.allowGravity = false;

        
        this.tableA = this.physics.add.sprite(540, 200, 'tableA');
        this.tableA.setImmovable(true);
        this.tableA.body.allowGravity = false;
        this.tableA.setScale(.55, 1);


        this.tableB = this.physics.add.sprite(315, 300, 'tableB');
        this.tableB.setImmovable(true);
        this.tableB.body.allowGravity = false;

        this.tableC = this.physics.add.sprite(765, 300, 'tableC');
        this.tableC.setImmovable(true);
        this.tableC.body.allowGravity = false;

        this.tableD = this.physics.add.sprite(450, 370, 'tableD');
        this.tableD.setImmovable(true);
        this.tableD.body.allowGravity = false;
        this.tableD.setScale(.4, 1);

        this.tableF = this.physics.add.sprite(570, 370, 'tableE');
        this.tableF.setImmovable(true);
        this.tableF.body.allowGravity = false;
        this.tableF.setScale(.6, 1);



        this.livingroomDoor = this.physics.add.sprite(game.config.width, game.config.height - 75, 'box1');

        // background objects
        this.floor = this.add.sprite(0, 0, 'kitchen_floor').setOrigin(0, 0);
        this.backWall = this.add.sprite(0, 0, 'kitchen_backWall').setOrigin(0, 0);
        this.rightWall = this.add.sprite(1054, 0, 'kitchen_rightWall').setOrigin(0, 0);

        this.stairs = this.physics.add.sprite(820, 700, 'stairs');
        this.stairs.setImmovable(true);
        this.stairs.body.allowGravity = false;

        this.stairSwitch = this.physics.add.sprite(650, 750, 'stairSwitch');
        this.stairSwitch.setImmovable(true);
        this.stairSwitch.body.allowGravity = false;

        this.fridge = this.physics.add.sprite(100, 225, 'fridge');

        this.cabinet = this.physics.add.sprite(475, 325, 'cabinet');

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

        this.playerCat = new Cat(this, 150, game.config.height/2 + 100, 'cat').setOrigin(.5, 0);

        this.mGlass = this.physics.add.sprite(375, 300, 'magGlass').setOrigin(.5,.5).setScale(.7,.7);

        this.playerCat.play('cat-down');

        this.meow = this.sound.add('meow', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: false,
            delay: 0
        });

        // Create door open/close animation
        this.bedroomDoor = this.physics.add.sprite(game.config.width - 165, 125, 'door');
        this.bedroomDoor.setImmovable(true);
        this.bedroomDoor.body.allowGravity = false;

        this.anims.create({
            key: 'doorClosed',
            frames: this.anims.generateFrameNumbers('door', {frames: [0]}),
            repeat: -1
        });
        this.anims.create({
            key: 'doorOpen',
            frames: this.anims.generateFrameNumbers('door', {frames: [1]}),
            repeat: -1
        });
        this.bedroomDoor.play('doorOpen');

        // Add colliders for collision sprites
        this.physics.add.collider(this.playerCat, this.wallColliderUp);
        this.physics.add.collider(this.playerCat, this.wallColliderDown);
        this.physics.add.collider(this.playerCat, this.wallColliderLeft);
        this.physics.add.collider(this.playerCat, this.wallColliderRight);

        this.physics.add.collider(this.playerCat, this.tableA);
        this.physics.add.collider(this.playerCat, this.tableB);
        this.physics.add.collider(this.playerCat, this.tableC);
        this.physics.add.collider(this.playerCat, this.tableD);
        this.physics.add.collider(this.playerCat, this.tableF);
        this.physics.add.collider(this.playerCat, this.wallColliderA);


        this.physics.add.overlap(this.stairColliderA, this.stairs, this.touchingStairColliderA, null, this);
        this.physics.add.overlap(this.stairColliderB, this.stairs, this.touchingStairColliderB, null, this);

        this.physics.add.overlap(this.playerCat, this.mGlass, this.touchingGlass, null, this);

        this.physics.add.overlap(this.playerCat, this.stairSwitch, this.touchingStairSwitch, null, this);

        this.physics.add.overlap(this.playerCat, this.livingroomDoor, this.touchingDoor, null, this);

        //this.switchOn = false;
        this.touchingStairsA = false; 
        this.touchingStairsB = false; 
        this.table = false;

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
        //if (Phaser.Input.Keyboard.JustDown(key2)) {
            //this.scene.start("kitchen");
        //}
        if (Phaser.Input.Keyboard.JustDown(key3)) {
            this.scene.start("livingroom");
        }

        this.playerCat.update();

        if (this.switchOn == true && !this.touchingStairsA) {
            this.stairs.y -= 8;
        }
        
        if(this.switchOn == false && !this.touchingStairsB){
            this.stairs.y += 8;
        }
        
        if(this.switchOn == true){
            this.tableC.destroy();
        } 
    
        if (Cat.haveGlass == true) {
            if (this.playerCat.dir == 3){
                // cat facing left
                this.mGlass.flipX = true;
                this.mGlass.x = this.playerCat.x - 15;
                this.mGlass.y = this.playerCat.y + 95;
            }
            if (this.playerCat.dir == 2){
                // cat facing right
                this.mGlass.resetFlip();
                this.mGlass.x = this.playerCat.x + 15;
                this.mGlass.y = this.playerCat.y + 95;
            }
            if (this.playerCat.dir == 1) {
                // cat facing down
                this.mGlass.resetFlip();
                this.mGlass.x = this.playerCat.x - 10;
                this.mGlass.y = this.playerCat.y + 95;
            }
            if (this.playerCat.dir == 0) {
                // cat facing up
                this.mGlass.resetFlip();
                this.mGlass.x = this.playerCat.x + this.playerCat.width/2 - 20;
                this.mGlass .y = this.playerCat.y + 95;
            }
        }
    
    }

    touchingStairSwitch(cat, obj) {
        this.setIndicator(this, obj.x, obj.y, this.indicator);

        if (Phaser.Input.Keyboard.JustDown(keyM)){
            if (this.switchOn == true) {
                this.switchOn = false;


                this.tableC = this.physics.add.sprite(765, 300, 'tableE');
                this.tableC.setVisible(false);
                this.tableC.setImmovable(true);
                this.tableC.body.allowGravity = false;
                this.physics.add.collider(this.playerCat, this.tableC);
                console.log('table collider Spawn');

                this.table = false;

                console.log('Switch Off');
            }
            else{
                this.switchOn = true;
                this.table = true;

                console.log('Switch On');
            }
        }
    }

    touchingGlass(cat, obj){

        if(!Cat.haveGlass){
            this.setIndicator(this, obj.x, obj.y, this.indicator);
            if(Phaser.Input.Keyboard.JustDown(keyM)) {
                Cat.haveGlass = true;
                console.log('Have Glass');
            }
        }

    }

    touchingStairColliderA(cat, obj) {
        this.touchingStairsA = true;
        this.touchingStairsB = false;
     
    }

    touchingStairColliderB(cat, obj) {
        this.touchingStairsB = true;
        this.touchingStairsA = false;
        
    }

    touchingDoor(cat, obj) {
        this.setIndicator(this, obj.x - 30, obj.y + 75, this.indicator);
            if(Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start('livingroom');
            }
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