const grid=document.querySelector('.Area');
let speed=3;
let dir=1;
var wrongFood=0;
var time=60;
var life=0;
var power_timer=0;
var last_time=0;
var seq_arr=[];
var arr=[];
var powerupOn=0;
var poweraction=0;
var which;
var power;
var blink=1;
var sound=new Audio('sound.mp3');


let last={'x':0,'y':0};
localStorage.setItem('score',0);
document.querySelector('#score').innerHTML=`SCORE : 0`;
document.querySelector('#timer').innerHTML=`Timer : 70`;

var words=['TRICHY','DELTA','LOVE','CATS','DOGS','HTML','CODE','TECH','COMPUTER']

const colour=['red','black','blue','green'];
var gamestatus=0;

document.addEventListener("keyup",event=>{
    if(event.key=='Enter'){
        gamestatus=1;
        document.querySelector('h1').style.display="none";
    }
})

if(!localStorage.getItem('hs')){
    localStorage.setItem('hs',0);
}
var hs=localStorage.getItem('hs')
document.querySelector('#Hiscore').innerHTML=`Highscore : ${hs}`;

setInterval(() => {
    if(gamestatus==1){
        time--;
        power_timer++;
        speed+=0.2;
    }
    document.querySelector('#timer').innerHTML=`Timer : ${time}`;
},1000);

var size=parseInt(prompt("Enter the size of grid (I recommend 20): ",20))
grid.style.gridTemplateColumns=`repeat(${size},1fr)`
grid.style.gridTemplateRows= `repeat(${size},1fr)`;
for(let i=0;i<size;i++){
    for(let j=0;j<size;j++){
        const cell=document.createElement('div');
        cell.dataset.x=j;
        cell.dataset.y=i;
        cell.classList.add('cell');
        grid.appendChild(cell);

    }
}    
//varibles
let head={'x':0,'y':0};
let segment=[head];

let lastframetime=0;

// fps
function fps(ctime){
    let seg=segment.slice(1,segment.length);
    seg.forEach(s=>{
        if(segment[0].x==s.x && segment[0].y==s.y){
            life++;
        
        let li=document.querySelector(`.life${life}`);
        li.style.display='none';

        if(powerupOn==1){
            powerupOn=0;
            document.querySelector('.powerup').classList.remove('powerup')
        }
        alert(`You ate yourself and lost a life !, Only ${3-life} lives`)
    if(life==3){
       if(!alert(`OhhOhh You ATE YOURself!! GAME OVER !! \nYOUR SCORE IS ${localStorage.getItem('score')}`)){
        window.location.reload();
        return;
    }}
    
    let p=document.querySelectorAll('.snake');
    p.forEach(s=>{
        s.classList.remove('snake')
    })
    dir=1;

    segment=[{'x':1,'y':0},{'x':0,'y':0},{'x':0,'y':0}]
            }
        })
    
    if((segment[0].x<0 || segment[0].x>(size-1))||(segment[0].y<0 || segment[0].y>(size-1))){
        life++;
        let li=document.querySelector(`.life${life}`);
        li.style.display='none';

        if(powerupOn==1){
            powerupOn=0;
            document.querySelector('.powerup').classList.remove('powerup')
        }

        alert(`You hit the wall and lost a life !, Only ${3-life} lives`)
    if(life==3){
       if(!alert(`OhhOhh You HIT the WALL !!GAME OVER !! \nYOUR SCORE IS ${localStorage.getItem('score')}`)){
        window.location.reload();
        return;
    }}
    
    let p=document.querySelectorAll('.snake');
    p.forEach(s=>{
        s.classList.remove('snake')
    })
    dir=1;
    

    segment=[{'x':1,'y':0},{'x':0,'y':0},{'x':0,'y':0}]


    }
    
if(wrongFood==1){
    wrongFood=0;
    life++;
        let li=document.querySelector(`.life${life}`);
        li.style.display='none';
        if(powerupOn==1){
            powerupOn=0;
            document.querySelector('.powerup').classList.remove('powerup')
        }
        alert(`You ate picked the wrong and lost a life !, Only ${3-life} lives`)
    if(life==3){
       if(!alert(`OhhOhh You PICKED the wrong food !! \nYOUR SCORE IS ${localStorage.getItem('score')}`)){
        window.location.reload();
        return;
    }}
    
    let p=document.querySelectorAll('.snake');
    p.forEach(s=>{
        s.classList.remove('snake')
    })
    dir=1;
    segment=[{'x':1,'y':0},{'x':0,'y':0},{'x':0,'y':0}]
}
if(time==0){
    document.querySelector('#timer').innerHTML=`Timer : 0`;
    if(!alert(`SORRY You have RUN OUT of TIME!! GAME OVER !! \nYOUR SCORE IS ${localStorage.getItem('score')}`)){
     window.location.reload();
 }
 return;
}
    

    window.requestAnimationFrame(fps);
    
    if ((ctime-lastframetime)/1000 > 1/speed){
        lastframetime=ctime;
        if(gamestatus==1)
            main_logic();
    }
}


    







function main_logic(){
    
        
    

    if(arr.length==0){
        let parent=document.querySelector('.foodBlocks');
        while(parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
        time=time+10;
        generateFood();
        //Incrementing body of snake
        last.x=segment[segment.length-1].x;
        last.y=segment[segment.length-1].y;
       segment.push(last)
       
        let add=grid.querySelector(`[data-x="${segment[segment.length-1].x}"][data-y="${segment[segment.length-1].y}"]`);
       segment.push(add);

       
    }
    
    else{
        
    let it=grid.querySelector(`[data-x="${segment[segment.length-1].x}"][data-y="${segment[segment.length-1].y}"]`);
    last=it;
    it.classList.remove('snake');
    
}
    

    for(let i=segment.length-1;i>0;i--){
        segment[i].x=segment[i-1].x;
        segment[i].y=segment[i-1].y;}
    
    switch(dir){
        case 1:
            segment[0].x++;
            break;
        case -1:
            segment[0].x--;
            break;
        case 2:
            segment[0].y--;
            break;
        case -2:
            segment[0].y++;
            break;
    }
    
    segment.forEach(s=>{
        let item=grid.querySelector(`[data-x="${s.x}"][data-y="${s.y}"]`);
        item.classList.add('snake');
    }
    )
    powerup();
    
    checkScore(); 
    

}


fps()


updatingPosition();

function updatingPosition(){
    document.addEventListener("keydown", function(event) {
        if (event.key == "ArrowLeft" && dir!=1){
           dir=-1;
        } else if (event.key == "ArrowUp" && dir!=-2){
           dir=2;
        } else if (event.key == "ArrowRight" && dir!=-1){
           dir=1;
        } else if (event.key == "ArrowDown" && dir!=2){
           dir=-2;
        }
})
}


// For Food
function generateFood(){
    let z=Math.floor(Math.random()*words.length);
    let x=words[z];

    arr=x.split('');
    arr.forEach(s=>{
        let q=document.createElement('div');
        q.innerHTML=s;
        q.dataset.value=s;
        console.log(q)
        document.querySelector('.foodBlocks').appendChild(q);
        let x1 = Math.floor(Math.random() * size);
        let y1 = Math.floor(2+Math.random() *(size-3));
        let letter = grid.querySelector(`[data-x="${x1}"][data-y="${y1}"]`);
        letter.innerHTML=s
        letter.classList.add('food')
        seq_arr.push(letter);
        
    })

}

//Score Update
function checkScore(){
    seq_arr.forEach(l=>{
    if(l.dataset.x==segment[0].x&&l.dataset.y==segment[0].y){
        sound.play();
        if(l.innerHTML==arr[0]){
            let w=document.querySelector(`[data-value="${arr[0]}"]`);
            w.classList.add('letter');
            l.innerHTML='';
            l.classList.remove('food')
            arr.shift();
            seq_arr.shift();   
            let sc=localStorage.getItem('score');
            sc++;
            document.querySelector('#score').innerHTML=`SCORE : ${sc}`;
            localStorage.setItem('score',sc); 
            
            if(sc>hs){
                localStorage.setItem('hs',sc);
                document.querySelector('#Hiscore').innerHTML=`Highscore : ${sc}`
            }else{
                localStorage.setItem('hs',hs);
            }

        }else{
            wrongFood=1;
        }}
    })}

            
    

window.addEventListener('keydown',function(event){
    let key=event.key;
    if(key=='Escape'){
        if(gamestatus==1){
            gamestatus=0
        }else{
            gamestatus=1;
        }
    }

}
)
//On-screen keyboard
document.querySelector('.up').onclick = function(){
    if(dir!=2 && dir!=-2){
        dir=2;
    }
}
document.querySelector('.right').onclick = function(){
    if(dir!=1 && dir!=-1){
        dir=1;
    }
}
document.querySelector('.down').onclick = function(){
    if(dir!=-2 && dir!=2){
        dir=-2;
    }
}
document.querySelector('.left').onclick = function(){
    if(dir!=-1 && dir!=1){
        dir=-1;
    }
}
document.querySelector('.pause').onclick = function(){
   
    let img=document.querySelector('.pause');
    if(gamestatus==1){
        img.setAttribute("src",'play.png')
        gamestatus=0;
    }else{
        img.setAttribute("src",'pause.png')
        gamestatus=1;
    }
}

function powerup(){
    if(segment.length>=6 && power_timer-last_time>15){
        if(powerupOn==0){
            powerupOn=1;
            
            which=Math.floor(Math.random()*2);
            let x1 = Math.floor(Math.random() * size);
            let y1 = Math.floor(2+Math.random() * (size-3));
            power = grid.querySelector(`[data-x="${x1}"][data-y="${y1}"]`);
            
            power.classList.add('powerup');
            
            }
        else if(powerupOn==1){
            let powerele=document.querySelector('.powerup');
            
            if(powerele.dataset.x==segment[0].x && powerele.dataset.y==segment[0].y){
                    sound.play();
                    powerupOn=0;
                    last_time=power_timer;
                    
                    
                    powerele.classList.remove('powerup');
                    if(which==0){
                        speed-=3;
                    }else{
                        let cut=segment.slice(segment.length-4,segment.length);
                        segment.splice(segment.length-4,3);
                        cut.forEach(s=>{
                            grid.querySelector(`[data-x="${s.x}"][data-y="${s.y}"]`).classList.remove('snake');
                        })
                    }
                }}
            

        }
    
    }









