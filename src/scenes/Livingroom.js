class Livingroom extends Phaser.Scene {
    constructor(){
        super("livingroom");
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
        this.load.spritesheet('cat', './assets/sprites/furlockSpriteSheet.png',
            {frameWidth: 115, frameHeight: 183});
        this.load.image('simplebg', './assets/Simplebg.png');
        this.load.image('mKey', './assets/sprites/mKey.png');

        // load box pngs
        this.load.image('box', './assets/brownSquare100.png');
        this.load.image('boxWhite', './assets/whiteBox100.png');

        // load collision walls
        this.load.image('wallCollisionHorizontal', './assets/blackHorizontal1100.png');
        this.load.image('wallCollisionVertical', './assets/blackVertical800.png');

        this.load.image('backWall', './assets/livingRoom/livingRoom_backWall.png');
        this.load.image('leftWall', './assets/livingRoom/livingRoom_leftWall.png');
        this.load.image('rightWall', './assets/livingRoom/livingRoom_rightWall.png');
        this.load.image('floor', './assets/livingRoom/carpetBG.png');

        // load furniture
        this.load.image('bookCase', './assets/livingRoom/livingRoom_bookCase.png');
        this.load.image('catTree', './assets/livingRoom/livingRoom_catTree.png');
        this.load.image('frame01', './assets/livingRoom/livingRoom_frame01.png');
        this.load.image('frame02', './assets/livingRoom/livingRoom_frame02.png');
        this.load.image('lampStand', './assets/livingRoom/livingRoom_lampStand.png');
        this.load.image('sofa', './assets/livingRoom/livingRoom_sofa.png');
        this.load.image('window', './assets/livingRoom/livingRoom_window.png');

        this.load.image('greyCircle', './assets/greyCircle25.png');
        this.load.image('blueCircle', './assets/blueCircle25.png');
        this.load.image('key', './assets/blueKey.png');
        this.load.image('roomba', './assets/sprites/roomba.png');

    }
    create() {
   
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
        
        this.floorSwitch1 = this.physics.add.sprite(game.config.width/2 - 200, game.config.height/2, 'boxWhite');
        this.floorSwitch2 = this.physics.add.sprite(game.config.width/2 + 250, game.config.height/2, 'boxWhite');
        this.floorSwitch3 = this.physics.add.sprite(game.config.width/2 - 200, game.config.height/2 + 400, 'boxWhite');
        this.floorSwitch4 = this.physics.add.sprite(game.config.width/2 + 250, game.config.height/2 + 400, 'boxWhite');

        // simple background for playable prototype
        this.background = this.add.tileSprite(0, 0, 1100, 800, 'simplebg').setOrigin(0, 0);

        this.brokenRoombaSwitch = this.physics.add.sprite(game.config.width/2 - 350, game.config.height/2 - 50, 'greyCircle');
        this.brokenRoombaSwitch.setImmovable(true);

        //this.blueLock = this.physics.add.sprite(game.config.width/2 - 350, game.config.height/2 + 350, 'blueCircle');
        //this.blueLock.setImmovable(true);

        this.doorText = 'The door is locked';
        this.doorBoxA = new ClueItem(this, game.config.width -25, game.config.height/2 + 170, 'boxWhite', 0,
            this.doorText, null).setOrigin(.5, .5);
        
        this.doorBoxB = new ClueItem(this, game.config.width -25, game.config.height/2 + 80, 'boxWhite', 0,
            this.doorText, null).setOrigin(.5, .5);

        this.roomba = new Roomba(this, game.config.width - 300, game.config.height/3 + 50, 'roomba').setOrigin(.5,.5);

        this.puzzleComplete = false;
        this.haveKey = false;
        this.roombaMovement = 0;
        this.mSwitch = false;

        this.puzzleText = 'Hooray! You completed the puzzle! The door is unlocked!';

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

        // render key after player character
        this.blueKey = new Grab(this, game.config.width/2 - 350, game.config.height/2 + 350, 'key').setOrigin(.5, .5);
        
        this.puzzleText = 'Hooray! You completed the puzzle! Press R to Reset';

        this.controls = 'Interact-Meow: M  /  Move: WASD  /  Reset: R ';
        this.controlUI = this.add.text(game.config.width/2, 50, this.controls).setOrigin(.5,.5);

        // Cat box overlap
       this.physics.add.overlap(this.playerCat, this.doorBoxA, this.touchingDoorBox, null, this);
       this.physics.add.overlap(this.playerCat, this.doorBoxB, this.touchingDoorBox, null, this);
       this.physics.add.overlap(this.playerCat, this.blueKey, this.touchingKey, null, this);
       this.physics.add.overlap(this.roomba, this.floorSwitch3, this.touchingSwitch3, null, this);
       this.physics.add.overlap(this.roomba, this.floorSwitch4, this.touchingSwitch4, null, this);
       this.physics.add.overlap(this.roomba, this.floorSwitch1, this.touchingSwitch1, null, this);
       this.physics.add.overlap(this.roomba, this.floorSwitch2, this.touchingSwitch2, null, this);

       this.physics.add.overlap(this.roomba, this.playerCat, this.touchingRoomba, null, this);

       this.physics.add.overlap(this.playerCat, this.doorBoxA, this.puzzleCompleted, null, this);
       this.physics.add.overlap(this.playerCat, this.doorBoxB, this.puzzleCompleted, null, this);

       this.physics.add.overlap(this.playerCat, this.brokenRoombaSwitch, this.touchingMSwitch, null, this);
       this.physics.add.overlap(this.blueKey, this.blueLock, this.touchingBlueLock, null, this);


        // Add colliders for collision sprites
        this.physics.add.collider(this.playerCat, this.wallColliderUp);
        this.physics.add.collider(this.playerCat, this.wallColliderDown);
        this.physics.add.collider(this.playerCat, this.wallColliderLeft);
        this.physics.add.collider(this.playerCat, this.wallColliderRight);

        this.physics.add.collider(this.playerCat, this.topBox);
        this.physics.add.collider(this.playerCat, this.topBox2);
        this.physics.add.collider(this.playerCat, this.topBox3);

        this.meow = this.sound.add('meow', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: false,
            delay: 0
        });

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

        if (this.haveKey == true) {
            if (this.playerCat.dir == 1) {
                this.blueKey.x = this.playerCat.x + 30;
                this.blueKey.y = this.playerCat.y + 30;
            }
            if (this.playerCat.dir == 0) {
                this.blueKey.x = this.playerCat.x - 30;
                this.blueKey.y = this.playerCat.y + 30;
            }
        }
        else {
            if (this.puzzleComplete) {
                this.blueKey.destroy();
            }
        }

        this.playerCat.update();

        if(this.roombaMovement == 0){
            // go down
            this.roomba.y += 8;
        }
        if(this.roombaMovement == 1){
            // go up
            this.roomba.y -= 8;
        }
        if(this.roombaMovement == 2){
            // go left
            this.roomba.x -= 8;
        }
        if(this.roombaMovement == 3){
            // go right
            this.roomba.x += 8;
        }

    }  

    touchingBlueLock(cat, obj) {

        if(!this.puzzleCompleted){
            this.setIndicator(this, obj.x, obj.y, this.indicator);
            console.log('blue lock');
        }

        else{ 
            this.blueKey.alpha = 0;
            this.puzzleDone = this.add.text(game.config.width/4, game.config.height/2 + 100, this.puzzleText);
        }
    }

    touchingMSwitch(cat, obj) {
        console.log('Touching Broken Switch');
        this.setIndicator(this, obj.x, obj.y, this.indicator);

        if (Phaser.Input.Keyboard.JustDown(keyM)){
            if (this.haveKey == true) {
                this.mSwitch = true;
                this.blueKey.destroy();
                console.log('Switch On');
            }
            else{
                console.log('Switch Off');
            }
        }
    } 

    touchingDoorBox(cat, obj) {
        this.setIndicator(this, obj.x, obj.y, this.indicator);
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            if (!this.puzzleCompleted) {
                obj.openTextBox();
            }
            if (this.puzzleCompleted) {
                this.scene.start('kitchen');
            }
        }
    }

    touchingKey(cat, obj){
        if(!this.haveKey){
            this.setIndicator(this, obj.x, obj.y, this.indicator);
            if(Phaser.Input.Keyboard.JustDown(keyM)) {
                this.haveKey = true;
                console.log('Have Key');
            }
        }
    }
    touchingSwitch1(floorSwitchA, obj){
        // go right
        if(this.mSwitch == true){
            this.roombaMovement = 0;
            this.roomba.angle = 0;
        }
    }
    touchingSwitch2(floorSwitchA, obj){
        if(this.mSwitch == true){
            // go left
            this.roombaMovement = 2; 
            this.roomba.angle = 90;
        }
        else{
        // go down
        this.roombaMovement = 0;
        this.roomba.angle= 0;
     }
    }
    touchingSwitch3(floorSwitchA, obj){
        // go up
        this.roombaMovement = 3;
        this.roomba.angle = 280;
    }
    touchingSwitch4(floorSwitchA, obj){
        // go left
        this.roombaMovement = 1;
        this.roomba.angle = 180;
    }
  
    touchingRoomba(){
        this.scene.start("livingroom");
    }

    puzzleCompleted(cat, obj){
        if (this.haveKey){
            this.puzzleComplete = true;
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