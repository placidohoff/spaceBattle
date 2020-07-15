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

        //Scale down the ship to 25%/2 of the width:
        Align.scaleToGameW(this.ship, .125)

        //Set the background to same scale as ship:
            //We do not use Align.scaleToGameW() since background will be scrolling.
        this.background.scaleX = this.ship.scaleX;
        this.background.scaleY = this.ship.scaleY;

        this.background.setInteractive();
        this.background.on('pointerdown', this.backgroundClicked, this)
    }
    update(){
        //Measure the distance to click point to know when to stop ship:
            let distX = Math.abs(this.ship.x - this.tx);
            let distY = Math.abs(this.ship.y-this.ty);
            if(distX < 10 && distY < 10){
                this.ship.body.setVelocity(0,0);
            }
    }
    backgroundClicked(){
        //Had to multiply the 'tx', 'ty' by 'this.scaleX' because this scale down changed greatly effected the code:
            this.tx = this.background.input.localX * this.background.scaleX;
            this.ty = this.background.input.localY * this.background.scaleY;

        let angle = this.physics.moveTo(this.ship, this.tx, this.ty, 90);
        angle = this.toDegrees(angle)
        this.ship.angle = angle;
    }
    toDegrees(angle){
        return angle * (180 / Math.PI);
    }
    
}