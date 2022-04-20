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

/*
PROJECT TITLE: FISHAGGEDON (ROCKET PATROL MOD)
CREATOR: Newton Novak
TIME SPENT WORKING: 12 hours
POINT BREAKDOWN:
Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
Create a new animated sprite for the Spaceship enemies (10)
Display the time remaining (in seconds) on the screen (10)
Implement parallax scrolling (10
Allow the player to control the Rocket after it's fired (5)
Randomize each spaceship's movement direction at the start of each play (5)
TOTAL POINTS: 100
*/