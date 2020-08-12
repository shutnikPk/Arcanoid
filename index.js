window.addEventListener("DOMContentLoaded", ()=>{
    let containerTag = document.createElement("div");
    let canvas = document.createElement("CANVAS");
    canvas.width = 800;
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

    let border = new Block(false, true);
    border.drawBlock(0, 0, 800, 25, 'gray');
    border.drawBlock(0, 0, 25, 600, 'gray');
    border.drawBlock(0, 575, 800, 25, 'gray');
    border.drawBlock(775, 0, 25, 600, 'gray');

  /*  let destoyedBlock = new BorderBlock();
    destoyedBlock.drawBlock(25,25,93.75,30,'red','black');*/



})