// Cat prefab
class Cat extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      scene.add.existing(this); // add object to existing scene, displayList, updateList
      //this.isGrounded = true; // Check if Cat and Floor are touching
    }

    update() {
        // left/right movement
        //if(this.isGrounded) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            } else if (keyUP.isDown) {
                this.y += this.moveSpeed;
            } else if (keyDOWN.isDown) {
                this.y -= this.moveSpeed;
            }
        //}
    }

  }