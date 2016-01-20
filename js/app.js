// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 506;
    this.y = 0;
    this.speed = 0;   
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Enemy off-screen
    if (this.x > 505) {
        this.x = -101;

         // Pick random column
        switch(Math.floor(Math.random() * 3)){
            case 0: this.y = 56;     // Top column
                break;
            case 1: this.y = 139;     // Middle column
                break;
            case 2: this.y = 222;     // bottom column
                break;
            default: //nothing
         }

        // Fast or slow bug?
        if (Math.random() > .65) {
            this.speed = 400 + Math.random() * 100;
        } else {
            this.speed = 250 + Math.random() * 100;
        }

    } else {
        this.x += dt * this.speed;
        if ((this.y + 27)/83 === player.row && (this.x > (player.col * 101 - 81) && this.x < (player.col * 101 + 84))) {
            player.dead = true;
        }
    }
    

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.col = 2;               //this.x = 202;
    this.row = 5;               //this.y = 383;
    this.action = 'none';
    this.dead = false;
};

Player.prototype.update = function() {
    if (this.dead === true) {
        this.col = 2;
        this.row = 5;
        this.dead = false;
    } else {
        switch (this.action) {
                 case 'left': if (this.col != 0) this.col--;
                      break;
                 case 'up':   if (this.row === 1) {
                                this.row = 5;
                                this.col = 2;
                            } else { this.row--; }
                      break;
                 case 'right':if (this.col != 4) this.col++;
                      break;
                 case 'down': if (this.row != 5) this.row++;
                      break;
             default:
                this.action = 'none';
        }
        this.action = 'none';
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.col * 101, this.row * 83 - 27);
};

Player.prototype.handleInput = function(direction) {
    this.action = direction;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [ new Enemy(), new Enemy(), new Enemy()];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
