const GetValue = Phaser.Utils.Objects.GetValue;
class TextBox extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, text, popUp) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add object to existing scene, displayList, updateList
        // the textbox definition
        this.text = text;
        this.popUp = popUp;
        this.wrapWidth =  game.config.width-120;
        this.fixedWidth = game.config.width-145;
        this.fixedHeight = game.config.height/6;
        this.textSpd = 30; // text speed in milliseconds
    
        this.setScale(.001,.001);

        //create the rexUI text box object
        this.textBox = this.scene.rexUI.add.textBox({
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
                fontFamily: 'SingleDay',
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
                top: 20,
                bottom: 20,
                icon: 10,
                text: 10,
            }
        }).setOrigin(0,1).layout(); 

        // make it interactive
        this.createInteractiveTextBox(this.scene, this.popUp);//.start(this.text, 30);
        this.textBox.setActive(false).setVisible(false);
        this.textBox.setDepth(1001);
        //this.textBox.start(this.text, 30);
        this.delayClock;
    }

    /*preload(){
                // load textbox
                this.load.spritesheet('textbox', './assets/sprites/textbox.png', 
                {frameWidth: 1100, frameHeight: 180});
    }*/

    update(){
        // Play Textbox background animation
        //this.textboxBG = this.add.sprite(550, 710, 'textbox');
        //this.textboxBG.play('textbox');

        // reset text box when the correct conditions are met
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
        }
    }

    createInteractiveTextBox(scene, popUp){
        this.delayClock;
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
            } else if(this.active){
                //deactivate the textbox
                //this.setVisible(false);
                this.delayClock = scene.time.addEvent({delay: 40, callback: () =>{
                    console.log('textbox delayClock finished...');
                    this.setActive(false).setVisible(false);
                    if (popUp){
                        popUp.setActive(false).setVisible(false);
                    }
                    //this.delayClock.remove();
                    scene.time.removeEvent(this.delayClock);

                }, callbackScope: scene, repeat: 0});
    
            }
        }, this.textBox)

        return this.textBox;
    }

    startText(start){
        if (start){
            this.textBox.setActive(true).setVisible(true);
            this.textBox.start(this.text, 30);
            
        }
        else{
            this.textBox.setActive(false).setVisible(false);
            this.textBox.stop();
        }
    }

    getActive(){
        //console.log('in textBox: textBox active state is: ', this.textBox.active);
        return this.textBox.active;
    }

    resetTextBox(){
        //console.log('isGoing:', this.isGoing);
        if (!this.textBox.active){
            console.log('reset textBox..');
            this.textBox.setActive(true).setVisible(true);
            this.textBox.start(this.text, 30);
            if (this.popUp){
                this.popUp.setActive(true).setVisible(true);
            } 
        }
    }
    
// handleVisibility(show){
//         if (show){

//         }
//     }
}