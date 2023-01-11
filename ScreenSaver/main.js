//set up our canvas
//gives acess to the drawing properties

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); //3d is webgl or webgl2

//innerWith refers to the viewpport(screen)
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight; //both of these keep it within the screen; no matter screen size

//function to generate random number
function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//function to generate a random RGB color; using rgb cause it's numbers and we can use the random function above
function randomRGB(){
    return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})` //SPELLCHECK I found my error lol
}

class Ball {
    constructor(x, y, velX, velY, color, size){ //using coordinates for the ball so it can have a starting position; Vel refers to velocity
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    } 
    
    draw(){
        ctx.beginPath(); //starts drawing the shape
        ctx.fillStyle = this.color //what to fill it with
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI ) //this is like drawing a circle on paper; x and y are the starting point; we start at 0; 2 * Math.PI makes it a full circle/ 360 as .arc() use radians;
        ctx.fill(); //TEST AT this point to make sure that a ball shows
    }

    //we need a method to make the ball bounce from the side of the screen
    //first we need to know when the ball hits the side of the screen
    update(){
        if(/*hits right of screen*/(this.x + this.size) >= width){
            this.velX = -(this.velX)
        }
        if(/*hits left of screen*/(this.x - this.size) <= 0){ //its zero because it's a graph. 0 is on the left. the right is the width
            this.velX = -(this.velX)
        }
        if((this.y + this.size) >= height){ //for the top of the screen
            this.velY = -(this.velY)
        }
        if ((this.y - this.size) <= 0){ //for the bottom of the screen
            this.velY = -(this.velY)
        }
        //can combine this functions but it helps me see where the ball is going to go

        this.x += this.velX; //this makes it redraw aka move each time aka makes it moves around frames
        this.y += this.velY;
    }

    //this is extra for collision dectection
    collisionDetect(){
        for(const ball of balls){
            if(!(this === ball)){
                const dx = this.x - ball.x
                const dy = this.y - ball.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < this.size + ball.size){
                    ball.color = this.ball = randomRGB()
                }
            }
        }
    }

    //end of end for collision dectection

}

const balls = [] //this is so we know how many balls we have on the screen

while (balls.length <= 200){
    const size = random(5, 15);
    const ball = new Ball(
        random(0 + size, width - size), //0 + size is so it wont generate off the screen
        random(0 + size, height - size), //y-coordinate
        random(1,4), // vel-x
        random(1,4), // vel-y
        randomRGB(), //assign color from function before
        size //declared it above
    )

    balls.push(ball)
}

//this is to animate it. it will be a loop

function loop(){
    ctx.fillStyle = 'rgba(0,0,0,1)'//creates a transperant wipe a is transperancy; the a show how long a trail is 1 is no trail, 0.1 is longer
    ctx.fillRect(0,0, width, height) //fills in the black part?
    for(const ball of balls) {
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }

    requestAnimationFrame(loop) //this is a recursion as it is calling itself and it will not stop
}

loop(); //dont forget to call it

//This code is so fun!!!