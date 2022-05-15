// Cat prefab
class Cat extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add object to existing scene, displayList, updateList
        scene.physics.add.existing(this);
        //this.isGrounded = true; // Check if Cat and Floor are touching
        this.VELOCITY = 500;
        this.DRAG = 5000;
            
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
        
            this.body.setDragX(this.DRAG);
            this.body.setDragY(this.DRAG);

    }
}