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



const fruits = document.querySelectorAll(".fruitImg");
console.log(fruits.length);

const fruitsarray = [];

fruits.forEach((fruit) => {
    const fruitobject = {
        image: fruit,
        w: 100,
        h: 100,
        x: Math.floor(Math.random() * (canvas.width - (30 * 2)) + 30),
        y: canvas.height - 100,
        dx: Math.floor(Math.random()*5),
        dy: -Math.floor(Math.random()*5) - 7
        // dy: -12
    }
    fruitsarray.push(fruitobject);
})

const activeFruits = [];
console.log(Math.floor(Math.random() * canvas.width - 10));

let randomfruit = 1;
let fruit = fruitsarray[randomfruit]
const spawnFruit = () => {
     randomfruit = Math.floor(Math.random()*7);
     fruit = fruitsarray[randomfruit];
     fruit.x = Math.random() * (canvas.width - fruit.w);
    fruit.y = canvas.height - fruit.h;

    fruit.dx = (Math.random() * 4) - 2;
    fruit.dy = -12;
    activeFruits.push(fruit);
}

// function drawFruits(fruit) {
//     console.log(fruit);
//         ctx.drawImage(fruit.image, fruit.x, fruit.y, fruit.w, fruit.h);
// }

// drawFruits();

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fruit.x += fruit.dx;
    fruit.y += fruit.dy;

    if(fruit.x + fruit.w > canvas.width){
        fruit.dx*=-1;
    }

    if(fruit.y - fruit.w < 50){
        fruit.dy *=-1;
    }
    
    fruit.dy+=0.1;
    
    activeFruits.forEach((fruit)=>{
        ctx.drawImage(fruit.image, fruit.x, fruit.y, fruit.w, fruit.h);
    })

    requestAnimationFrame(update);

}
spawnFruit();
spawnFruit();
update();


