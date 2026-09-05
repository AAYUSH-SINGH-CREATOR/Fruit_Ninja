const scrPoints = document.querySelector("#strScore");
const livies = document.querySelector("#strLife");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

console.log(canvas.height, canvas.width);

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);
console.log(Math.floor(Math.random()*canvas.width - 10));
const circles = {
    // x: Math.floor(Math.random()*canvas.width - 30) ,
    x: Math.floor(Math.random() * (canvas.width - (30 * 2)) + 30),
    y:canvas.height-30,
    size:30,
    dx:0.1,
    dy:-4

}

function drawCirle(){
   ctx.beginPath();
   ctx.arc(circles.x, circles.y, circles.size, 0, Math.PI * 2);
   ctx.fillStyle = 'teal'
   ctx.fill();
    
}


function update(){x: Math.floor(Math.random() * (canvas.width - (30 * 2)) + 30),

    ctx.clearRect(0, 0 , canvas.width, canvas.height);
    drawCirle();
    circles.y+=circles.dy;

    requestAnimationFrame(update);

}

update();


