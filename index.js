window.addEventListener("DOMContentLoaded", ()=>{
    let containerTag = document.createElement("div");
    let canvas = document.createElement("CANVAS");
    canvas.width = 1100;
    canvas.height = 600;
    let ctx = canvas.getContext('2d');
    document.body.prepend(containerTag);
    document.body.firstChild.appendChild(canvas);

    class Block {
        constructor (isDestroyed,isBonus){
            this.isDestroyed = isDestroyed;
            this.isBonus = isBonus;
        }
        drawBlock (x, y, blockWidth, blockHeight, fillColor){            
            ctx.fillStyle = fillColor;
            ctx.fillRect(x, y, blockWidth, blockHeight);
        }

        destroyBlock (x, y, blockWidth, blockHeight){            
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
        isBonus = false;
    }


    class Map {
         field = [ 
            [{x:0, y:0}, {x:0, y:1}, {x:0, y:2}, {x:0, y:3}, {x:0, y:4}, {x:0, y:5}, {x:0, y:6}, {x:0, y:7}],
            [{x:1, y:0}, {x:1, y:1}, {x:1, y:2}, {x:1, y:3}, {x:1, y:4}, {x:1, y:5}, {x:1, y:6}, {x:1, y:7}],
            [{x:2, y:0}, {x:2, y:1}, {x:2, y:2}, {x:2, y:3}, {x:2, y:4}, {x:2, y:5}, {x:2, y:6}, {x:2, y:7}],
            [{x:3, y:0}, {x:3, y:1}, {x:3, y:2}, {x:3, y:3}, {x:3, y:4}, {x:3, y:5}, {x:3, y:6}, {x:3, y:7}],
            [{x:5, y:0}, {x:5, y:1}, {x:5, y:2}, {x:5, y:3}, {x:5, y:4}, {x:5, y:5}, {x:5, y:6}, {x:5, y:7}]
        ];

        drawBlocks (){
            let destroyedBlocks = [];
            for (let row = 0; row < this.field.length; row++){
                destroyedBlocks[row] = [];
                for (let cell = 0; cell < this.field[row].length; cell++){  
                    destroyedBlocks[row][cell] = new BorderBlock();
                    destroyedBlocks[row][cell].drawBlock(25 + cell * 93.75, 25 + row * 30, 93.75, 30, 'red', 'black');
                }
            }
        }
    }    

    let gameField = new Map();
    gameField.drawBlocks();

    let border = new Block(false, true);
    border.drawBlock(0, 0, 800, 25, 'gray');
    border.drawBlock(0, 0, 25, 600, 'gray');
    border.drawBlock(0, 575, 800, 25, 'gray');
    border.drawBlock(775, 0, 25, 600, 'gray');

    /*let destoyedBlock = new BorderBlock();
    destoyedBlock.drawBlock(25,25,93.75,30,'red','black');*/



})