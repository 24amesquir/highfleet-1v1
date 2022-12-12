// get the canvas element and its context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//set canvas background to black
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

//global variables
const gravity = 1;
const globalScale = 10;//1/scale = globalScale
let frameCount = 0;


function UI(){
    //draw the number of bullets available in the top left corner as gold rectangles from the variable ship.currentBullets
    for(let i = 0; i < ship.currentBullets; i++){
        ctx.fillStyle = 'gold';
        ctx.fillRect(i * 20, 0, 10, 10);
    }
    ctx.fillStyle = 'cyan';
    ctx.fillRect(0, canvas.height - 10, canvas.width/ship.health * ship.health/2, 10);
    ctx.fillStyle = 'red';
    ctx.fillRect(canvas.width - canvas.width/2*(enemyShip.health/100), canvas.height - 10, canvas.width/2*(enemyShip.health/100), 10);
    //draw the number of frames that have passed in the top right corner
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(frameCount, canvas.width/2, 20);
    let missileImage = new Image();
    missileImage.src = 'assets/images/missile.png';
    //display number of missles as the image at assets/images/missile.png in the top right corner as 7 * 32px rectangles
    for(let i = 0; i < ship.missiles; i++){
        ctx.drawImage(missileImage, canvas.width - 10 * (i + 1), 0, 7, 32);
    }
}

//create ship
let enemyShip = new Ship(canvas.width / 2, canvas.height / 2, -Math.PI/2, 'red', 'gladiator', true);
objects.push(enemyShip);
let ship = new Ship(canvas.width / 2, canvas.height / 2, -Math.PI/2, 'white');
objects.push(ship);

//update function
function update(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < objects.length; i++){
        objects[i].update();
    }
    UI();
    frameCount++;
    requestAnimationFrame(update);
}

//if the user interacts with the page, play the song which is stored in the variable music using music.play(), and then remove the event listener
document.addEventListener('click', function(){
    music.play();
    document.removeEventListener('click', arguments.callee);
});

document.addEventListener('DOMContentLoaded', update);