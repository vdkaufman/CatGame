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
        // load box pngs
        this.load.image('box', './assets/brownSquare100.png');
        this.load.image('boxWhite', './assets/whiteBox100.png');

        // load collision walls
        this.load.image('wallCollisionHorizontal', './assets/blackHorizontal1100.png');
        this.load.image('wallCollisionVertical', './assets/blackVertical800.png');
        this.load.image('greyCircle', './assets/greyCircle25.png');
        this.load.image('redCircle', './assets/redCircle25.png');
        this.load.image('blueCircle', './assets/blueCircle25.png');
        this.load.image('greenCircle', './assets/greenCircle25.png');
        this.load.image('floorWire', './assets/floorWire.png');


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

        // simple background for playable prototype
        this.background = this.add.tileSprite(0, 0, 1100, 800, 'simplebg').setOrigin(0, 0);

        this.floorWire = this.add.sprite(0, 0, 'floorWire').setOrigin(0, 0);

        // Add box object
        this.photoBox = new Box(this, game.config.width/2, game.config.height/2 - 50, 'box').setOrigin(.5, .5);
        this.mirrorBox = new Box(this, game.config.width/5 - 200, game.config.height/1.5, 'boxWhite').setOrigin(.5, .5);
        this.lightBoxA = new Box(this, game.config.width - 300, game.config.height/3 + 50, 'box').setOrigin(.5, .5);
        this.lightBoxB = new Box(this, game.config.width - 200, game.config.height/3 + 50, 'box').setOrigin(.5, .5);
        this.lightBoxC = new Box(this, game.config.width - 100, game.config.height/3 + 50, 'box').setOrigin(.5, .5);
        this.doorBoxA = new Box(this, game.config.width -25, game.config.height/2 + 170, 'boxWhite').setOrigin(.5, .5);
        this.doorBoxB = new Box(this, game.config.width -25, game.config.height/2 + 80, 'boxWhite').setOrigin(.5, .5);

        this.add.rectangle(game.config.width/2 - 10, game.config.height/2 - 60, 20, 10, 0x00000).setOrigin(0, 0);

        // add lights
        this.lightA = new Lights(this, game.config.width - 300, game.config.height/3 + 50, 'greyCircle');
        this.lightB = new Lights(this, game.config.width - 200, game.config.height/3 + 50, 'greyCircle');
        this.lightC = new Lights(this, game.config.width - 100, game.config.height/3 + 50, 'greyCircle');

        // add light counter
        this.countA = 0;
        this.countB = 0;
        this.countC = 0;

        this.puzzleComplete = false;



        // define keys
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.playerCat = new Cat(this, 150, game.config.height/2 + 100, 'cat').setOrigin(0, 0);

        // add text
        this.text = 'I wonder where my owner went?                                            - interact with the different objects to make it to the next room - ';
        this.myTestTextBox = new TextBox(this, 1, game.config.height - 1, 'cat', 0, this.text);
        
        this.controls = 'Interact-Meow: M  /  Move: WASD  /  Start Text: Space  /  Reset: R ';
        this.controlUI = this.add.text(game.config.width/4, 50, this.controls);

        this.clueText = 'clue test';
        this.familyPhotoText = '- family photo - The humans really like blue...';
        this.mirrorText = 'Mirror: pretty cat';
        this.puzzleText = 'Hooray! You completed the puzzle! Press R to Reset';
        this.doorText = 'The door is locked';
       // this.myTestClueBox = new TextBox(this, 1, game.config.height - 1, 'cat', 0, this.clue);

       // Cat box overlap
       this.physics.add.overlap(this.playerCat, this.photoBox, this.touchingBox, null, this);
       this.physics.add.overlap(this.playerCat, this.mirrorBox, this.touchingMirror, null, this);
       this.physics.add.overlap(this.playerCat, this.lightA, this.touchingLightsA, null, this);
       this.physics.add.overlap(this.playerCat, this.lightB, this.touchingLightsB, null, this);
       this.physics.add.overlap(this.playerCat, this.lightC, this.touchingLightsC, null, this);
       this.physics.add.overlap(this.playerCat, this.doorBoxA, this.touchingDoorBox, null, this);
       this.physics.add.overlap(this.playerCat, this.doorBoxB, this.touchingDoorBox, null, this);



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

        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            // this.clue = 'clue test';
            //this.myTestClueBox = new TextBox(this, 1, game.config.height - 1, 'cat', 0, this.clue);
        }

        // moved to cat.js
        // // play meow sfx
        // if (Phaser.Input.Keyboard.JustDown(keyM)) {
        //     this.meow.play();
        // }

        if(this.countA == 1 && this.countB == 2 && this.countC == 3 && !this.puzzleComplete){
            this.puzzleDone = this.add.text(game.config.width/4, game.config.height/2 + 100, this.puzzleText);
            this.puzzleComplete = true;
            this.doorBoxA.destroy();
            this.doorBoxB.destroy();
        }


        this.playerCat.update();
    }  
    touchingBox(){
        if(Phaser.Input.Keyboard.JustDown(keyM)) {
        this.myTestClueBox = new TextBox(this, 1, game.config.height - 1, 'cat', 0, this.familyPhotoText);
    }
    }

    touchingMirror(){
        if(Phaser.Input.Keyboard.JustDown(keyM)) {
        this.myTestClueBox = new TextBox(this, 1, game.config.height - 1, 'cat', 0, this.mirrorText);
    }
    }

    touchingLightsA(){
        if(Phaser.Input.Keyboard.JustDown(keyM)) {

            if(this.countA == 0){
                this.lightA = new Lights(this, game.config.width - 300, game.config.height/3 + 50, 'blueCircle');
                this.countA = 1;
            }
            else if(this.countA == 1){
                this.lightA = new Lights(this, game.config.width - 300, game.config.height/3 + 50, 'redCircle');
                this.countA = 2;

            }
            else if(this.countA == 2){
                    this.lightA = new Lights(this, game.config.width - 300, game.config.height/3 + 50, 'greenCircle');
                    this.countA = 3;
            }
            else if(this.countA == 3){
                this.lightA = new Lights(this, game.config.width - 300, game.config.height/3 + 50, 'greyCircle');
                this.countA = 0;
            }
        }
    }

    touchingLightsB(){
        if(Phaser.Input.Keyboard.JustDown(keyM)) {
            
            if(this.countB == 0){
                this.lightB = new Lights(this, game.config.width - 200, game.config.height/3 + 50, 'greenCircle');
                this.countB = 1;
            }
            else if(this.countB == 1){
                this.lightB = new Lights(this, game.config.width - 200, game.config.height/3 + 50, 'blueCircle');
                this.countB = 2;

            }
            else if(this.countB == 2){
                    this.lightB = new Lights(this, game.config.width - 200, game.config.height/3 + 50, 'redCircle');
                    this.countB = 3;
            }
            else if(this.countB == 3){
                this.lightB = new Lights(this, game.config.width - 200, game.config.height/3 + 50, 'greyCircle');
                this.countB = 0;
            }

        }
    }
    touchingLightsC(){
        if(Phaser.Input.Keyboard.JustDown(keyM)) {

            if(this.countC == 0){
                this.lightC = new Lights(this, game.config.width - 100, game.config.height/3 + 50, 'redCircle');
                this.countC = 1;
            }
            else if(this.countC == 1){
                this.lightC = new Lights(this, game.config.width - 100, game.config.height/3 + 50, 'greenCircle');
                this.countC = 2;
            }
            else if(this.countC == 2){
                    this.lightC = new Lights(this, game.config.width - 100, game.config.height/3 + 50, 'blueCircle');
                    this.countC = 3;
            }
            else if(this.countC == 3){
                this.lightC = new Lights(this, game.config.width - 100, game.config.height/3 + 50, 'greyCircle');
                this.countC = 0;
            }
        }
    }
    touchingDoorBox(){
        if(Phaser.Input.Keyboard.JustDown(keyM)) {
            this.myTestClueBox = new TextBox(this, 1, game.config.height - 1, 'cat', 0, this.doorText);
        }
    }
}