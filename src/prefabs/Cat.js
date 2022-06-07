// Cat prefab
class Cat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this); // add object to existing scene, displayList, updateList
        scene.physics.add.existing(this);
        //this.isGrounded = true; // Check if Cat and Floor are touching

        this.VELOCITY = 330;
        this.DRAG = 5000;
        this.setDrag(this.DRAG,this.DRAG);
        this.setScale(.7,.7)
        this.body.setOffset(0, this.height/2)
        this.body.setSize(this.width, this.height/2, false);
        this.dir = 1;
        this.haveGlass = false;
        this.puzzleComplete = false;
        this.puzzleCompleteB = false;
        this.stairButton = false;
        this.bScene = true;
        this.kScene = false;
        this.lScene = false;
        this.musicOn = false;
     
        // define sounds
        this.meow = scene.sound.add('meow', {
            mute: false,
            volume: .3,
            rate: 1, 
            loop: false,
            delay: 0
        });
        this.meow1 = scene.sound.add('meow1', {
            mute: false,
            volume: .3,
            rate: 1,
            loop: false,
            delay: 0
        });
        this.meow2 = scene.sound.add('meow2', {
            mute: false,
            volume: .3,
            rate: 1,
            loop: false,
            delay: 0
        });
        this.meow3 = scene.sound.add('meow3', {
            mute: false,
            volume: .3,
            rate: 1,
            loop: false,
            delay: 0
        });
    

        this.randVal = 0;
        //this.meowSounds = [];
        //Phaser.Utils.Array.Add(this.meowSounds,this.meow);
        // this.meowSounds.push(this.meow);
        // this.meowSounds.push(this.meow1);
        // this.meowSounds.push(this.meow2);
        // this.meowSounds.push(this.meow3);



    }

    update() {
        // left/right movement
        //if(this.isGrounded) {
            if(keyLEFT.isDown){ 
                this.play('cat-walk-left', true);
                this.dir = 3;
                this.body.setVelocityX(-this.VELOCITY);
                //this.setScale(.7,.7);
            }
            else if (keyRIGHT.isDown) {
                this.play('cat-walk-right', true);
                this.dir = 2;
                this.body.setVelocityX(this.VELOCITY);
                //this.setScale(-.7,.7);
            } 
            else if (keyUP.isDown) {
                this.play('cat-walk-up', true);
                this.dir = 0;
                this.body.setVelocityY(-this.VELOCITY);
            } 
            else if (keyDOWN.isDown) {
                this.play('cat-walk-down', true);
                this.dir = 1;
                this.body.setVelocityY(this.VELOCITY);
            }
            // play idle animations if player isn't moving
            else{
                if (this.anims.currentAnim.key === 'cat-walk-left'){
                    this.play('cat-left');
                }
                else if (this.anims.currentAnim.key === 'cat-walk-right'){
                    this.play('cat-right');
                }
                else if (this.anims.currentAnim.key === 'cat-walk-up'){
                    this.play('cat-up');
                }
                else if (this.anims.currentAnim.key === 'cat-walk-down'){
                    this.play('cat-down');
                }
            }

            // play meow sfx
            if (Phaser.Input.Keyboard.JustDown(keyM)) {
      
                this.randVal = Phaser.Math.Between(0, 2);
                // group.getChildren() returns an array
                //this.meowSounds[0].play();
                //console.log(this.meowSounds[0]);
                // if (this.randVal == 0){
                //     this.meow.play();
                // }
                if (this.randVal == 0){
                    this.meow1.play();
                }
                else if (this.randVal == 1){
                    this.meow2.play();
                }
                else if (this.randVal == 2){
                    this.meow3.play();
                }
            }       
       
            //this.body.setDrag(this.DRAG, this.DRAG);

    }
}