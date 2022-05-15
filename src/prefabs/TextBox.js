const GetValue = Phaser.Utils.Objects.GetValue;
class TextBox extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, text) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add object to existing scene, displayList, updateList
        // the textbox definition
        this.text = text;
        this.wrapWidth =  game.config.width-120;
        this.fixedWidth = game.config.width-145;
        this.fixedHeight = game.config.height/6;

        //create the rexUI text box object
        this.myTextBox = this.scene.rexUI.add.textBox({
            x:5, 
            y:game.config.height - 3,
        
            background: this.scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
            .setStrokeStyle(6, COLOR_LIGHT),

            icon: this.scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),

        // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
            text: this.scene.rexUI.add.BBCodeText(0, 0, '', {
                fixedWidth: this.fixedWidth,
                fixedHeight: this.fixedHeight,
    
                fontSize: '22px',
                wrap: {
                    mode: 'word',
                    width: this.wrapWidth
                },
                maxLines: 3
            }),

            action: this.scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),

            space: {
                left: 20,
                right: 20,
                top: 40,
                bottom: 40,
                icon: 10,
                text: 10,
            }
        }).setOrigin(0,1).layout(); 

        // make it interactive
        this.createInteractiveTextBox(this.scene, this.myTextBox).start(this.text, 30);
        
    }

    update(){
        // reset text box when the correct conditions are met
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            if (!this.myTextBox.active){
                console.log('reset textBox..');
                this.myTextBox.setActive(true).setVisible(true);
                this.myTextBox.start(this.text, 30);
            }
        }
    }

    createInteractiveTextBox(scene, textBox){
       
        // Start of pointer input mechanisms 
        scene.input.keyboard.on('keydown-M', function () {
            var icon = this.getElement('action').setVisible(false);
            this.resetChildVisibleState(icon);
            if (this.isTyping) {
                this.stop(true);
            } else if (!this.isLastPage){
                this.typeNextPage();
                // if (this.isLastPage)
                //     this.setActive(false).setVisible(false);
            } else {
                //deactivate the textbox
                this.setActive(false).setVisible(false);
                
            }
        }, textBox).on('pageend', function () {
            if (this.isLastPage) {
                //return;
            }
            
            // turned arrow icon (the clickable 'next' button)
            var icon = this.getElement('action').setVisible(true);
            this.resetChildVisibleState(icon);
            icon.y = textBox.y - 60;
            var tween = scene.tweens.add({
                targets: icon,
                y: '+=30', // '+=100'
                ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 500,
                repeat: 0, // -1: infinity
                yoyo: false
            });
        }, textBox)
        //.on('type', function () {
        //})

        return textBox;
    }
    
// handleVisibility(show){
//         if (show){

//         }
//     }
}