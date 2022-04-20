let config = {
    type: Phaser.CANVAS,
    width: 1400,
    height: 750,
    autoCenter: true,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT
