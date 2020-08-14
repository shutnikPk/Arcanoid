window.addEventListener("DOMContentLoaded", ()=>{
    let containerTag = document.createElement("div");
    let canvas = document.createElement("CANVAS");
    canvas.width = 1100;
    canvas.height = 600;
    let ctx = canvas.getContext('2d');
    document.body.prepend(containerTag);
    document.body.firstChild.appendChild(canvas);   
    

    class gameObj{
        constructor(x, y, width,height, isDestroyed){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;            
            this.isDestroyed = isDestroyed;            
        }

        

        drawObj (color) {            
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        newCenterX () {
            return this.center = this.x + this.width/2;    
                     
        }
        newPosX () {
            this.x += this.speedX;    
                     
        }
        newPosY () {
            this.y += this.speedY;    
                     
        }

        destroyBlock (x, y, blockWidth, blockHeight) {            
            ctx.clearRect(x, y, blockWidth, blockHeight);
            delete this;
        }

        onClosion (otherobj) {
            let myleft = this.x;
            let myright = this.x + (this.width);
            let mytop = this.y;
            let mybottom = this.y + (this.height);
            let otherleft = otherobj.x;
            let otherright = otherobj.x + (otherobj.width);
            let othertop = otherobj.y;
            let otherbottom = otherobj.y + (otherobj.height);
            let crash = true;
            if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
              crash = false;
            }
            return crash;  

        }
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

            

        createBlocks () {
           let destroyedBlock = [];
            for (let row = 0; row < this.field.length; row++){
                destroyedBlock[row] = [];
                for (let cell = 0; cell < this.field[row].length; cell++){  
                    destroyedBlock[row][cell] = new gameObj(25 + cell * 93.75, 24.5 + row * 30, 93.6, 30, true);
                    //destroyedBlock[row][cell].drawObj('orange');
                }
            } 
            return destroyedBlock;
        }
        clearZone (x, y, width, heigth) {
            ctx.clearRect(x, y, width, heigth);
        }
        interval = setInterval(updateGameArea, 20);
    }    

    let topBorder = new gameObj(0, 0, 800, 25, false);
    topBorder.drawObj('gray');
    let leftBorder = new gameObj(0, 0, 25, 600, false);
    leftBorder.drawObj('gray');
    let bottomBorder = new gameObj(0, 575, 800, 25, false);
    bottomBorder.drawObj('gray');
    let rigthBorder = new gameObj(775, 0, 25, 600, false);
    rigthBorder.drawObj('gray');


    let player = new gameObj (325, 560, 100, 15, false);  
    let ball = new gameObj (350, 533, 25, 25, false);
    let gameField = new Map(0);
    gameField.createBlocks();        

    ball.speedY = 2;
    ball.speedX = 2;

    window.addEventListener('keydown', function (e) {
        gameField.key = e.keyCode;
        
    })
    window.addEventListener('keyup', function (e) {
        gameField.key = false;  console.log(gameField.key);             
    })   

    function updateGameArea() {        
        gameField.clearZone(25, 560, 750, 15);    
        gameField.clearZone(24, 24, 750, 550); 
        for (let row = 0; row < gameField.field.length; row++){
            //gameField.destroyedBlock[row] = [];
            for (let cell = 0; cell < gameField.field[row].length; cell++){                  
                gameField.createBlocks()[row][cell].drawObj('orange');
            }
        }
        player.speedX = 0;
        
        console.log('playerCenter is '+player.newCenterX ());
        console.log(ball.x);
        if(ball.onClosion(leftBorder)||ball.onClosion(rigthBorder)){ ball.speedX *=-1; console.log('sideBorder')}
        if(ball.onClosion(topBorder)){ ball.speedY *=-1; console.log('topBorder')} 
        if(ball.onClosion(player)&&ball.x<player.newCenterX()){ ball.speedY *=-1;ball.speedX *=-1; console.log('player')}
        if(ball.onClosion(player)&&ball.x>player.newCenterX()){ ball.speedY *=-1; console.log('player');}   
        if(ball.onClosion(bottomBorder)){ ball.speedY *=-1;clearInterval(gameField.interval);console.log('gameOwer')}        
        if (gameField.key && gameField.key == 37) {player.speedX = -10;}
        if (gameField.key && gameField.key == 39) {player.speedX = 10;}              
        player.newPosX();
        player.newCenterX();
        ball.newPosY();
        ball.newPosX();
        player.drawObj('green');   
        ball.drawObj('red');    
    }


})