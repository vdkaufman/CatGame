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
        this.load.image('greyCircle', './assets/greyCircle25.png');
        this.load.image('key', './assets/blueKey.png');

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

        this.doorText = 'The door is locked';
        this.doorBoxA = new ClueItem(this, game.config.width -25, game.config.height/2 + 170, 'boxWhite', 0,
            this.doorText, null).setOrigin(.5, .5);
        
        this.doorBoxB = new ClueItem(this, game.config.width -25, game.config.height/2 + 80, 'boxWhite', 0,
            this.doorText, null).setOrigin(.5, .5);


        this.floorSwitchA = this.physics.add.sprite(game.config.width - 300, game.config.height/2 + 200, 'boxWhite');

        
        this.roomba = new Lights(this, game.config.width - 300, game.config.height/3 + 50, 'blueCircle');

        this.puzzleComplete = false;
        this.haveKey = false;
        this.roombaMovement = 0;

        // add interact button indicator
        this.indicator = this.add.sprite(0, 0, 'mKey').setOrigin(.5,.5);
        this.indicator.setScale(.2,.2);
        this.indicator.setDepth(500);
        this.indicator.setAlpha(.85);
        this.indicator.setVisible(false);

       
        // define keys
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.blueKey = new Grab(this, game.config.width/2 + 200, game.config.height/2 + 100, 'key').setOrigin(.5, 0);


        this.playerCat = new Cat(this, 150, game.config.height/2 + 100, 'cat').setOrigin(.5, 0);

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

        this.puzzleText = 'Hooray! You completed the puzzle! Press R to Reset';

        this.controls = 'Interact-Meow: M  /  Move: WASD  /  Start Text: Space  /  Reset: R ';
        this.controlUI = this.add.text(game.config.width/4, 50, this.controls);

        // Cat box overlap
       this.physics.add.overlap(this.playerCat, this.doorBoxA, this.touchingDoorBox, null, this);
       this.physics.add.overlap(this.playerCat, this.doorBoxB, this.touchingDoorBox, null, this);
       this.physics.add.overlap(this.playerCat, this.blueKey, this.touchingKey, null, this);
       this.physics.add.overlap(this.roomba, this.floorSwitchA, this.touchingSwitch, null, this);
       this.physics.add.overlap(this.blueKey, this.doorBoxA, this.puzzleCompleted, null, this);
       this.physics.add.overlap(this.blueKey, this.doorBoxA, this.puzzleCompleted, null, this);


        // Add colliders for collision sprites
        this.physics.add.collider(this.playerCat, this.wallColliderUp);
        this.physics.add.collider(this.playerCat, this.wallColliderDown);
        this.physics.add.collider(this.playerCat, this.wallColliderLeft);
        this.physics.add.collider(this.playerCat, this.wallColliderRight);

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

    if (this.haveKey == true) {
        if (this.playerCat.dir == 1) {
            this.blueKey.x = this.playerCat.x + 30;
            this.blueKey.y = this.playerCat.y + 90;
        }
        if (this.playerCat.dir == 0) {
            this.blueKey.x = this.playerCat.x - 30;
            this.blueKey.y = this.playerCat.y + 88;
        }
    }
    else {
        if(this.puzzleComplete){
   
         }
    }

    this.playerCat.update();

    if(this.roombaMovement == 0){
        this.roomba.y += 1;
    }
    if(this.roombaMovement == 1){
        this.roomba.x -= 1;
    }
    if(this.roombaMovement == 2){
        this.roomba.y -= 1;
    }
    if(this.roombaMovement == 3){
        this.roomba.x += 1;
    }

}  

touchingDoorBox(cat, obj){
    this.setIndicator(this, obj.x, obj.y, this.indicator);
    if(Phaser.Input.Keyboard.JustDown(keyM)) {
        if(this.puzzleComplete){
            this.scene.start('menuScene');
        }
        else{
        obj.openTextBox();
        //this.myTestClueBox = new TextBox(this, 1, game.config.height - 1, 'cat', 0, this.doorText);
        }
    }
}
touchingKey(cat, obj){
    if(!this.haveKey){
    this.setIndicator(this, obj.x, obj.y, this.indicator);
    }
    if(Phaser.Input.Keyboard.JustDown(keyM)) {
        this.haveKey = true;
    }
}
touchingSwitch(floorSwitchA, obj){
  
    if(this.floorSwitchA){
        this.roombaMovement = 1;
    }
  
}
puzzleCompleted(cat, obj){
    this.puzzleComplete = true;
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