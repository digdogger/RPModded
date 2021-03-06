// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.isFiring = false;
      this.moveSpeed = 1.5;
      this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update() {
        if(!this.isFiring || (this.isFiring && this.y < 580)){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - 
                borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }
        

        // fire button
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }
        

        if(this.isFiring && this.y >= borderUISize*2 ) {
            this.y -= this.moveSpeed;
        }
        if(this.y <= borderUISize*2 ) {
            this.reset();
        }

    }
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}