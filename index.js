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
        drawBlock (x, y, blockWidth, blockHeight, borderColor, fillColor){
            ctx.strokeStyle = borderColor;
            ctx.strokeRect(x, y, blockWidth, blockHeight);

            ctx.fillStyle = fillColor;
            ctx.fillRect(x+10, y+5, blockWidth-20, blockHeight-10);
        }

        destroyBlock (x, y, blockWidth, blockHeight){            
            ctx.clearRect(x, y, blockWidth, blockHeight);
            delete this;
        }

        isDestroyed = true;
        isBonus = false;
    }

})