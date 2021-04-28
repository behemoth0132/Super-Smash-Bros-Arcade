//Display Alien at Specified Position 
class mario {
    constructor(x, y, image) {
 
        this.x = x;
        this.y = y;
        this.image = image;
    }
 
    draw() {
        image(this.image, this.x, this.y, this.image.width/30, this.image.height/30);
    }
 
}

//The invaders

class Invaders {
    constructor(alienImage, rowsCount) {
        this.alienImage = alienImage;
        this.rowsCount = rowsCount;
        this.direction = 0;
        this.y = 40;
        this.aliens = this.initialiseAliens();
        this.bullets = [];
     
        this.speed = 0.2;
 
    }
 
 
    update() {
        for (let alien of this.aliens) {
            if (this.direction == 0) {
                alien.x+= this.speed;
            } else if (this.direction == 1) {
                alien.x-= this.speed;
            }
        }
 
    
 
        if (this.hasChangedDirection()) {
            this.moveAlienDown();
        }
         
    }
 
 
 
    hasChangedDirection() {
        for (let alien of this.aliens) {
            if (alien.x >= width - 40) {
                this.direction = 1;
                return true;
            } else if (alien.x <= 20) {
                this.direction = 0;
                return true;
            }
        }
        return false;
    }
 
    moveAlienDown() {
        for (let alien of this.aliens) {
            alien.y += 10;
        }
 
    }
 
 
    initialiseAliens() {
        let aliens = [];
        let y = 40;
        for (let i = 0; i < this.rowsCount; i++) {
            for (let x = 40; x < width - 40; x += 30) {
                aliens.push(new Alien(x, y, this.alienImage));
            }
            y += 40;
        }
        return aliens;
    }
 
    draw() {
        for (let alien of this.aliens) {
            alien.draw();
        }
 
    }
 
  
 
}

//Collision 
checkCollision(x, y) {
    for (let i = this.aliens.length - 1; i >= 0; i--) {
        let currentAlien = this.aliens[i];
        // the numbers are hard-coded for the width of the image
        if (dist(x, y, currentAlien.x + 11.5, currentAlien.y + 8) < 10) {
            this.aliens.splice(i, 1);
            return true;
        }
    }
    return false;
  }

  // mouse pressed remove alien
  function mousePressed() {
    invaders.checkCollision(mouseX, mouseY);
}

//Shooting
class Invaders {
    constructor(alienImage, rowsCount) {
        this.alienImage = alienImage;
        this.rowsCount = rowsCount;
        this.direction = 0;
        this.y = 40;
        this.aliens = this.initialiseAliens();
        this.bullets = [];
     
        this.speed = 0.2;
       
        // to make sure the aliens dont spam
        this.timeSinceLastBullet = 0;
 
    }
 
 
    update() {
        for (let alien of this.aliens) {
            if (this.direction == 0) {
                alien.x+= this.speed;
            } else if (this.direction == 1) {
                alien.x-= this.speed;
            }
        }
 
    
 
        if (this.hasChangedDirection()) {
            this.moveAlienDown();
        }
 
 
 
        if (this.aliens.length == 0) {
            this.nextLevel();
        }
       
       
       if (this.timeSinceLastBullet >= 40) {
          let bottomAliens = this.getBottomAliens();
 
          if (bottomAliens.length) {
              this.makeABottomAlienShoot(bottomAliens);
          }  
        }
        this.timeSinceLastBullet++;
       
       
      // to move the bullets
      this.updateBullets();
         
    }
   
 
 
 
    hasChangedDirection() {
        for (let alien of this.aliens) {
            if (alien.x >= width - 40) {
                this.direction = 1;
                return true;
            } else if (alien.x <= 20) {
                this.direction = 0;
                return true;
            }
        }
        return false;
    }
 
    moveAlienDown() {
        for (let alien of this.aliens) {
            alien.y += 10;
        }
 
    }
   
   // to make sure only the bottom row will shoot
   getBottomAliens() {
        let allXPositions = this.getAllXPositions();
 
        let aliensAtTheBottom = [];
        for (let alienAtX of allXPositions) {
            let bestYPosition = 0;
            let lowestAlien;
 
            for (let alien of this.aliens) {
                if (alien.x == alienAtX) {
 
                    if (alien.y > bestYPosition) {
                        bestYPosition = alien.y;
                        lowestAlien = alien;
                    }
 
                }
            }
            aliensAtTheBottom.push(lowestAlien);
        }
 
        return aliensAtTheBottom;
    }
 
 
 
 
    nextLevel() {
        this.speed += 0.5;
        this.aliens = this.initialiseAliens();
    }
 
 
        // get all the x positions for a single frame
    getAllXPositions() {
        let allXPositions = new Set();
        for (let alien of this.aliens) {
            allXPositions.add(alien.x);
        }
        return allXPositions
    }
     
    initialiseAliens() {
        let aliens = [];
        let y = 40;
        for (let i = 0; i < this.rowsCount; i++) {
            for (let x = 40; x < width - 40; x += 30) {
                aliens.push(new Alien(x, y, this.alienImage));
            }
            y += 40;
        }
        return aliens;
    }
 
    draw() {
       
        // draw the bullets first so they're underneath
      for (let bullet of this.bullets) {
          rect(bullet.x, bullet.y,  3, 10);
      }
       
      for (let alien of this.aliens) {
          alien.draw();
      }
       
   
 
    }
   
    checkCollision(x, y) {
      for (let i = this.aliens.length - 1; i >= 0; i--) {
          let currentAlien = this.aliens[i];
 
          if (dist(x, y, currentAlien.x + 11.5, currentAlien.y + 8) < 10) {
              this.aliens.splice(i, 1);
              return true;
          }
      }
      return false;
    }
   
   
    makeABottomAlienShoot(bottomAliens) {
      let shootingAlien = random(bottomAliens);
 
      let bullet = new AlienBullet(shootingAlien.x + 10, shootingAlien.y + 10);
     
      this.bullets.push(bullet);
      this.timeSinceLastBullet = 0;
    }
   
 
     updateBullets() {
        for (let i = this.bullets.length - 1; i >= 0; i-- ) {
            this.bullets[i].y  += 2;
        }
    }
 
}
//Bullet
class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
 
    draw() {
        fill(255);
        rect(this.x, this.y, 3, 10);
    }
}
//Alien Bullet
class AlienBullet extends Bullet {
    constructor(x, y) {
        super(x, y);
    }
 
    update() {
        this.y += 2;
    }
}

//Player

class Player {
    constructor(shooterImage) {
        this.image = shooterImage;
        this.x = width / 2;
        this.y = height -30;
 
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.bullets = [];
 
    }
 
    update() {
        if (this.isMovingRight) {
            this.x += 1;
        } else if (this.isMovingLeft) {
            this.x -= 1;
        }
 
        this.constrain();
 
        this.updateBullets();
    }
 
    updateBullets() {
         
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            this.bullets[i].update();
 
            if (this.hasHitAlien(this.bullets[i])) {
                this.bullets.splice(i, 1);
                break;
            } else if (this.bullets[i].isOffScreen()) {
                this.bullets.splice(i, 1);
                break;
 
            }
        }
    }
 
 
    hasHitAlien(bullet) {
        return invaders.checkCollision(bullet.x, bullet.y);
    }
 
 
    constrain() {
 
        if (this.x <= 0) {
            this.x = 0;
        } else if(this.x > width - 23) {
            this.x = width - 23;
        }
    }
 
    draw() {
        image(this.image, this.x, this.y, this.image.width / 20, this.image.height/20);
 
        this.drawBullets();
    }
 
 
    drawBullets() {
        for (let bullet of this.bullets) {
            bullet.draw();
        }
    }
 
 
    drawLives() {
        fill(255);
        textSize(15);
        text("LIVES", 250, 25);
        for (let i = 0; i < this.lives; i++) {
            image(this.image, 300 + i * 30, 10, this.image.width / 20, this.image.height/20);
        }
    }
 
    drawScore() {
 
        text("SCORE", 50, 25);
 
        push();
        fill(100, 255, 100);
        text(this.score, 110, 25);
        pop();
    }
 
    moveLeft() {
        this.isMovingRight = false;
        this.isMovingLeft = true;
    }
    moveRight() {
        this.isMovingLeft = false;
        this.isMovingRight = true;
    }
 
    shoot() {
        this.bullets.push(new PlayerBullet(this.x + 12, this.y));
    }
 
}
//Bullet Class
class PlayerBullet extends Bullet {
    constructor(x, y) {
        super(x, y);
    }
 
    update() {
        this.y -= 6;
    }
}

// player moving and shooting
function keyPressed() {
    if (keyCode === RIGHT_ARROW || keyCode == 88) {
      player.moveRight();
    } else if (keyCode === LEFT_ARROW || keyCode == 90) {
      player.moveLeft();
    } else if (keyCode === 32) {
      player.shoot();
    }
  }