window.addEventListener("DOMContentLoaded", ()=>{
    let containerTag = document.createElement("div");
    let canvas = document.createElement("CANVAS");
    canvas.width = 1100;
    canvas.height = 600;
    let ctx = canvas.getContext('2d');
    document.body.prepend(containerTag);
    document.body.firstChild.appendChild(canvas);   
    



    class Ball {
        constructor(ballWidth, ballHeight){
            this.ballWidth = ballWidth;
            this.ballHeight = ballHeight;
        }

        drawBall (ballWidth, ballHeight) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(365, 545, ballWidth, ballHeight);
        }
    }

    class Player {     
        constructor (x, playerWidth, playerHeigth){
            this.playerWidth = playerWidth;
            this.playerHegth = playerHeigth;
            this.x = x;
        }

        speedX = 0;

        newPos () {
            this.x += this.speedX;    
                     
        }


        drawPlayer () {            
            ctx.fillStyle = 'green';
            ctx.fillRect(325+this.x, 560, 100, 15);
        }     
         
    }

    class Block {
        constructor (isDestroyed){
            this.isDestroyed = isDestroyed;           
        }
        drawBlock (x, y, blockWidth, blockHeight, fillColor) {            
            ctx.fillStyle = fillColor;
            ctx.fillRect(x, y, blockWidth, blockHeight);
        }

        destroyBlock (x, y, blockWidth, blockHeight) {            
            ctx.clearRect(x, y, blockWidth, blockHeight);
            delete this;
        }

    }

    class BorderBlock extends Block {
        drawBlock (x, y, blockWidth, blockHeight, borderColor, fillColor){           
            ctx.strokeStyle = borderColor;
            ctx.strokeRect(x, y, blockWidth, blockHeight);            
            ctx.fillStyle = fillColor;
            ctx.fillRect(x+1, y+1, blockWidth-2, blockHeight-2);
        }
        isDestroyed = true;        
    }

    class Map {

        constructor(x){            
            this.x=x;
            this.key;
        }
         field = [ 
            [{x:0, y:0}, {x:0, y:1}, {x:0, y:2}, {x:0, y:3}, {x:0, y:4}, {x:0, y:5}, {x:0, y:6}, {x:0, y:7}],
            [{x:1, y:0}, {x:1, y:1}, {x:1, y:2}, {x:1, y:3}, {x:1, y:4}, {x:1, y:5}, {x:1, y:6}, {x:1, y:7}],
            [{x:2, y:0}, {x:2, y:1}, {x:2, y:2}, {x:2, y:3}, {x:2, y:4}, {x:2, y:5}, {x:2, y:6}, {x:2, y:7}],
            [{x:3, y:0}, {x:3, y:1}, {x:3, y:2}, {x:3, y:3}, {x:3, y:4}, {x:3, y:5}, {x:3, y:6}, {x:3, y:7}],
            [{x:5, y:0}, {x:5, y:1}, {x:5, y:2}, {x:5, y:3}, {x:5, y:4}, {x:5, y:5}, {x:5, y:6}, {x:5, y:7}]
        ];        

        drawBlocks () {
            let destroyedBlock = [];
            for (let row = 0; row < this.field.length; row++){
                destroyedBlock[row] = [];
                for (let cell = 0; cell < this.field[row].length; cell++){  
                    destroyedBlock[row][cell] = new BorderBlock();
                    destroyedBlock[row][cell].drawBlock(25 + cell * 93.75, 25 + row * 30, 93.75, 30, 'red', 'black');
                }
            } 
            let topBorder = new Block(false);
            topBorder.drawBlock(0, 0, 800, 25, 'gray');
            let sideBorder = new Block(false);
            sideBorder.drawBlock(0, 0, 25, 600, 'gray');
            sideBorder.drawBlock(0, 575, 800, 25, 'gray');
            let bottomBorder = new Block(false);
            bottomBorder.drawBlock(775, 0, 25, 600, 'gray');         
        }

        clearZone () {
            ctx.clearRect(25, 560, 750, 15);
        }
        

        interval = setInterval(updateGameArea, 20);

    }    



    let player = new Player (0,100,15);  
    let gameField = new Map(0);
    gameField.drawBlocks();        

    console.log(gameField);

    window.addEventListener('keydown', function (e) {
        gameField.key = e.keyCode;
        console.log(this.key);
    })
    window.addEventListener('keyup', function (e) {
        gameField.key = false;               
    })   

    function updateGameArea() {        
        gameField.clearZone();           
        if (gameField.key && gameField.key == 37) {player.speedX = -1;/*console.log(gameField.key)*/}
        if (gameField.key && gameField.key == 39) {player.speedX = 1;/*console.log(gameField.key)*/}        
        player.newPos();
        player.drawPlayer();        
    }
})