class Bedroom extends Phaser.Scene {
    constructor(){
        super("bedroom");
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
            {frameWidth: 115, frameHeight: 185});
        this.load.image('simplebg', './assets/Simplebg.png');
        this.load.image('fam-portrait', './assets/sprites/Portrait03.png');
        this.load.image('mKey', './assets/sprites/mKey.png');

        // load box pngs
        this.load.image('box', './assets/brownSquare100.png');
        this.load.image('box1', './assets/whiteBox100.png');
        this.load.image('box2', './assets/whiteBox200.png');

        // load collision walls
        this.load.image('wallCollisionHorizontal', './assets/blackHorizontal1100.png');
        this.load.image('wallCollisionVertical', './assets/blackVertical800.png');

        this.load.image('backWall', './assets/bedRoom/bedRoom_backWall.png');
        this.load.image('bottomWall', './assets/bedRoom/bedRoom_bottomWall.png');
        this.load.image('leftWall', './assets/bedRoom/bedRoom_leftWall.png');
        this.load.image('rightWall', './assets/bedRoom/bedRoom_rightWall.png');
        this.load.image('floor', './assets/bedRoom/bedRoom_background.png');
        this.load.spritesheet('door', './assets/door.png',
            { frameWidth: 245, frameHeight: 264 });

        // load furniture
        this.load.image('bed', './assets/bedRoom/bedRoom_bed.png');
        this.load.image('book', './assets/bedRoom/bedRoom_book.png');
        this.load.image('catBed', './assets/bedRoom/bedRoom_catBed.png');
        this.load.image('clothes', './assets/bedRoom/bedRoom_clothes.png');
        this.load.image('mechanism', './assets/bedRoom/bedRoom_mechanism.png');
        this.load.image('mirror', './assets/bedRoom/bedRoom_mirror.png');
        this.load.image('nightStand', './assets/bedRoom/bedRoom_nightStand.png');
        this.load.image('photoStand', './assets/bedRoom/bedRoom_photoStand.png');
        this.load.image('tools', './assets/bedRoom/bedRoom_tools.png');

        // load light puzzle assets
        this.load.spritesheet('lightbulb', './assets/sprites/lightbulb.png',
            {frameWidth: 22, frameHeight: 29});
            // frame0 = white
            // frame1 = blue
            // frame2 = pink
            // frame3 = red
        this.load.image('lightMachine', './assets/sprites/lightMachine.png');
        this.load.image('catButton', './assets/sprites/catButton.png')
        this.load.image('greyCircle', './assets/greyCircle25.png');
        this.load.image('redCircle', './assets/redCircle25.png');
        this.load.image('blueCircle', './assets/blueCircle25.png');
        this.load.image('greenCircle', './assets/greenCircle25.png');
        this.load.image('floorWire', './assets/floorWire.png');
        this.load.image('magGlass', './assets/sprites/magnifyingGlass.png');

    }
    create() {
   
        // collision objects
        this.wallColliderUp = this.physics.add.sprite(game.config.width/2, 300, 'wallCollisionHorizontal');
        this.wallColliderUp.setImmovable(true);
        this.wallColliderUp.body.allowGravity = false; 
        
        this.wallColliderDown = this.physics.add.sprite(game.config.width/2, game.config.height - 35, 'wallCollisionHorizontal');
        this.wallColliderDown.setImmovable(true);
        this.wallColliderDown.body.allowGravity = false; 
        
        this.wallColliderLeft = this.physics.add.sprite(40, game.config.height/2, 'wallCollisionVertical');
        this.wallColliderLeft.setImmovable(true);
        this.wallColliderLeft.body.allowGravity = false; 
        
        this.wallColliderRight = this.physics.add.sprite(game.config.width - 40, game.config.height/2, 'wallCollisionVertical');
        this.wallColliderRight.setImmovable(true);
        this.wallColliderRight.body.allowGravity = false; 
        
        this.bedCollider = this.physics.add.sprite(415, 440, 'box2');
        this.bedCollider.setImmovable(true);
        this.bedCollider.body.allowGravity = false; 
             
        this.bedText = 'Maxine\'s bed: \nNo one is here... I could take a short nap...\n\nzzzZZZ';
        this.bedCollider2 = new ClueItem(this, 290, 520, 'box1', 0, 
        this.bedText, null).setOrigin(.5, .5);
        this.bedCollider2.setImmovable(true);
        this.bedCollider2.body.allowGravity = false; 
        this.bedCollider3 = new ClueItem(this, 480, 520, 'box1', 0, 
        this.bedText, null).setOrigin(.5, .5);
        this.bedCollider3.setImmovable(true);
        this.bedCollider3.body.allowGravity = false; 

        this.doorText = 'The door is locked';
        this.doorBox = new ClueItem(this, game.config.width - 190, game.config.height, 'box2', 0,
            this.doorText, null).setOrigin(.5, .5);

        // background objects
        this.floor = this.add.sprite(0, 0, 'floor').setOrigin(0, 0);
        this.backWall = this.add.sprite(46, 0, 'backWall').setOrigin(0, 0);
        this.bottomWall = this.add.sprite(0, game.config.height - 38, 'bottomWall').setOrigin(0, 0);
        this.leftWall = this.add.sprite(0, 0, 'leftWall').setOrigin(0, 0);
        this.rightWall = this.add.sprite(1054, 0, 'rightWall').setOrigin(0, 0);
        
        // Add box object
        this.mirrorText = 'Mirror: \nOh hi, I didn\'t see you there. Would you like to hear a joke? \n\n\nWhich side of a cat has the most fur?\n\n\n...The outside! Hahaha!';
        this.mirrorBox = new ClueItem(this, 125, 200, 'mirror', 0,
        this.mirrorText, null).setOrigin(.5, .5);
       
        if(!Cat.haveGlass){
        this.familyPhotoText = 'Family photo: \n*sigh* Maxine really likes pink... \n\nWait, what does that note say by the butterflies? \n\nGah, I need to find my trusty magnifying glass!';
        this.photoBox = new ClueItem(this, 250, 300, 'photoStand', 0, 
        this.familyPhotoText, 'fam-portrait').setOrigin(.5, .5);
        }
        else{
        this.familyPhotoText = 'Family photo: \n The note says Maxine went to an inventors contest today!\n\n(Knock Knock)\n\n Maxine is home!\n You\'ve reached the end of our unfinished build.\n Thanks for playing!';
        this.photoBox = new ClueItem(this, 250, 300, 'photoStand', 0, 
        this.familyPhotoText, 'fam-portrait').setOrigin(.5, .5);
        }
        
        this.bedBox = this.physics.add.sprite(415, 400, 'bed');
        this.bedBox.setImmovable(true);
        this.bedBox.body.allowGravity = false; 
        
        this.nightStand = this.physics.add.sprite(580, 305, 'nightStand');
        this.nightStand.setImmovable(true);
        this.nightStand.body.allowGravity = false; 

        this.bookText = 'Book: \nA Notebook full of Maxine\'s invention ideas.';
        this.bookBox = new ClueItem(this, 1000, 500, 'book', 0,
        this.bookText, null).setOrigin(.5, .5);
        this.bookBox.setScale(.8,.8);
       
        this.clothes = this.physics.add.sprite(100, 700, 'clothes');
        this.clothes.setScale(.5,.5);

        this.tools = this.physics.add.sprite(700, 350, 'tools');
        this.tools.setScale(.8,.8);

        this.catBedText = 'My bed:\nzzzZZZ';
        this.catBed = new ClueItem(this, 690, 560, 'catBed', 0,
        this.catBedText, null).setOrigin(.5, .5);
               
        // add light lock machine assets
        this.lightMachine = new ClueItem(this, game.config.width - 215, game.config.height/2 - 90, 'lightMachine', 0,
            'The sign reads: "Maxine\'s Pawsome Light Lock Machine!"', null).setOrigin(.5,.5);
            // this.lightMachine.body.setOffset(this.width, this.height/2)
             this.lightMachine.body.setSize(this.width, 100, false);
        this.lightMachine.setScale(1.1,1.1);

        this.lightButtonA = new Box(this, game.config.width - 325, game.config.height/3 + 123, 'catButton').setOrigin(.5, .5);
            this.lightButtonA.setScale(1.1,1.1);
        this.lightButtonB = new Box(this, game.config.width - 233, game.config.height/3 + 123, 'catButton').setOrigin(.5, .5);
            this.lightButtonB.setScale(1.1,1.1);
        this.lightButtonC = new Box(this, game.config.width - 149, game.config.height/3 + 123 , 'catButton').setOrigin(.5, .5);
            this.lightButtonC.setScale(1.1,1.1);        

        // add lights
        this.anims.create({
            key: 'light-white',
            frames: this.anims.generateFrameNumbers('lightbulb', {frames: [0]}),
            repeat: -1
        });
        this.anims.create({
            key: 'light-blue',
            frames: this.anims.generateFrameNumbers('lightbulb', {frames: [1]}),
            repeat: -1
        });
        this.anims.create({
            key: 'light-pink',
            frames: this.anims.generateFrameNumbers('lightbulb', {frames: [2]}),
            repeat: -1
        });
        this.anims.create({
            key: 'light-red',
            frames: this.anims.generateFrameNumbers('lightbulb', {frames: [3]}),
            repeat: -1
        });

        if(Cat.puzzleComplete){
            this.lightA = this.add.sprite(game.config.width - 318, game.config.height/3 - 20, 'lightbulb');
            this.lightA.play('light-pink');
            this.countA = 3;

            this.lightB = this.add.sprite(game.config.width - 233, game.config.height/3 - 19, 'lightbulb');
            this.lightB.play('light-pink');
            this.countB = 3;

            this.lightC = this.add.sprite(game.config.width - 150, game.config.height/3 - 20, 'lightbulb');
            this.lightC.play('light-pink');
            this.countC = 3;
        }
        else{
        this.lightA = this.add.sprite(game.config.width - 318, game.config.height/3 - 20, 'lightbulb');
            this.lightA.play('light-blue');
            this.countA = 2;
        // this.lightA.setTintFill(0xef3331);
        this.lightB = this.add.sprite(game.config.width - 233, game.config.height/3 - 19, 'lightbulb');
            this.lightB.play('light-red');
            this.countB = 0;
        this.lightC = this.add.sprite(game.config.width - 150, game.config.height/3 - 20, 'lightbulb');
            this.lightC.play('light-red');
            this.countC = 0;
        }

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
        
        this.playerCat = new Cat(this, 550, game.config.height/2 + 110, 'cat').setOrigin(.5, 0);

        this.mGlass = this.physics.add.sprite(-500, 400, 'magGlass').setOrigin(.5,.5).setScale(.7,.7);

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
        this.anims.create({
            key: 'cat-right',
            frames: this.anims.generateFrameNumbers('cat', {frames: [2]}),
            repeat: -1
        });
        this.anims.create({
            key: 'cat-left',
            frames: this.anims.generateFrameNumbers('cat', {frames: [3]}),
            repeat: -1
        });
        this.playerCat.play('cat-down');

        // Create door open/close animation
        this.kitchenDoor = this.physics.add.sprite(game.config.width - 165, 880, 'door');
        this.kitchenDoor.setImmovable(true);
        this.kitchenDoor.body.allowGravity = false;

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
        this.kitchenDoor.play('doorClosed');

        // Create textbox animation
        this.anims.create({
            key: 'textbox',
            frames: this.anims.generateFrameNumbers('textbox', {frames: [0,1]}),
            frameRate: 4,
            repeat:-1
        });
        
        // add text
        this.puzzleText = 'The door is unlocked!';

        if(!Cat.puzzleComplete){
        this.introText = 'I wonder where my owner went?\n\n\nInteract with objects to make it to the next room and find out what happened to your owner.';
        this.introTextBox = new TextBox(this, 1, game.config.height - 1, 'cat', 0, this.introText);
        this.introTextBox.startText(true);
        }
        this.controls = 'Interact-Meow: M  /  Move: WASD  /  Reset: R ';
        this.controlUI = this.add.text(game.config.width/2, 50, this.controls).setOrigin(.5,.5);

       // this.myTestClueBox = new TextBox(this, 1, game.config.height - 1, 'cat', 0, this.clue);

       // Cat box overlap
       this.physics.add.overlap(this.playerCat, this.photoBox, this.touchingPicture, null, this);
       this.physics.add.overlap(this.playerCat, this.mirrorBox, this.touchingMirror, null, this);
       this.physics.add.overlap(this.playerCat, this.lightButtonA, this.touchingButtonA, null, this);
       this.physics.add.overlap(this.playerCat, this.lightButtonB, this.touchingButtonB, null, this);
       this.physics.add.overlap(this.playerCat, this.lightButtonC, this.touchingButtonC, null, this);
       this.physics.add.overlap(this.playerCat, this.lightMachine, this.touchingLightMachine, null, this);
       this.physics.add.overlap(this.playerCat, this.doorBox, this.touchingDoorBox, null, this);
       this.physics.add.overlap(this.playerCat, this.bedCollider2, this.touchingBed, null, this);
       this.physics.add.overlap(this.playerCat, this.bedCollider3, this.touchingBed, null, this);
       this.physics.add.overlap(this.playerCat, this.bookBox, this.touchingBook, null, this);
       this.physics.add.overlap(this.playerCat, this.catBed, this.touchingCatBed, null, this);


        // Add colliders for collision sprites
        this.physics.add.collider(this.playerCat, this.wallColliderUp);
        this.physics.add.collider(this.playerCat, this.wallColliderDown);
        this.physics.add.collider(this.playerCat, this.wallColliderLeft);
        this.physics.add.collider(this.playerCat, this.wallColliderRight);
        this.physics.add.collider(this.playerCat, this.bedCollider);
      
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
        //this.myTestTextBox.update();
        this.photoBox.update();
        // check key input for restart
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            //this.scene.restart();
            this.scene.start("menuScene");
        }

        if (Phaser.Input.Keyboard.JustDown(key1)) {
            this.scene.start("bedroom");
        }
        if (Phaser.Input.Keyboard.JustDown(key2)) {
            this.scene.start("livingroom");
        }
        if (Phaser.Input.Keyboard.JustDown(key3)) {
            this.scene.start("kitchen");
        }

        if(this.countA == 3 && this.countB == 3 && this.countC == 3 && !Cat.puzzleComplete){
            this.puzzleDone = this.add.text(game.config.width - 300, game.config.height - 50, this.puzzleText);
            Cat.puzzleComplete = true;

            this.kitchenDoor.play('doorOpen');
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

    }  
    touchingPicture(cat, obj){
        this.setIndicator(this, obj.x, obj.y, this.indicator);
        if(Phaser.Input.Keyboard.JustDown(keyM)) {
            //this.myTestClueBox = new TextBox(this, 1, game.config.height - 1, 'cat', 0, this.familyPhotoText);
         
            obj.openTextBox(true);
  
        }
    }

    touchingMirror(cat, obj){
        this.setIndicator(this, obj.x, obj.y + 100, this.indicator);
        if(Phaser.Input.Keyboard.JustDown(keyM)) {
            //this.myTestClueBox = new TextBox(this, 1, game.config.height - 1, 'cat', 0, this.mirrorText);
            obj.openTextBox(false);
        }
    }

    touchingBook(cat, obj){
        this.setIndicator(this, obj.x, obj.y + 10, this.indicator);
        if(Phaser.Input.Keyboard.JustDown(keyM)) {
            obj.openTextBox(false);
        }
    }
    
    touchingButtonA(cat, obj){
        this.setIndicator(this, obj.x, obj.y, this.indicator);
        if(Phaser.Input.Keyboard.JustDown(keyM)) {
            
            if(this.countA == 0){
                this.lightA.play('light-white');
                this.countA = 1;
            }
            else if(this.countA == 1){
                this.lightA.play('light-blue');
                this.countA = 2;
            }
            else if(this.countA == 2){
                this.lightA.play('light-pink');
                this.countA = 3;
            }
            else if(this.countA == 3){
                this.lightA.play('light-red');
                this.countA = 0;
            }
        }
    }
    
    touchingButtonB(cat, obj){
        this.setIndicator(this, obj.x, obj.y, this.indicator);
        if(Phaser.Input.Keyboard.JustDown(keyM)) {
            
            if(this.countB == 0){
                this.lightB.play('light-white');
                this.countB = 1;
            }
            else if(this.countB == 1){
                this.lightB.play('light-blue');
                this.countB = 2;
                
            }
            else if(this.countB == 2){
                this.lightB.play('light-pink');
                this.countB = 3;
            }
            else if(this.countB == 3){
                this.lightB.play('light-red');
                this.countB = 0;
            }
            
        }
    }

    touchingButtonC(cat, obj){
        this.setIndicator(this, obj.x, obj.y, this.indicator);
        if(Phaser.Input.Keyboard.JustDown(keyM)) {
            
            if(this.countC == 0){
                this.lightC.play('light-white');
                this.countC = 1;
            }
            else if(this.countC == 1){
                this.lightC.play('light-blue');
                this.countC = 2;
                
            }
            else if(this.countC == 2){
                this.lightC.play('light-pink');
                this.countC = 3;
            }
            else if(this.countC == 3){
                this.lightC.play('light-red');
                this.countC = 0;
            }
        }
    }

    touchingLightMachine(cat, obj){
        this.setIndicator(this, obj.x + 105, obj.y-35, this.indicator);
        if(Phaser.Input.Keyboard.JustDown(keyM)) {
            obj.openTextBox(false);
        }
    }

    touchingBed(cat, obj){
        this.setIndicator(this, this.bedBox.x, obj.y + 35, this.indicator);
        if(Phaser.Input.Keyboard.JustDown(keyM)) {
            obj.openTextBox(false);
        }
    }

    touchingCatBed(cat, obj){
        this.setIndicator(this, obj.x, obj.y - 10, this.indicator);
        if(Phaser.Input.Keyboard.JustDown(keyM)) {
            obj.openTextBox(false);
        }
    }

    touchingDoorBox(cat, obj){
        this.setIndicator(this, obj.x, obj.y, this.indicator);
        if(Phaser.Input.Keyboard.JustDown(keyM)) {
            if(Cat.puzzleComplete){
                this.scene.start('livingroom');
            }
            else{
                obj.openTextBox(false);
                //this.myTestClueBox = new TextBox(this, 1, game.config.height - 1, 'cat', 0, this.doorText);
            }
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