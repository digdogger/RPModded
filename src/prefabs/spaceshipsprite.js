

class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, animation) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.anims.play(animation, true);
        this.on('animationcomplete', () => {    
            this.anims.play(animation, true);                      
        });
        this.direction = Math.random() > 0.5 ; 
    } 
    

    preload() {
        this.load.spritesheet('fishanim', './assets/fishsheet.png', {frameWidth: 70, frameHeight: 40, startFrame: 0, endFrame: 8});
    }
    create() {

        this.anims.create({
            key: 'swish',
            frames: this.anims.generateFrameNumbers('fishanim', { start: 0, end: 8, first: 0}),
            frameRate: 16
        });
    }
    update() {
        if(this.direction){
            this.x -= this.moveSpeed;
        } else {
            this.x += this.moveSpeed;
        }

        
        if((this.x <= 0 - this.width ) && this.direction) {
            this.x = game.config.width;
        } else if ((this.x > game.config.width) && !this.direction) {
            this.x = 0;
        }
    }

}