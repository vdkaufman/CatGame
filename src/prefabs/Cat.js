// Cat prefab
class Cat extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add object to existing scene, displayList, updateList
        scene.physics.add.existing(this);
        //this.isGrounded = true; // Check if Cat and Floor are touching
        this.VELOCITY = 500;
        this.DRAG = 800;
    

    }

    update() {
        // left/right movement
        //if(this.isGrounded) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                if(this.x >= borderUISize + this.width){    
                this.body.setVelocityX(-this.VELOCITY);
                }
            }
            else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.body.setVelocityX(this.VELOCITY);
            } 
            else if (keyUP.isDown && this.y >= borderUISize - this.height) {
                this.body.setVelocityY(-this.VELOCITY);
            } 
            else if (keyDOWN.isDown && this.y <= game.config.height - borderUISize - this.height) {
                this.body.setVelocityY(this.VELOCITY);
            }
            else if (!keyLEFT.isDown && !keyRIGHT.isDown && !keyUP.isDown &&!keyDOWN.isDown) {
                this.body.setVelocityX(0);
                this.body.setVelocityY(0);
            }
    }
}