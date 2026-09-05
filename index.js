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



const fruitsImg = Array.from(document.querySelectorAll(".fruitImg"));
console.log(fruitsImg.length + " hello ji") ;

let activeFruits = [];

let randomfruit = 1;

const spawnFruit = () => {
    randomfruit = Math.floor(Math.random() * 7);
    console.log(randomfruit);

    const newFruit = {
        image: fruitsImg[randomfruit],
        w:100,
        h:100,
        x:Math.floor(Math.random() * canvas.width - (30*2)+30),
        y:canvas.height - 100,
        dx:Math.floor(Math.random() * 5) - 2,
        dy: -Math.floor(Math.random()*5 + 12),
    }
    activeFruits.push(newFruit);
    console.log("HELLO WORLD");

}



function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    activeFruits.forEach((fruit) => {
        fruit.dy +=0.2;
        fruit.x += fruit.dx;
        fruit.y += fruit.dy;
        
        ctx.drawImage(fruit.image, fruit.x, fruit.y, fruit.w, fruit.h);
        if (fruit.x + fruit.w > canvas.width || fruit.x - fruit.w < 0) {
            fruit.dx *= -1;
        }
    })

    activeFruits = activeFruits.filter((fruit)=> fruit.y < canvas.height + 150);

    requestAnimationFrame(update);

}


spawnFruit();
setInterval(spawnFruit, 1000);
update();


