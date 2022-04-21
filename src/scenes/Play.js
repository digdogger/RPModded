
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // load images/tile sprites
        this.load.image('missile', './assets/missile.png');
        this.load.image('fish', './assets/fish.png');
        this.load.image('bigfish', './assets/bigfish.png');
        this.load.image('smallfish', './assets/smallfish.png');
        this.load.image('RPMBG', './assets/RPMBG.png');
        this.load.image('grass', './assets/grass.png');
        this.load.image('cannon', './assets/cannon.png');
        this.load.image('top', './assets/borderh.png');
        this.load.image('side', './assets/borderv.png');
        this.load.image('lillies', './assets/lillies.png');
        // load spritesheet
        this.load.spritesheet('splash', './assets/splash.png', {frameWidth: 115, frameHeight: 56, startFrame: 1, endFrame: 7});
        this.load.spritesheet('fishanim', './assets/fishsheet.png', {frameWidth: 95, frameHeight: 54, startFrame: 0, endFrame: 8});
    }

    create() {

        // place tile sprite
        this.RPMBG = this.add.tileSprite(0, 0, 1366, 768, 'RPMBG').setOrigin(0, 0);
        this.add.tileSprite(0, 0, 1366, 768, 'grass').setOrigin(0, 0);
        this.lillies = this.add.tileSprite(0, 0, 1366, 768, 'lillies').setOrigin(0, 0);

        let timeConfig = {
            fontFamily: 'Courier New',
            fontSize: '50px',
            color: '#FFFFFF',
            strokeThickness: 10,
            stroke: '#A97D3E',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        
        
    

        this.anims.create({
            key: 'swish',
            frames: this.anims.generateFrameNumbers('fishanim', { start: 0, end: 8, first: 0}),
            frameRate: 16
        });
        



        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'missile').setOrigin(0.5, 0);
        this.cannon = this.add.sprite(this.p1Rocket.x-80, this.p1Rocket.y, 'cannon');
        this.ship01 = new Spaceship(this, game.config.width - borderUISize*6, borderUISize*4, 'fish', 0, 40, 'swish').play('swish');
        this.ship02 = new Spaceship(this, game.config.width - borderUISize*3, borderUISize*6 + borderPadding*2, 'fish', 0, 20, 'swish').play('swish');
        this.ship03 = new Spaceship(this, game.config.width - borderUISize*18, borderUISize*8 + borderPadding*4, 'fish', 0, 10, 'swish').play('swish');
        if (!this.ship01.direction) {
            this.ship01.flipX = true;
        }
        if (!this.ship02.direction) {
            this.ship02.flipX = true;
        }
        if (!this.ship03.direction) {
            this.ship03.flipX = true;
        }
        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('splash', { start: 1, end: 7, first: 1}),
            frameRate: 16
        });


        //  borders
        this.add.tileSprite(0, 0, game.config.width, borderUISize, 'top').setOrigin(0, 0);
        this.add.tileSprite(0, game.config.height - borderUISize, game.config.width, borderUISize, 'top').setOrigin(0, 0);
        this.add.tileSprite(0, 0, borderUISize, game.config.height, 'side').setOrigin(0, 0);
        this.add.tileSprite(game.config.width - borderUISize, 0, borderUISize, game.config.height, 'side').setOrigin(0, 0);
        // initialize score
        this.p1Score = 0;

        let scoreConfig = {
            fontFamily: 'Courier New',
            fontSize: '50px',
            color: '#FFFFFF',
            strokeThickness: 10,
            stroke: '#A97D3E',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }



        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score,
        scoreConfig);

        this.gameOver = false;
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            

            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 +64, 'Press(R) to Restart or <- for Menu',
            scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null,this);
        this.timenow = game.settings.gameTimer/1000 +1;
        this.timerRight = this.add.text(game.config.width/1.2, borderUISize + borderPadding*2, this.timenow,
        timeConfig);
        
    }

    update() {        

        if (this.timenow > Math.ceil(this.clock.getRemainingSeconds())) {
            this.timenow = Math.ceil(this.clock.getRemainingSeconds());
            this.timerRight.text = this.timenow
        }
        if (!this.p1Rocket.isFiring) {
          if (this.cannon.x != this.p1Rocket.x){
               this.cannon.x = this.p1Rocket.x;
           }
        }

 


   
        
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.RPMBG.tilePositionX -= 2;
        this.lillies.tilePositionX -= 1;
        if(!this.gameOver) {
 
            this.p1Rocket.update();
            this.ship01.update();             // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            
        }
       
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }

       
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'splash').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });       
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
        

    



}