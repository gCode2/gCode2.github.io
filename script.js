var canvas = document.querySelector('.canvas'),
    ctx = canvas.getContext('2d');
canvas.height = 480;
canvas.width = 720;
var x = canvas.width / 2,
    y = canvas.height / 2,
    rotation = 0,
    playerVX = 0,
    playerVY = 0,
    keys = {},
    friction = 0.94,
    mouseX = 0,
    mouseY = 0,
    angle = 0,
    zombies = [],
    bullets = [],
    kills = 0,
    score = 0,
    money = 0,
    i = 0,
    menuOpened = false,
    spritePath = 'sprites/',
    gunPath = 'guns/',
    activeSlot = '1';
slots = ['pistol.png', 'rifle.png', ''];
draw();

function player() {
    var dx = mouseX - x,
        dy = mouseY - y;

    var player = new Image();
    player.src = spritePath + 'player.png';
    /* * * * * * * ROTATING PLAYER * * * * * * */
    if (!menuOpened) {
        angle = Math.atan2(dy, dx);
    }
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.arc(0, 0, 12.5, 0, 2 * Math.PI);
    ctx.fillStyle = 'transparent';
    ctx.fill();

    ctx.drawImage(player, -12.5, -12.5, 25, 25);
    ctx.translate(-x, -y);
    ctx.closePath();



    /* * * * * * * * * * * * * * * * * * */
    /* * * *  MOVEMENT & FRICTION  * * * */
    if (!menuOpened) {
        x += playerVX;
        y += playerVY;
        playerVX *= friction;
        playerVY *= friction;
        /* * * * * * * * * * * * * * * * * * */
        /* * * * * * * CONTROLS * * * * * * */

        if (keys[83]) {
            playerVY += .2;
        }
        if (keys[68]) {
            playerVX += .2;
        }
        if (keys[65]) {
            playerVX -= .2;
        }
        if (keys[87]) {
            playerVY -= .2;
        }
    }
    /* * * * * * * * * * * * * * * * * * */
    /* * * * * * * BOUNDINGS * * * * * * */

    if (x <= 12.5) {
        x = 12.5;
    }
    if (x >= 707.5) {
        x = 707.5;
    }
    if (y <= 12.5) {
        y = 12.5;
    }
    if (y >= 467.5) {
        y = 467.5;
    }
    /* * * * * * * * * * * * * * * * * * */
}



function draw() {
    /* * * * * DRAW PLAYER & ZOMBIES * * * * */
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < zombies.length; i++) {
        zombies[i].draw();
    }

    player();

    ctx.restore();
    /* * * * * * * * * * * * * * * * * * */

    //deleting bullets after 2.5s

    for (var i = 0; i < bullets.length; i++) {
        for (var j = 0; j < zombies.length; j++) {
            if (bullets[i] && zombies[j]) {
                var bulletDistanceX = bullets[i].x - zombies[j].x,
                    bulletDistanceY = bullets[i].y - zombies[j].y,
                    bulletDistance = Math.sqrt(bulletDistanceX * bulletDistanceX + bulletDistanceY * bulletDistanceY);
                if (bulletDistance < 14.5) {
                    kills++;
                    score += 100;
                    money += 15;
                    console.log(kills);
                    bullets.splice(i, 1);
                    zombies.splice(j, 1);
                }
            }
        }

        if (bullets[i]) {
            if (bullets[i].life <= 0) {
                bullets.splice(i, 1);
            }

            if (bullets[i]) {
                bullets[i].draw();
            }
        }
    }
    //





    ctx.font = '20px verdana';
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 10, 25);
    ctx.fillText('Money: ' + money, 570, 25);
    ctx.font = '10px verdana';
    ctx.fillStyle = '#cacaca';
    ctx.fillText('Press "b" to open buy menu!', 10, 470);


    for (i = 0; i < 3; i++) {
        var gun = new Image();
        gun.src = gunPath + slots[i];
        ctx.drawImage(gun, 567 + i * 50, 430);
        if (i == activeSlot - 1) {
            ctx.strokeStyle = 'white';
        } else {
            ctx.strokeStyle = '#aaaaaa';
        }
        ctx.strokeRect(565 + i * 50, 430, 43, 43);
        ctx.font = '8px verdana';
        ctx.fillText(i + 1, 600 + i * 50, 470);
    }


    window.requestAnimationFrame(draw);

}
/* * * * * EVENT HANDLERS * * * * */

function keyPressedHandler(ev) {
    //console.log(ev.keyCode);
    keys[ev.keyCode] = true;
    //console.log(keys);
    getMousePosition;

}

function keyReleasedHandler(ev) {
    if (keys[66]) {
        menuOpened = !menuOpened;
        buyMenu();
        keys[66] = false;
    }
    if (!menuOpened) {
        switch (ev.key) {
            case '1':
            case '2':
            case '3':
                activeSlot = parseInt(ev.key);
                break;
        }

        keys[ev.keyCode] = false;
    }
}

function getMousePosition(ev) {
    mouseX = ev.offsetX;
    mouseY = ev.offsetY;


    //console.log(angle);
}

/* * * * * * * * * * * * * * * * * * */

function Bullet() {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.life = 150;
    this.vx = 10 * Math.cos(this.angle);
    this.vy = 10 * Math.sin(this.angle);
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x - playerVX, this.y - playerVY, 2, 0, 2 * Math.PI);
        ctx.fillStyle = 'gold';
        ctx.fill();
        ctx.closePath();
        this.update();
    }
    this.update = function () {
        if (!menuOpened) {
            this.life--;
            this.x += this.vx;
            this.y += this.vy;
        }
    }
}


function Zombie() {
    var zombie = new Image(),
        zx = 0,
        zy = 0;
    zombie.src = spritePath + 'zombie.png';

    //SPAWN ZOMBIES OUTSIDE CANVAS
    while (zx >= -20 && zx <= 740 && zy >= -20 && zy <= 500) {
        zx = Math.floor(Math.random() * 880) - 80;
        zy = Math.floor(Math.random() * 600) - 80;
    }
    //

    this.x = zx;
    this.y = zy;
    this.angle = 0;
    this.vx = 0;
    this.vy = 0;

    this.draw = function () {

        //DRAW ZOMBIES & ROTATE
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);
        ctx.beginPath();
        ctx.arc(0, 0, 12.5, 0, 2 * Math.PI);
        ctx.fillStyle = "transparent";
        ctx.fill();
        ctx.drawImage(zombie, -12.5, -12.5, 25, 25);
        ctx.closePath();
        this.update();
        ctx.translate(-this.x, -this.y);
        ctx.restore();
        //
    }
    this.update = function () {

        //CALCULATING DISTANCE BETWEEN ZOMBIES AND PLAYER
        this.distanceX = x - this.x;
        this.distanceY = y - this.y;
        this.distance = Math.sqrt(this.distanceX * this.distanceX + this.distanceY * this.distanceY);
        //

        //GAME OVER
        if (this.distance < 25) {
            //  alert(kills);
            location.reload();
        }
        //

        //ZOMBIE MOVEMENT AND PLAYER TRACKING//
        if (!menuOpened) {
            this.angle = Math.atan2(this.x - x, this.y - y);
            this.vx = -Math.sin(this.angle) * 2.2;
            this.vy = -Math.cos(this.angle) * 2.2;
            this.x += this.vx;
            this.y += this.vy;
        }
        //

    }
}

function shootBullet() {
    if (!menuOpened) {
        var b = new Bullet();
        bullets.push(b);
    }
}

/* * * * * SPAWN ZOMBIES * * * * */

//for (var i = 0; i < 53; i++) {
//    var z = new Zombie();
//    zombies.push(z);
// }
function spawnZombies() {
    if (!menuOpened && document.hasFocus()) {
        var z = new Zombie();
        zombies.push(z);
    }
}
setInterval(spawnZombies, 1300);

/* * * * * * * * * * * * * * * * */

function buyMenu() {

    if (menuOpened) {
        ctx.restore();
        ctx.fillStyle = "rgba(0,0,0,.3)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '40px verdana';
        ctx.fillStyle = '#ededed';
        ctx.fillText('Buy Menu', 270, 45);

        for (i = 1; i < 6; i++) {
            ctx.fillStyle = '#cacaca';
            ctx.fillRect(40, i * 80, 200, 40);
        }
        for (i = 1; i < 6; i++) {
            ctx.fillStyle = '#cacaca';
            ctx.fillRect(480, i * 80, 200, 40);
        }


        window.requestAnimationFrame(buyMenu);
    }


}



window.addEventListener('keydown', keyPressedHandler, false);
window.addEventListener('keyup', keyReleasedHandler, false);
window.addEventListener('mousemove', getMousePosition, false);
window.addEventListener('click', shootBullet, false);
