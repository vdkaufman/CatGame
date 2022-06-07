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
            {frameWidth: 124, frameHeight: 187});
        this.load.image('furlockPortrait', './assets/sprites/furlockFace.png');
        this.load.image('simplebg', './assets/Simplebg.png');
        this.load.image('mKey', './assets/sprites/mKey.png');

        // load box pngs
        this.load.image('box', './assets/brownSquare100.png');
        this.load.image('boxWhite', './assets/whiteBox100.png');

        // load collision walls
        this.load.image('wallCollisionHorizontal', './assets/blackHorizontal1100.png');
        this.load.image('wallCollisionVertical', './assets/blackVertical800.png');

        this.load.image('livingroomBackWall', './assets/livingRoom/livingRoom_backWall.png');
        this.load.image('livingroomLeftWall', './assets/livingRoom/livingRoom_leftWall.png');
        this.load.image('livingroomRightWall', './assets/livingRoom/livingRoom_rightWall.png');
        this.load.image('livingroomFloor', './assets/livingRoom/carpetBG.png');

        // load furniture
        this.load.image('bookCase', './assets/livingRoom/livingRoom_bookCase.png');
        this.load.image('catTree', './assets/livingRoom/livingRoom_catTree.png');
        this.load.image('frame01', './assets/livingRoom/livingRoom_frame01.png');
        this.load.image('frame02', './assets/livingRoom/livingRoom_frame02.png');
        this.load.image('lampStand', './assets/livingRoom/livingRoom_lampStand.png');
        this.load.image('sofa', './assets/livingRoom/livingRoom_sofa.png');
        this.load.image('window', './assets/livingRoom/livingRoom_window.png');
        this.load.image('stairs', './assets/sprites/catStairs2.png');


        this.load.image('button', './assets/sprites/catButton.png');
        this.load.image('blueCircle', './assets/blueCircle25.png');
        this.load.image('roombaKey', './assets/sprites/pinkKeyCard.png');
        this.load.image('roombaSwitch', './assets/sprites/roombaSwitch.png');
        this.load.spritesheet('lightbulb', './assets/sprites/lightbulb.png',
            {frameWidth: 22, frameHeight: 29});// frame2 = pink
        this.load.image('key', './assets/blueKey.png');
        this.load.spritesheet('roomba', './assets/sprites/roomba.png',
            {frameWidth:283, frameHeight: 282});

        this.load.image('magGlass', './assets/sprites/magnifyingGlass.png');


    }
    create() {
   
        // Add hidden collision sprites
        this.wallColliderUp = this.physics.add.sprite(game.config.width/2, 290, 'wallCollisionHorizontal');
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
       

        this.roombaWall = this.physics.add.sprite(game.config.width/2 + 275, game.config.height/2, 'wallCollisionVertical');
        this.roombaWall.setImmovable(true);
        this.roombaWall.body.allowGravity = false; 

        this.floorSwitch1 = this.physics.add.sprite(game.config.width/2 - 350, game.config.height/2 - 50, 'boxWhite');
        this.floorSwitch2 = this.physics.add.sprite(game.config.width/2 + 325, game.config.height/2 - 50, 'boxWhite');
        this.floorSwitch3 = this.physics.add.sprite(game.config.width/2 - 350, game.config.height/2 + 350, 'boxWhite');
        this.floorSwitch4 = this.physics.add.sprite(game.config.width/2 + 325, game.config.height/2 + 350, 'boxWhite');

        this.bookcaseCollider = this.physics.add.sprite(game.config.width/2, 225, 'box2');
        this.bookcaseCollider.setImmovable(true);
        this.bookcaseCollider.body.allowGravity = false; 

        this.kitchenDoor = this.physics.add.sprite(0, 725, 'boxWhite');

        // simple background for playable prototype
        this.floor = this.add.sprite(0, 0, 'livingroomFloor').setOrigin(0, 0);
        this.backWall = this.add.sprite(46, 0, 'livingroomBackWall').setOrigin(0, 0);
        this.leftWall = this.add.sprite(0, 0, 'livingroomLeftWall').setOrigin(0, 0);
        this.rightWall = this.add.sprite(1054, 0, 'livingroomRightWall').setOrigin(0, 0);

        this.bookcaseText = 'Bookcase: \nIt\'s full of books. \n\nYou found a keycard!';
        this.bookcaseText2 = 'Bookcase: \nMaxine sure does love books...\n\nThis one\s called "Adventures of Sherlock Holmes..." \nit must be named after me!';
        this.bookcase = new ClueItem(this, 550, 200, 'bookCase', 0,
        this.bookcaseText, null, 'furlockPortrait').setOrigin(.5, .5);
        this.bookcase.setScale(.8,.8);

        this.catTreeText = 'Cat Tree: \nzzzZZZ';
        this.catTree = new ClueItem(this, 290, 280, 'catTree', 0,
        this.catTreeText, null,'furlockPortrait').setOrigin(.5, .5);
        this.catTree.setScale(.8,.8);

        this.frame1 = this.add.sprite(100, 10, 'frame01').setOrigin(0, 0);
        this.frame3 = this.add.sprite(240, 10, 'frame02').setOrigin(0, 0);
        this.frame4 = this.add.sprite(975, 10, 'frame01').setOrigin(0, 0);
        this.window = this.add.sprite(725, 10, 'window').setOrigin(0, 0);
        this.window.setScale(.9,.9);

        this.lampStand = this.physics.add.sprite(998, 385, 'lampStand').setOrigin(0, 0);
        this.lampStand.setImmovable(true);
        this.lampStand.body.allowGravity = false; 

        // Add roomba switch objects
        //*****************************/
        // add switch light settings
        this.anims.create({
            key: 'light-pink',
            frames: this.anims.generateFrameNumbers('lightbulb', {frames: [2]}),
            repeat: -1
        });
        this.anims.create({
            key: 'light-blue',
            frames: this.anims.generateFrameNumbers('lightbulb', {frames: [1]}),
            repeat: -1
        });
        this.switchLight = this.add.sprite(game.config.width/2 - 418, game.config.height/2 - 224, 'lightbulb').setOrigin(.5,.5);
        this.switchLight.play('light-blue');
        this.switchLight.setScale(1.1,1.1);

        // add switch
        this.switchTxt = "Maxine made this to control the Roombot, but what did she do with the keycard?";
        this.roombaSwitch = new ClueItem(this, game.config.width/2 - 420, game.config.height/2 - 150, 'roombaSwitch', 0, 
            this.switchTxt, null, 'furlockPortrait').setOrigin(.5,.5);;
        this.roombaSwitch.setImmovable(true);
        this.roombaSwitch.setScale(1,1);
        //****************************/

        //this.blueLock = this.physics.add.sprite(game.config.width/2 - 350, game.config.height/2 + 350, 'blueCircle');
        //this.blueLock.setImmovable(true);
       
        this.button = this.physics.add.sprite(game.config.width - 125, 350, 'button');

        this.roomba = new Roomba(this, game.config.width - 225, game.config.height/3 + 200, 'roomba').setOrigin(.5,.5);
              
        if(!Cat.stairButton){
        this.stairs = this.physics.add.sprite(game.config.width/2 + 440, game.config.height - 75, 'stairs');
        }
        this.sofa = this.physics.add.sprite(370, 440, 'sofa').setOrigin(0, 0);
        this.sofa.setImmovable(true);
        this.sofa.body.allowGravity = false; 
        this.sofa.setScale(.8,.8);
        this.sofaSprite = this.add.sprite(355, 430, 'sofa').setOrigin(0, 0);


        this.anims.create({
            key: 'roomba-down',
            frames: this.anims.generateFrameNumbers('roomba', {frames: [0]}),
            repeat: -1
        });
        this.anims.create({
            key: 'roomba-up',
            frames: this.anims.generateFrameNumbers('roomba', {frames: [1]}),
            repeat: -1
        });
        this.anims.create({
            key: 'roomba-left',
            frames: this.anims.generateFrameNumbers('roomba', {frames: [2]}),
            repeat: -1
        });
        this.anims.create({
            key: 'roomba-right',
            frames: this.anims.generateFrameNumbers('roomba', {frames: [3]}),
            repeat: -1
        });
        this.puzzleComplete = false;
        this.haveKey = false;
        this.roombaMovement = 0;
        this.mSwitch = false;
        Cat.kScene = false;
        Cat.lScene = true;


        this.puzzleText = 'Hooray! You completed the puzzle! The door is unlocked!';

        // add interact button indicator
        this.indicator = this.add.sprite(0, 0, 'mKey').setOrigin(.5,.5);
        this.indicator.setScale(.2,.2);
        this.indicator.setDepth(500); // control render depth
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
        
        this.playerCat = new Cat(this, 100, game.config.height - 175, 'cat').setOrigin(.5, 0);
        
        this.mGlass = this.physics.add.sprite(-500, 400, 'magGlass').setOrigin(.5,.5).setScale(.7,.7);

        // add key in front of player but off screen
        this.pinkKey = new Grab(this, game.config.width/2, game.config.height/2 - 800, 'roombaKey').setOrigin(.5, .5);
        this.pinkKey.setScale(.8,.8);

        this.playerCat.play('cat-right');
       
        this.puzzleText = 'Hooray! You completed the puzzle! Press R to Reset';

        this.controls = 'Interact-Meow: M  /  Move: WASD  /  Reset: R ';
        this.controlUI = this.add.text(game.config.width/2, 50, this.controls).setOrigin(.5,.5);

        // Cat box overlap
       this.physics.add.overlap(this.playerCat, this.kitchenDoor, this.touchingDoor, null, this);
       this.physics.add.overlap(this.roomba, this.floorSwitch3, this.touchingSwitch3, null, this);
       this.physics.add.overlap(this.roomba, this.floorSwitch4, this.touchingSwitch4, null, this);
       this.physics.add.overlap(this.roomba, this.floorSwitch1, this.touchingSwitch1, null, this);
       this.physics.add.overlap(this.roomba, this.floorSwitch2, this.touchingSwitch2, null, this);

       this.physics.add.overlap(this.roomba, this.playerCat, this.touchingRoomba, null, this);
       this.physics.add.overlap(this.playerCat, this.button, this.touchingButton, null, this);

       this.physics.add.overlap(this.playerCat, this.roombaSwitch, this.touchingMSwitch, null, this);
       this.physics.add.overlap(this.pinkKey, this.blueLock, this.touchingBlueLock, null, this);
       this.physics.add.overlap(this.playerCat, this.bookcase, this.touchingBookcase, null, this);
       this.physics.add.overlap(this.playerCat, this.catTree, this.touchingCatTree, null, this);



        // Add colliders for collision sprites
        this.physics.add.collider(this.playerCat, this.wallColliderUp);
        this.physics.add.collider(this.playerCat, this.wallColliderDown);
        this.physics.add.collider(this.playerCat, this.wallColliderLeft);
        this.physics.add.collider(this.playerCat, this.wallColliderRight);
        this.physics.add.collider(this.playerCat, this.roombaWall);
        this.physics.add.collider(this.playerCat, this.bookcaseCollider);
        this.physics.add.collider(this.playerCat, this.lampStand);

        
        this.physics.add.collider(this.playerCat, this.topBox);
        this.physics.add.collider(this.playerCat, this.topBox2);
        this.physics.add.collider(this.playerCat, this.topBox3);
        this.physics.add.collider(this.playerCat, this.sofa);
        this.physics.add.collider(this.playerCat, this.lampStand);


        this.meow = this.sound.add('meow', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: false,
            delay: 0
        });

        if (Cat.puzzleCompleteB) {
            this.mSwitch = true;
            this.pinkKey.destroy();
            this.roombaWall.destroy();
            this.switchLight.play('light-pink');
        }

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
            this.scene.start("kitchen");
        }
        //if (Phaser.Input.Keyboard.JustDown(key3)) {
            //this.scene.start("living room");
        //}

        if (this.haveKey == true) {
            if (this.playerCat.dir == 3) {
                this.pinkKey.x = this.playerCat.x - 15;
                this.pinkKey.y = this.playerCat.y + 95;
            }
            if (this.playerCat.dir == 2) {
                this.pinkKey.x = this.playerCat.x + 15;
                this.pinkKey.y = this.playerCat.y + 95;
            }
            if (this.playerCat.dir == 1) {
                this.pinkKey.x = this.playerCat.x + 30;
                this.pinkKey.y = this.playerCat.y + 95;
            }
            if (this.playerCat.dir == 0) {
                this.pinkKey.x = this.playerCat.x - 30;
                this.pinkKey.y = this.playerCat.y + 95;
            }
        }
        else {
            if (this.puzzleComplete) {
                this.pinkKey.destroy();
                this.roombaWall.destroy();
            }
        }

        this.playerCat.update();

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

        if(this.roombaMovement == 0){
            // go down
            this.roomba.play('roomba-down');
            this.roomba.y += 5;
        }
        if(this.roombaMovement == 1){
            // go up
            this.roomba.play('roomba-up');
            this.roomba.y -= 5;
        }
        if(this.roombaMovement == 2){
            // go left
            this.roomba.play('roomba-left');
            this.roomba.x -= 5;
        }
        if(this.roombaMovement == 3){
            // go right
            this.roomba.play('roomba-right');
            this.roomba.x += 5;
        }

        if(Cat.stairButton){
            this.stairs.x -= 5; 
        }

    }  

    touchingBlueLock(cat, obj) {

        if(!this.puzzleCompleted){
            this.setIndicator(this, obj.x, obj.y, this.indicator);
            console.log('blue lock');
        }

        else{ 
            this.pinkKey.alpha = 0;
            this.puzzleDone = this.add.text(game.config.width/4, game.config.height/2 + 100, this.puzzleText);
        }
    }

    touchingMSwitch(cat, obj) {
        // console.log('Touching Broken Switch');
        this.setIndicator(this, this.switchLight.x, this.switchLight.y + 25, this.indicator);

        if (Phaser.Input.Keyboard.JustDown(keyM)){
            if (this.haveKey == true) {
                this.mSwitch = true;
                this.pinkKey.destroy();
                this.roombaWall.destroy();
                Cat.puzzleCompleteB = true;
                this.switchLight.play('light-pink');
                // console.log('Switch On');
            }
            else{
                obj.openTextBox(false);
                // console.log('Switch Off');
            }
        }
    }

    touchingDoor(cat, obj) {
        this.setIndicator(this, obj.x + 20, obj.y + 80, this.indicator);
            if(Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start('kitchen');
            }
    }

    touchingCatTree(cat, obj){
            this.setIndicator(this, obj.x, obj.y, this.indicator);
            if(Phaser.Input.Keyboard.JustDown(keyM)) {
                obj.openTextBox();
            }
        }

    touchingBookcase(cat, obj){
        this.setIndicator(this, obj.x, obj.y, this.indicator);
        if(Phaser.Input.Keyboard.JustDown(keyM)) {
            if(!this.haveKey){
                this.haveKey = true;
                obj.openTextBox(null, this.bookcaseText);
                console.log('Have Key');
            }
            else{
                obj.openTextBox(null, this.bookcaseText2);
            }
        }

    }

    touchingButton(floorSwitchA, obj){
        this.setIndicator(this, obj.x, obj.y, this.indicator);
        if(Phaser.Input.Keyboard.JustDown(keyM)) {
            Cat.stairButton = true;
        }
    }

    touchingSwitch1(floorSwitchA, obj){
        // go right
        if(this.mSwitch == true){
            this.roombaMovement = 0;
            //this.roomba.angle = 0;
        }
    }

    touchingSwitch2(floorSwitchA, obj){
        if(this.mSwitch == true){
            // go left
            this.roombaMovement = 2; 
            //this.roomba.angle = 90;
        }
        else{
            // go down
            this.roombaMovement = 0;
            //this.roomba.angle= 0;
     }
    }
    touchingSwitch3(floorSwitchA, obj){
        // go up
        this.roombaMovement = 3;
        //this.roomba.angle = 280;
    }
    touchingSwitch4(floorSwitchA, obj){
        // go left
        this.roombaMovement = 1;
        //this.roomba.angle = 180;
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