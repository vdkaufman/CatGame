class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
        this.load.image('nextPage', 
            'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
        this.load.image('cat', './assets/cat.png');
        this.load.image('simplebg', './assets/Simplebg.png');
    }
    create() {
        // white UI background
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        // simple background for playable prototype
        this.background = this.add.tileSprite(0, 0, 1100, 800, 'simplebg').setOrigin(0, 0);
  
        // define keys
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.playerCat = new Cat(this, game.config.width/2, game.config.height/2, 'cat').setOrigin(0, 0);

        //this.defineTextBox();
        this.content = 'test text... asfkljhasflkjhafajklfh kljahsdfkjh jkhsdfkjh jkhsdf sdf sdf kjsdf khjsdf kjhhufndfxkcv iuse kjshef xvkejfs kjshdf kjsdfn kaejh xzdvj jhzdfkmnzsef uixdf zjxkn kjdk sdg jklzxchv jzsnezsd kjzhxv kmzxnfskjfzxjklhv lxzkjhdf jzser';
        createTextBox(this, 1, game.config.height - 1, {
            wrapWidth: game.config.width-120,
            fixedWidth: game.config.width-138,
            fixedHeight: game.config.height/6,
        }).start(this.content, 30);

        //this.textTest = new TextBox(this, 1, game.config.height - 1, 'cat', 0, 'this is the test text...');
        //this.textTest.create();
        // define meow sfx
        this.meow = this.sound.add('meow', {
            mute: false,
            volume: .3,
            rate: 1,
            loop: false,
            delay: 0
        });

    }

    update(){
        // check key input for restart
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        // check key input for menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start("menuScene");
        }   

        // play meow sfx
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.meow.play();
        }

        this.playerCat.update();
    }  
}

// //defineTextBox(){
    const GetValue = Phaser.Utils.Objects.GetValue;
    var createTextBox = function (scene, x, y, config) {
    var wrapWidth = GetValue(config, 'wrapWidth', 0);
    var fixedWidth = GetValue(config, 'fixedWidth', 0);
    var fixedHeight = GetValue(config, 'fixedHeight', 0);
    var textBox = scene.rexUI.add.textBox({
        x: x,
        y: y,

        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
            .setStrokeStyle(2, COLOR_LIGHT),

        icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),

        // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
        text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

        action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),

        space: {
            left: 20,
            right: 20,
            top: 40,
            bottom: 40,
            icon: 10,
            text: 10,
        }
    }).setOrigin(0,1).layout();

    textBox.setInteractive().on('pointerdown', function () {
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
            icon.y -= 30;
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

    var getBBcodeText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
        return scene.rexUI.add.BBCodeText(0, 0, '', {
            fixedWidth: fixedWidth,
            fixedHeight: fixedHeight,

            fontSize: '22px',
            wrap: {
                mode: 'word',
                width: wrapWidth
            },
            maxLines: 3
        })
    }
// //}