class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/Blip_Select.wav');
        this.load.audio('sfx_explosion', './assets/Explosion.wav');
        this.load.audio('sfx_rocket', './assets/Rocket_fire.wav');
        this.load.image('menubg', './assets/menubg.png');
       
    }

    create() {
        // place tile sprite
        this.menubg = this.add.tileSprite(0, 0, 1400, 768, 'menubg').setOrigin(0, 0);
        

        let menuConfig = {
            fontFamily: 'Courier New',
            fontSize: '60px',
            color: '#FFFFFF',
            strokeThickness: 6,
            stroke: '#A97D3E',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let subConfig = {
          fontFamily: 'Courier New',
          fontSize: '26px',
          color: '#FFFFFF',
          strokeThickness: 2,
          stroke: '#A97D3E',
          align: 'right',
          padding: {
              top: 5,
              bottom: 5,
          },
          fixedWidth: 0
      }


        

       // this.add.text(game.config.width/2, game.config.height/3 - borderUISize -
       // borderPadding, 'FISHAGGEDON', menuConfig).setOrigin(0.5);
        //this.add.text(game.config.width/2,game.config.height/2 + borderUISize*3 +borderPadding*3, 'Use <--> arrows to move & (F) to fire', subConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FFFFFF'
        menuConfig.color = '#FF3377'
        //this.add.text(game.config.width/2, game.config.height/2 + borderUISize*4 + borderPadding*4, 'Press <- for Novice or -> for Expert', subConfig).setOrigin(0.5);
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
    }
}