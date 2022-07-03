let setsize = document.querySelector('#setsize');
let n , m;
setsize.addEventListener("click" , function(){    
    n = document.querySelector("#sizen").value;
    n -= 0;
    m = document.querySelector("#sizem").value;
    m -= 0;
    createGrid(n , m);
});
let inx , iny ;
function createGrid(n , m){
    inx=Math.floor(n/2); iny=Math.floor(m/2);
    var maze = new Array(n);
    var visited=new Array(n);
    for (var i = 0; i < maze.length; i++) {
    maze[i] = new Array(m);
    visited[i]=new Array(m);
    }
    const cont = document.createElement("container");
    cont.style.background = "white";
    cont.style.display = "inline-block";
    cont.style.border = "0px solid #252423";
    const body = document.body;
    body.append(cont);
    let rows = "";
    for(let i = 0 ; i < n ; i++) {
    rows += "20px ";
    }
    let cols = "";
    for(let i = 0 ; i < m ; i++) {
    cols += "20px ";
    }

    const grid = document.createElement("grid");
    grid.id = "yo1";
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = cols;
    grid.style.gridTemplateRows = rows;
    grid.style.gap = "0px";
    body.append(grid);
    cont.append(grid);

    let k ;
    for (let i=0; i<n; i++) {
        for (let j=0; j<m; j++) {
        visited[i][j]=0;
            k = document.createElement("cell");
            k.id=`${i * m + j}`;
            maze[i][j] = k;
            maze[i][j].classList.add("grid");
            body.append(k);
            cont.append(k);
            grid.append(k);
            k.style.border = "0px solid #00D672";
            k.style.justifyContent = "center";
            k.style.alignItems = "center";
            k.style.display = "flex";
            k.style.fontSize= "3rem";
            k.style.fontWeight = "bold";
            k.style.background = "#00D672";
            k.className="cell";
        }
    }

    const yo = document.querySelector('.left');
    yo.innerHTML += cont.innerHTML;
    cont.innerHTML = "";
    divide(0,n-1,0,m-1);
}

let ord=[];

function divide(r1, r2, c1, c2) {
    if (r1==r2 || c1==c2) return;
    let choose=Math.floor(2*Math.random());

    if (choose==0){
        let row=r1+Math.floor((r2-r1)*Math.random());
        let toErase=c1+Math.floor((c2-c1+1)*Math.random());
        for (let i=c1; i<=c2; i++){
            if (i!=toErase){
                ord.push([[row,i],[row+1,i]]);
            }
        }

        divide(r1,row,c1,c2);
        divide(row+1,r2,c1,c2);
    }

    if (choose==1){
        let col=c1+Math.floor((c2-c1)*Math.random());
        let toErase=r1+Math.floor((r2-r1+1)*Math.random());
        for (let i=r1; i<=r2; i++){
            if (i!=toErase){
                ord.push([[i,col],[i,col+1]]);
            }
        }
        divide(r1,r2,c1,col);
        divide(r1,r2,col+1,c2);
    }
}

function animate(index){
    let sz=ord.length;
    if (index==sz) return;
    let cidc=ord[index][0];
    let parentc;
    parentc=ord[index][1];
    

    let cid=cidc[0]*m+cidc[1];
    let parent;
    parent=parentc[0]*m+parentc[1];
  
  
    let borlef = document.getElementById(`${cid}`).style.borderLeft;
    let borri = document.getElementById(`${cid}`).style.borderRight;
    let borto = document.getElementById(`${cid}`).style.borderTop;
    let borbo = document.getElementById(`${cid}`).style.borderBottom;
  
    let Pborlef = document.getElementById(`${parent}`).style.borderLeft;
    let Pborri = document.getElementById(`${parent}`).style.borderRight;
    let Pborto = document.getElementById(`${parent}`).style.borderTop;
    let Pborbo = document.getElementById(`${parent}`).style.borderBottom;
  
    let direction;
    if (cidc[0]-parentc[0]==1) direction=2;
    if (cidc[0]-parentc[0]==-1) direction=1;
    if (cidc[1]-parentc[1]==1) direction=4;
    if (cidc[1]-parentc[1]==-1) direction=3;
  
    if(direction == 1) { 
      borbo = "1px solid black ";
    }
    if(direction == 2) { 
      borto = "1px solid black ";
    } 
    if(direction == 3) { 
      borri = "1px solid black ";
    } 
    if(direction == 4) { 
      borlef = "1px solid black ";
    }  
  
    if(direction == 1) { 
      Pborto = "1px solid black";
    }
    if(direction == 2) { 
      Pborbo = "1px solid black";
    }
    if(direction == 3) { 
      Pborlef = "1px solid black";
    }
    if(direction == 4) { 
      Pborri = "1px solid black";
    }
  
    let abcd=document.getElementById(`${parent}`);
  
    var also1 = function () {anime({
      targets : document.getElementById(`${parent}`),
      backgroundColor : 'black',
      borderBottom : Pborbo,
      borderTop : Pborto,
      borderLeft : Pborlef,
      borderRight : Pborri,
      duration : 1,
      complete: () => {
        myanimation();
      }
    }).play()};
  
    var myanimation = function () {anime({
      targets: document.getElementById(`${cid}`),
      backgroundColor : 'black',
      scale: [
        {value: .1, easing: 'easeOutSine', duration: -1000},
        {value: 1, easing: 'easeInOutQuad', duration: -1000}
      ],
      borderBottom : borbo,
      borderTop : borto,
      borderLeft : borlef,
      borderRight : borri,
      duration : 0,
      delay : 0,
      complete: ()=> {
        if(index + 1 == sz) return;
        animate(index + 1);
    }}).play()};
    also1();
  };

  const btn = document.querySelector('#go');
  btn.addEventListener('click', function() {
    setTimeout(function() {
      animate(0);
    }, 5000);
  });