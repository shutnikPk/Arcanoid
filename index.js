window.addEventListener("DOMContentLoaded", ()=>{
    let containerTag = document.createElement("div");
    let canvas = document.createElement("CANVAS");
    canvas.width = 800;
    canvas.heigth = 600;
    let ctx = canvas.getContext('2d');
    document.body.prepend(containerTag);
    document.body.firstChild.appendChild(canvas);

    class Block {
        constructor (isDestroyed, isBonus){
            this.isDestroyed = isDestroyed;
            this.isBonus = isBonus;
        }
    }

    class BorderBlock extends Block{
        
    }
})