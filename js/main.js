const app=document.querySelector("#app");
const snake_ctx = app.getContext('2d');
const apple_ctx = app.getContext('2d');
let border_ctx=app.getContext('2d');
let snakePosition=[{X:120,Y:150},{X:130,Y:150},{X:140,Y:150},{X:150,Y:150},{X:160,Y:150}];
let head={X:160,Y:150};
let newHead={X:Number,Y:Number};
let found=false;
let applePosition={X:90,Y:110}
let X=[20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280];
let Y=[20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280];
let apple_x,apple_y;
let direction;
let tail=[];
let score=0;

let Draw=()=>{
    snake_ctx.fillStyle = 'blue';
    for(let x in snakePosition){
        snake_ctx.fillRect(snakePosition[x].X,snakePosition[x].Y,10,10)
    }


    apple_ctx.fillStyle = 'red';
    apple_ctx.fillRect(applePosition.X,applePosition.Y,10,10);


    border_ctx.lineWidth = 10;
    border_ctx.strokeStyle="white";
    border_ctx.strokeRect(0,0,80,0);//for white background
    border_ctx.strokeRect(120,0,80,0);//for white background
    border_ctx.strokeRect(240,0,80,0);//for white background
    border_ctx.strokeRect(0,300,80,0);//for white background
    border_ctx.strokeRect(120,300,80,0);//for white background
    border_ctx.strokeRect(240,300,80,0);//for white background
    border_ctx.lineWidth =10;
    border_ctx.strokeRect(0, 0,0,80);//for white background
    border_ctx.strokeRect(0,120,0,80);//for white background
    border_ctx.strokeRect(0,240,0,80);//for white background
    border_ctx.strokeRect(300, 0,0,80);//for white background
    border_ctx.strokeRect(300,120,0,80);//for white background
    border_ctx.strokeRect(300,240,0,80);//for white background

}

let updateApple=()=>{
    apple_ctx.clearRect(0,0,300,300);
    apple_x = X[Math.floor(Math.random()*X.length)];
    apple_y = Y[Math.floor(Math.random()*Y.length)];
    applePosition={X:apple_x,Y:apple_y};
    for(let x in snakePosition){
        if(snakePosition[x].X==apple_x&& snakePosition[x].Y==apple_y){
            updateApple();
        }
    }
    Draw();
}

    document.addEventListener("keydown",(e)=>{
        switch (e.key) {
    
            case "Down": // IE/Edge specific value
            case "ArrowDown":
              if(direction!="up"){
              direction="down";
              }
              // Do something for "down arrow" key press.
              break;
            case "Up": // IE/Edge specific value
            case "ArrowUp":
              if(direction!="down"){
                direction="up";
                }
              // Do something for "up arrow" key press.
              break;
            case "Left": // IE/Edge specific value
            case "ArrowLeft":
              // Do something for "left arrow" key press.
                if(direction!="right"){
                  direction="left";
                }
              break;
            case "Right": // IE/Edge specific value
            case "ArrowRight":
              // Do something for "right arrow" key press.
                if(direction!="left"){
                  direction="right"
                }
              break;
          }
          updateSnake(direction);
    });

let updateSnake=(direction)=>{
    switch (direction){
        case "right":
          if(head.X+10<=280){
            newHead={X:head.X+10,Y:head.Y};
          }
          else{
            if((newHead.Y>79&&newHead.Y<120)||(newHead.Y>199&&newHead.Y<240)){
              newHead.X=0;
              found=false;
            }
            else{found=true}
          }
          
         
            if(found==false){
                tail=snakePosition[0];
                snakePosition.shift();
                snakePosition.push(newHead);
                head=newHead;
                if(newHead.X==applePosition.X && newHead.Y==applePosition.Y){snakeFeed(tail);}
            }
            else{
             return  gameOver();
            }
          break;
          case "down":
            if(head.Y+10<=300){
              newHead={X:head.X,Y:head.Y+10};
            }
            else{if((newHead.X>=80&&newHead.X<=110)||(newHead.X>=200&&newHead.X<=230)){
              newHead.Y=0;
              found=false;
            }
            else{found=true}
          }
        
              if(found==false){
                tail=snakePosition[0];
                snakePosition.shift();
                snakePosition.push(newHead);
                head=newHead;
                if(newHead.X==applePosition.X && newHead.Y==applePosition.Y){snakeFeed(tail);}
              }
              else{ 
                return gameOver();
              }
          break;
          case "up":
          if(head.Y-10>=0){
            newHead={X:head.X,Y:head.Y-10};
          }
          else{if((newHead.X>=80&&newHead.X<=110)||(newHead.X>=200&&newHead.X<=230)){
            newHead.Y=300;
            found=false;
          }
          else{found=true}}
         
            if(found==false){
                tail=snakePosition[0];
                snakePosition.shift();
                snakePosition.push(newHead);
                head=newHead;
              if(newHead.X==applePosition.X && newHead.Y==applePosition.Y){snakeFeed(tail);}
            }
            else{
                return gameOver();
            }
          break;
          case "left":
            if(head.X-10>=0){
              newHead={X:head.X-10,Y:head.Y};
            }
            else {  if((newHead.Y>=80&&newHead.Y<=120)||(newHead.Y>=200&&newHead.Y<=240)){
              newHead.X=300;
              found=false;
            }
            else{found=true}};
            
              if(found==false){
                tail=snakePosition[0];
                snakePosition.shift();
                snakePosition.push(newHead);
                head=newHead;
                if(newHead.X==applePosition.X && newHead.Y==applePosition.Y){snakeFeed(tail);}
              }
              else{
              return gameOver();
              }
        default:
          break;
      }
      border_ctx.clearRect(0,0,300,300);
      Draw()
         
}

Draw();

setInterval(() => {
    updateApple();
}, 7000);
let gameOver=()=>{
    border_ctx.font = '48px serif';
    border_ctx.fillStyle="black";
    border_ctx.fillRect(0,0,300,300);
    border_ctx.fillStyle="white";
    border_ctx.fillText('Game Over', 40, 150);
}

let snakeFeed=(tail)=>{
    snakePosition.unshift(tail);
    Draw();
    updateApple();
    score=score+1;
    changeScore();
    console.log(snakePosition);
}
let changeScore=()=>{
    let p=document.querySelector("#score");
    p.textContent=score;
}
changeScore();