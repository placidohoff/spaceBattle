class SceneMain extends Phaser.Scene{
    constructor(){
        super('SceneMain')
    }

    preload(){
        this.centerX = game.config.width /2;
        this.centerY = game.config.height /2;
    }
    create(){
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        // let mediaManager = new MediaManager({scene: this});
        // mediaManager.setBackgroundMusic('backgroundMusic')

        let sb = new SoundButtons({scene: this});

        //Since the ship has physics on it, notice the difference:
        this.background = this.add.image(0,0,'spacefield')
        this.background.setOrigin(0,0)
        this.ship = this.physics.add.sprite(this.centerX, this.centerY, 'ship');

        this.background.setInteractive();
        this.background.on('pointerdown', this.backgroundClicked, this)
    }
    update(){

    }
    backgroundClicked(){
        let tx = this.background.input.localX;
        let ty = this.background.input.localY;

        this.physics.moveTo(this.ship, tx, ty, 60);
    }
    
}