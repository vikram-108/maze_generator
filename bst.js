


let setsize = document.querySelector('#setsize');
let n , m;
setsize.addEventListener("click" , function(){    
    n = document.querySelector("#sizen").value;
    n -= 0;
    m = document.querySelector("#sizem").value;
    m -= 0;
    console.log(n , m);
    createGrid(n , m);
});

function createGrid(n , m){
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
            k.style.border = "1px solid #252423";
            k.style.justifyContent = "center";
            k.style.alignItems = "center";
            k.style.display = "flex";
            k.style.fontSize= "3rem";
            k.style.fontWeight = "bold";
            k.style.background = "#252423";
            k.className="cell";
        }
    }

    const yo = document.querySelector('.left');
    yo.innerHTML += cont.innerHTML;
    cont.innerHTML = "";
}

let ord = [];



function southeast() {
    for(let i = 0 ; i < n ; i++) {
        for(let j = 0; j < m ; j++) {
            if(i == n - 1 && j == m - 1) continue;
            let choice = Math.ceil(Math.random() * 2);
            //1 -> right
            let flag = false;
            if(choice == 1) {
     ;
                 if(j + 1 < m) {
     ;
                     ord.push([[i , j ] ,[i , j + 1]]);
     ;
                     flag = true;
                     
                }

                if(!flag) {
                    ord.push([[i , j ] ,[i + 1 , j]]);
                }
            }
            else{
                if(i + 1 < n) {
                    ord.push([[i , j ] ,[i + 1, j]]);
                    flag = true;
                }
                if(!flag) {
                    ord.push([[i , j ] ,[i , j + 1]]);
                }
            }
        }
    }

    console.log(ord);
}

function northeast() {
    for(let i = 0 ; i < n ; i++) {
        for(let j = 0; j < m ; j++) {
            if(i == 0 && j == m - 1) continue;
            let choice = Math.ceil(Math.random() * 2);
            //1 -> right
            let flag = false;
            if(choice == 1) {
                if(j + 1 < m) {
                    ord.push([[i , j ] ,[i , j + 1]]);
                    flag = true;
                }

                if(!flag) {
                    ord.push([[i , j ] ,[i - 1 , j]]);
                }
            }
            else{
                if(i - 1 >= 0) {
                    ord.push([[i , j ] ,[i - 1, j]]);
                    flag = true;
                }
                if(!flag) {
                    ord.push([[i , j ] ,[i , j + 1]]);
                }
            }
        }
    }
    console.log(ord);
}

function northwest() {
    for(let i = 0 ; i < n ; i++) {
        for(let j = 0; j < m ; j++) {
            if(i == 0 && j == 0) continue;
            let choice = Math.ceil(Math.random() * 2);
            //1 -> left
            let flag = false;
            if(choice == 1) {
                if(j - 1 >= 0) {
                    ord.push([[i , j ] ,[i , j - 1]]);
                    flag = true;
                }

                if(!flag) {
                    ord.push([[i , j ] ,[i - 1 , j]]);
                }
            }
            else{
                if(i - 1 >= 0) {
                    ord.push([[i , j ] ,[i - 1, j]]);
                    flag = true;
                }
                if(!flag) {
                    ord.push([[i , j ] ,[i , j - 1]]);
                }
            }
        }
    }
    console.log(ord);
}

function southwest() {
    for(let i = 0 ; i < n ; i++) {
        for(let j = 0; j < m ; j++) {
            if(i == n - 1 && j == 0) continue;
            let choice = Math.ceil(Math.random() * 2);
            //1 -> left
            let flag = false;
            if(choice == 1) {
                if(j - 1 >= 0) {
                    ord.push([[i , j ] ,[i , j - 1]]);
                    flag = true;
                }

                if(!flag) {
                    ord.push([[i , j ] ,[i + 1 , j]]);
                }
            }
            else{
                if(i + 1 < n) {
                    ord.push([[i , j ] ,[i + 1, j]]);
                    flag = true;
                }
                if(!flag) {
                    ord.push([[i , j ] ,[i , j - 1]]);
                }
            }
        }
    }
    console.log(ord);
}


function animate(index){
  let sz=ord.length;
  if (index==sz) return;
  let cidc=ord[index][0];
  let parentc;
  parentc=ord[index][1];

  let cid=cidc[0]*m+cidc[1];
  let parent
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
    borbo = "0px solid black ";
  }
  if(direction == 2) { 
    borto = "0px solid black ";
  } 
  if(direction == 3) { 
    borri = "0px solid black ";
  } 
  if(direction == 4) { 
    borlef = "0px solid black ";
  }  

  if(direction == 1) { 
    Pborto = "0px solid black";
  }
  if(direction == 2) { 
    Pborbo = "0px solid black";
  }
  if(direction == 3) { 
    Pborlef = "0px solid black";
  }
  if(direction == 4) { 
    Pborri = "0px solid black";
  }

  let abcd=document.getElementById(`${parent}`);

  var also1 = function () {anime({
    targets : abcd,
    backgroundColor : '#00D672',
    borderBottom : Pborbo,
    borderTop : Pborto,
    borderLeft : Pborlef,
    borderRight : Pborri,
    duration : 10,
    complete: () => {
      myanimation();
    }
  }).play()};

  var myanimation = function () {anime({
    targets: document.getElementById(`${cid}`),
    backgroundColor : '#00D672',
    scale: [
      {value: .1, easing: 'easeOutSine', duration: 10},
      {value: 1, easing: 'easeInOutQuad', duration: 10}
    ],
    borderBottom : borbo,
    borderTop : borto,
    borderLeft : borlef,
    borderRight : borri,
    duration : 5,
    delay : 1,
    complete: ()=> {
      if(index + 1 == sz) return;
      animate(index + 1);
  }}).play()};
  console.log(true);
  also1();
  // myanimation.play();
}

let seb = false;
let neb = false;
let nwb = false;
let swb = false;

let nore = document.querySelector('.northeast');
let soue = document.querySelector('.southeast');
let norw = document.querySelector('.northwest');
let souw = document.querySelector('.southwest');

nore.addEventListener("click" , function() {
    seb = false;
    neb = true;
    nwb = false;
    swb = false;
    nore.style.backgroundColor = "#343434";
    nore.style.border = "2px solid white";
})

soue.addEventListener("click" , function() {
    seb = true;
    neb = false;
    nwb = false;
    swb = false;
    soue.style.backgroundColor = "#343434";
    soue.style.border = "2px solid white";
})

norw.addEventListener("click" , function() {
    seb = false;
    neb = false;
    nwb = true;
    swb = false;
    norw.style.backgroundColor = "#343434";
    norw.style.border = "2px solid white";
})

souw.addEventListener("click" , function() {
    seb = false;
    neb = false;
    nwb = false;
    swb = true;
    souw.style.backgroundColor = "#343434";
    souw.style.border = "2px solid white";
})

const button = document.querySelector("#go");

button.addEventListener("click" , function() {

    if(neb) northeast();
    if(seb) southeast();
    if(swb) southwest();
    if(nwb) northwest();

    setTimeout(function(){
        animate(0);
    } , 5000);
})
