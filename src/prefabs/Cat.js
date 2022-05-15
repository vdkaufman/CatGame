// Cat prefab
class Cat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this); // add object to existing scene, displayList, updateList
        scene.physics.add.existing(this);
        //this.isGrounded = true; // Check if Cat and Floor are touching

        this.VELOCITY = 300;
        this.DRAG = 5000;
        this.setDrag(this.DRAG,this.DRAG)
            
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
                this.body.setVelocityX(-this.VELOCITY);
            }
            else if (keyRIGHT.isDown) {
                this.body.setVelocityX(this.VELOCITY);
            } 
            else if (keyUP.isDown) {
                this.body.setVelocityY(-this.VELOCITY);
            } 
            else if (keyDOWN.isDown) {
                this.body.setVelocityY(this.VELOCITY);
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