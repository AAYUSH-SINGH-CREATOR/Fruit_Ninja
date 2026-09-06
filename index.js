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


// const takingfruits = document.querySelectorAll(".fruitImg");

// function animatefruit(fruit){

//     takingfruits.classList.Add("fruitanimation");
    
// }

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
        rotation: 0, 
        rotationSpeed: (Math.random() - 0.5) * 0.2
    }
    activeFruits.push(newFruit);
    // console.log("HELLO WORLD");

}



// let ishover = false;

function update() {
    if (!startgame) { return };
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    activeFruits.forEach((fruit) => {
        fruit.dy += 0.2;
        fruit.x += fruit.dx;
        fruit.y += fruit.dy;

        // ctx.drawImage(fruit.image, fruit.x, fruit.y, fruit.w, fruit.h);
        fruit.rotation += fruit.rotationSpeed;     
        ctx.save(); 
        ctx.translate(fruit.x + (fruit.w / 2), fruit.y + (fruit.h / 2));
        ctx.rotate(fruit.rotation);
        ctx.drawImage(fruit.image, -fruit.w / 2, -fruit.h / 2, fruit.w, fruit.h);
        ctx.restore();

        if (fruit.x + fruit.w > canvas.width || fruit.x - fruit.w < 0) {
            fruit.dx *= -1;
        }

    })
    activeFruits = activeFruits.filter((fruit) => {
        const offcanvas = fruit.y > canvas.height + 150;
        ishover = mouseposition.x > fruit.x && mouseposition.x < fruit.x + fruit.w
            && mouseposition.y > fruit.y && mouseposition.y < fruit.y + fruit.h;
    // animatefruit(activeFruits);
        if (ishover) {
   
              const sliceactive = new Audio(slicesound);
                sliceactive.volume = 0.7;
                sliceactive.play();
            // let ran = Math.floor(Math.random()*1);
            // const popsoundeff = new Audio(popsoundone)
            // popsoundeff.volume = 0.1;
            // popsoundeff.play();

            score++;
            // console.log(score);
            scrPoints.textContent = score;


            // if (score == 12) {

            //     const TFsound = new Audio(scoretwentyfive);
            //     TFsound.volume = 0.9;
            //     TFsound.play();
            // }
            // if (score == 25) {
            //     const Fftysound = new Audio(scorefifty);
            //     Fftysound.volume = 0.9;
            //     Fftysound.play();
            // }

            // if (score == 40) {
            //     const seventyFsound = new Audio(hahasound)
            //     seventyFsound.volume = 0.9;
            //     seventyFsound.play();
            // }

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
    if (life < 1) {
        livies.textContent = "0";
        if (life == 0 && score > 0) {
            const overSound = new Audio(gameoversound);
            overSound.volume = 0.5;
            overSound.play();
        }
        endGame();
    }
    // console.log("hello world");
    requestAnimationFrame(update);
}

// const starttheGame = "assets/sounds/startthegame.mp3";
// const scorezero = "assets/sounds/chicken-on-tree-screaming.mp3"
// const scoretwentyfive = "assets/sounds/acha-ji-aisa-hai-kya.mp3"
// const scorefifty = "assets/sounds/50speech.mp3";
// const gameoversound = "assets/sounds/endgame.mp3"
// const popsoundone = ["assets/sounds/ack.mp3"];
// const hahasound = "assets/sounds/hahahah.mp3";

const homesound = "assets/bgsong.mp3";
const slicesound = "assets/sounds/simpleslice.mp3";
const gameoversound = "assets/sounds/gameover.mp3";
const homemusic = new Audio(homesound);
homemusic.loop = true;
homemusic.volume=0.3;
homemusic.play();

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


function startGame() {

    // const startaudio = new Audio(starttheGame);
    // startaudio.volume = 0.9;
    // startaudio.play();

    life = 5;
    score = 0;

    console.log("heelo im in startGame");
    startgame = true;

    uiref.classList.add("hidden");
    startmenu.classList.add("hidden");
    gameover.classList.add("hidden");

    let spawnspeed;
    if(mode == "normal"){
         spawnspeed = 650;
    }
    else{
        spawnspeed=350;
    }

    popingfruits = setInterval(spawnFruit,spawnspeed);
    update();
    console.log("exiting startgame");
}



function endGame() {
    // if (score == 0) {
    //     const playzerosound = new Audio(scorezero);
    //     playzerosound.volume = 0.9;
    //     playzerosound.play();
    // }

    
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



const normalmode = document.getElementById("normalBtn");
const advancemode = document.getElementById("advanceBtn");
let mode = 'normal';
normalmode.addEventListener("click", ()=>{
    console.log("in normal mode");
  mode = "normal";
  normalmode.classList.add("selected");
  advancemode.classList.remove("selected");

})

advancemode.addEventListener("click", ()=>{
    console.log("in advance mode")
    mode = 'advance';
    advancemode.classList.add("selected");
    normalmode.classList.remove("selected");
})

