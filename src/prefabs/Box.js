// Box prefab
class Box extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add object to existing scene, displayList, updateList
        scene.physics.add.existing(this);
        this.VELOCITY = 4000;
        this.DRAG = 2000;
    }

    update() {
     
    }
}