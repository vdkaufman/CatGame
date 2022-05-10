class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }
    preload(){
    }
    create() {
        // pass to the next scene
        this.scene.start('playScene');
    }

    update(){
    }
}