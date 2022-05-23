class ClueItem extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, text, popUpImage) {
        super(scene, x, y, texture, frame,);
        scene.add.existing(this); // add object to existing scene, displayList, updateList
        scene.physics.add.existing(this);
        this.scene = scene;
        
        // object to control the pop-up image attached to the clue
        this.popUp = scene.add.sprite(game.config.width/2, game.config.height/3, popUpImage);
        this.popUp.setActive(false).setVisible(false);
        this.popUp.setScale(.2,.2);
        this.popUp.setDepth(1000);

        // text box object
        this.text = text;
        this.myTextBox = new TextBox(scene, x, y, texture, frame, text, this.popUp);
        this.myTextBox.setActive(false).setVisible(false);

    }

    update(){
        // reset text box when the correct conditions are met
        //this.myTextBox.update();
        // if (this.popUp.active && !this.myTextBox.getActive()){
        //     this.popUp.setActive(false).setVisible(false);
        // }
        
    }

    openTextBox(){
        this.myTextBox.resetTextBox();
    }
   
}