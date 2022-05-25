class Roomba extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this); // add object to existing scene, displayList, updateList
        scene.physics.add.existing(this);
        this.body.allowGravity = false; 
        this.setScale(.5,.5);
        this.body.setSize(this.width/2,this.height/4, true);
    }
    update() {
    }
}