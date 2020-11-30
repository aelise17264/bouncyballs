console.log("let the bouncing begin")

let canvas = document.getElementById('canvas');
let char = canvas.getContext('2d');
let thisWidth = window.innerWidth;
let thisHeight = window.innerHeight;

canvas.width = thisWidth;
canvas.height = thisHeight;

let mouseX = 0;
let mouseY = 0;

addEventListener('mousemove', () => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

let gravity = 0.99;
char.strokeWidth = 5;

function randomColor() {
    return(
        "rgba(" +
        Math.round(Math.random() * 250) +
        "," +
        Math.round(Math.random() * 250) +
        "," +
        Math.round(Math.random() * 250) +
        "," +
        Math.round(Math.random() * 10)/10 +
        ")" 
        );
}

function Ball() {
    this.color = randomColor();
    this.radius = Math.random() * 20 + 14;
    this.startradius = this.radius;
    this.x = Math.random() * (thisWidth - this.radius * 2) + this.radius;
    this.y = Math.random() * (thisHeight - this.radius);
    this.nextY = Math.random() * 2;
    this.nextX = Math.round((Math.random() - 0.5) * 10);
    this.velocity = Math.random()/5;
    this.update = () => {
        char.beginPath()
        char.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        char.fillStyle = this.color;
        char.fill();
    }
}

let ball = [];
for (let i = 0; i < 50; i++){
    ball.push(new Ball())
}

function animate() {
    if(thisWidth != window.innerWidth || thisHeight != window.innerHeight){
        thisWidth = window.innerWidth
        thisHeight = window.innerHeight
        canvas.width = thisWidth
        canvas.height = thisHeight
    }
    requestAnimationFrame(animate);
    char.clearRect(0, 0, thisWidth, thisHeight);
    for (let i = 0; i< ball.length; i++){
        ball[i].update();
        ball[i].y += ball[i].nextY;
        ball[i].x += ball[i].nextX;
        if(ball[i].y + ball[i].radius >= thisHeight){
            ball[i].nextY = -ball[i].nextY * gravity;
        }else{
            ball[i].nextY += ball[i].velocity
        }

        if(ball[i].x + ball[i].radius > thisWidth || ball[i].x - ball[i].radius < 0){
            ball[i].nextX = -ball[i].nextX;
        }
        if(mouseX > ball[i].x - 20 &&
            mouseX < ball[i].x + 20 &&
            mouseY > ball[i].y - 50 &&
            mouseY < ball[i].y + 50 &&
            ball[i].radius < 70){
                ball[i].radius += 5;
            }else{
                if(ball[i].radius > ball[i].startradius){
                    ball[i].radius += -5
                }
            }
    }
}

animate();

setInterval(() => {
    ball.push(new Ball())
    ball.splice(0, 1)
}, 400)