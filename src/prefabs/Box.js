// Box prefab
class Box extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this); // add object to existing scene, displayList, updateList
        scene.physics.add.existing(this);
        this.VELOCITY = 4000;
        this.DRAG = 2000;

        this.setDrag(this.DRAG,this.DRAG)
    }
    update() {
     
    }
}