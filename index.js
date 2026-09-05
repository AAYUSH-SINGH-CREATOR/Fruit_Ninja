const scrPoints = document.querySelector("#strScore");
const livies = document.querySelector("#strLife");

let life = 5;
let score = 0;
let startgame = false;
let popingfruits;
let animationId;
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
// console.log(fruitsImg.length + " hello ji");

let activeFruits = [];

let randomfruit = 1;

const spawnFruit = () => {
    randomfruit = Math.floor(Math.random() * 7);
    // console.log(randomfruit);

    const newFruit = {
        image: fruitsImg[randomfruit],
        w: 100,
        h: 100,
        x: Math.floor(Math.random() * canvas.width - (30 * 2) + 30),
        y: canvas.height - 100,
        dx: Math.floor(Math.random() * 7) - 3,
        dy: -Math.floor(Math.random() * 5 + 12),
    }
    activeFruits.push(newFruit);
    // console.log("HELLO WORLD");

}



// let ishover = false;

function update() {
    if(!startgame){ return };
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    activeFruits.forEach((fruit) => {
        fruit.dy += 0.2;
        fruit.x += fruit.dx;
        fruit.y += fruit.dy;

        ctx.drawImage(fruit.image, fruit.x, fruit.y, fruit.w, fruit.h);
        if (fruit.x + fruit.w > canvas.width || fruit.x - fruit.w < 0) {
            fruit.dx *= -1;
        }

    })
    activeFruits = activeFruits.filter((fruit) => {
        const offcanvas = fruit.y > canvas.height + 150;
        ishover = mouseposition.x > fruit.x && mouseposition.x < fruit.x + fruit.w
            && mouseposition.y > fruit.y && mouseposition.y < fruit.y + fruit.h;
        if (ishover) {

            score++;
            // console.log(score);
            scrPoints.textContent = score;

        }

        if (offcanvas) {
            life--;
            livies.textContent = life;
        }

        return !ishover && !offcanvas;

    });
    if (life < 1) {
        clearInterval(popingfruits);
        livies.textContent = "0";
    }
if(life<1){
    livies.textContent = "0";
    endGame();
}
    requestAnimationFrame(update);

}

// console.log(ishover);


let mouseposition = {
    x: undefined,
    y: undefined
}

canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    mouseposition.x = event.clientX - rect.left;
    mouseposition.y = event.clientY - rect.top;
})

// console.log(mouseposition.x)

canvas.addEventListener("mouseleave", () => {
    mouseposition.x = undefined;
    mouseposition.y = undefined;
})


const uiref = document.querySelector("#uiScreen");
const startmenu = document.querySelector("#startMenu");
const gameover = document.querySelector("#gameOverMenu")
const fnlScore = document.querySelector("#finalScore");


function startGame () {

    life = 5;
    score = 0; 

    console.log("heelo im in startGame");
    startgame = true;

    uiref.classList.add("hidden");
 startmenu.classList.add("hidden");
    gameover.classList.add("hidden");

    popingfruits = setInterval(spawnFruit, 1000);
    update();
    console.log("exiting startgame");
}
function endGame() {
    startgame = false;
    
    clearInterval(popingfruits);
    cancelAnimationFrame(animationId);

    const finalScore = document.getElementById("finalScore");
    finalScore.textContent = `Score: ${score}`;

    uiScreen.classList.remove("hidden");
    gameOverMenu.classList.remove("hidden");
}

document.querySelector("#startBtn").addEventListener('click', startGame);
document.querySelector("#restartBtn").addEventListener("click", startGame);


