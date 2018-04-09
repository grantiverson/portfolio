'use strict';

const Character = function(x, y) {
    this.x = x;
    this.y = y;
}

// Draw the character on the screen, required method for game
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(x, y) {
    Character.call(this, x, y);
    this.sprite = 'images/enemy-bug.png';  // bug image used for enemies
    this.reset();
};

Enemy.prototype = Object.create(Character.prototype);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 500) {     // Resets enemies when they move off screen
        this.reset();
    }
    this.x += this.speed * dt;  // Multiplies speed by time delta
};

Enemy.prototype.reset = function() {
    this.x = -100 * Math.random() - 100;                    // Random offscreen starting x-value for enemy
    this.y = (Math.floor(Math.random() * 3)) * 83 + 58;     // Random starting y-value for enemy
    let s = Math.random();                                  // Random value used for generating enemy speed
    while (s < 0.1) {                                       // Makes sure the speed is not too slow
        s += Math.random();
    }
    this.speed = s * 500;                                   // Calculates speed of enemy
}

const checkCollisions = function() {    // Checks to see if player has collided with an enemy or crossed into water square
    for (const enemy of allEnemies) {
        if (enemy.x + 80 >= player.x && enemy.x <= player.x + 80 && enemy.y + 83 >= player.y && enemy.y <= player.y + 70) {
            player.lose();              // If player collides with enemy, lose
        }
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y) {
    Character.call(this, x, y);
    this.sprite = 'images/char-boy.png';    // Sets player image
    this.wins = 0;
    this.lives = 3;
}

Player.prototype = Object.create(Character.prototype);

Player.prototype.update = function() {
    if (player.y < 68) {
        player.win();                   // If player makes it to water, win
    }
}

Player.prototype.reset = function() {   // Resets player to starting position
    this.x = 200;
    this.y = 400;
}

Player.prototype.lose = function() {    // What to do if player loses
    this.lives -= 1;
    document.getElementById('#lives').textContent = this.lives;
    this.reset();
    if (this.lives === 0) {
        alert(`You lose. You got ${this.wins} points!`);
        this.lives = 3;
        this.wins = 0;
        document.getElementById('#lives').textContent = this.lives;
        document.getElementById('#wins').textContent = this.wins;
    }
}

Player.prototype.win = function() {    // What to do if player wins
    this.wins ++;
    document.getElementById('#wins').textContent = this.wins;
    this.reset();
};

Player.prototype.handleInput = function(key) {  // Moves player based on key input
    if (key === 'down' && this.y < 400) {
        this.y += 83;
    } else if (key === 'up' && this.y > -15) {
        this.y -= 83;
    } else if (key === 'right' && this.x < 402) {
        this.x += 101;
    } else if (key === 'left' && this.x > -2) {
        this.x -= 101;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let enemy1 = new Enemy;
let enemy2 = new Enemy;
let enemy3 = new Enemy;
let enemy4 = new Enemy;

const allEnemies = [enemy1, enemy2, enemy3, enemy4];

const player = new Player(200, 400);
player.reset();

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
