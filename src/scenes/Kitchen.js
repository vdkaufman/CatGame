class Kitchen extends Phaser.Scene {
    constructor() {
        super("kitchen");
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
        this.load.image('nextPage',
            'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
        this.load.spritesheet('cat', './assets/sprites/furlockSpriteSheet.png',
            { frameWidth: 115, frameHeight: 183 });
        this.load.image('simplebg', './assets/Simplebg.png');

        // load collision walls
        this.load.image('wallCollisionHorizontal', './assets/blackHorizontal1100.png');
        this.load.image('wallCollisionVertical', './assets/blackVertical800.png');

        this.load.image('backWall', './assets/livingRoom/livingRoom_backWall.png');
        this.load.image('leftWall', './assets/livingRoom/livingRoom_leftWall.png');
        this.load.image('rightWall', './assets/livingRoom/livingRoom_rightWall.png');
        this.load.image('floor', './assets/livingRoom/carpetBG.png');

    }
    create() {

        // Add collision sprites
        this.wallColliderUp = this.physics.add.sprite(game.config.width / 2, 300, 'wallCollisionHorizontal');
        this.wallColliderUp.setImmovable(true);
        this.wallColliderUp.body.allowGravity = false;

        this.wallColliderDown = this.physics.add.sprite(game.config.width / 2, game.config.height - 5, 'wallCollisionHorizontal');
        this.wallColliderDown.setImmovable(true);
        this.wallColliderDown.body.allowGravity = false;

        this.wallColliderLeft = this.physics.add.sprite(20, game.config.height / 2, 'wallCollisionVertical');
        this.wallColliderLeft.setImmovable(true);
        this.wallColliderLeft.body.allowGravity = false;

        this.wallColliderRight = this.physics.add.sprite(game.config.width - 20, game.config.height / 2, 'wallCollisionVertical');
        this.wallColliderRight.setImmovable(true);
        this.wallColliderRight.body.allowGravity = false;

        this.background = this.add.tileSprite(0, 0, 1100, 800, 'simplebg').setOrigin(0, 0);


    }



}