
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
var maze;
var visited;
function createGrid(n , m){
     maze =  Array(n);
     visited= Array(n);
    for (var i = 0; i < maze.length; i++) {
    maze[i] =  Array(m);
    visited[i]= Array(m);
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

    // document.getElementById(`${n * m - 1}`).style.borderRight = "";
    // document.getElementById(`${n * m - 1}`).style.borderBottom = "";
}
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

let ord=[];


function dfs (row, col, direction , parent) {
  if (visited[row][col]==1){ 
    return;
  }
  ord.push([row , col , 1 , direction, parent]);
  visited[row][col]=1;
    let arr=[1,2,3,4];
    arr=shuffle(arr);
    for (let i of arr) {
      if (i == 1 && row > 0) dfs(row-1 , col , 1 , row * m + col);
      if (i == 2 && row < n-1) dfs(row+1 , col , 2 , row * m + col);
      if (i == 3 && col > 0) dfs(row , col-1 , 3 , row * m + col);
      if (i == 4 && col < m-1) dfs(row , col+1 , 4 , row * m + col);
    }
    ord.push([row , col , -1]);
  }

// dfs(0,0,2,0);

function animate(index , cid , type , direction , parent) {
  let sz = ord.length;
  if(index == sz) return;
  if(type == -1)  
  {
    let borlef = document.getElementById(`${cid}`).style.borderLeftColor;
    let borri = document.getElementById(`${cid}`).style.borderRightColor;
    let borto = document.getElementById(`${cid}`).style.borderTopColor;
    let borbo = document.getElementById(`${cid}`).style.borderBottomColor;
    console.log(borlef , borri , borbo , borto);
    if(borlef == "rgb(0, 214, 114)") 
      document.getElementById(`${cid}`).style.borderLeft = "1px solid rgb(60,255,236)";
    if(borri == "rgb(0, 214, 114)") 
      document.getElementById(`${cid}`).style.borderRight = "1px solid rgb(60,255,236)";
    if(borbo == "rgb(0, 214, 114)") 
      document.getElementById(`${cid}`).style.borderBottom = "1px solid rgb(60,255,236)";
    if(borto == "rgb(0, 214, 114)") 
      document.getElementById(`${cid}`).style.borderTop = "1px solid rgb(60,255,236)";

      console.log(borlef , borri , borbo , borto);

    anime({
    targets: document.getElementById(`${cid}`),
    backgroundColor : `${type == 1 ? 'rgb(0 , 214 ,114)' : 'rgb(60,255,236)'}`,
    scale: [
      {value: .1, easing: 'easeOutSine', duration: 10},
      {value: 1, easing: 'easeInOutQuad', duration: 10}
    ],
    duration : 10,
    complete: ()=> {
      if(index + 1 == sz) return;
      animate(index + 1 , ord[index + 1][0] * m + ord[index + 1][1] , ord[index + 1][2] , ord[index + 1][3]
        ,ord[index + 1][4]);
    }});
    return;
  }

  let borlef = document.getElementById(`${cid}`).style.borderLeft;
  let borri = document.getElementById(`${cid}`).style.borderRight;
  let borto = document.getElementById(`${cid}`).style.borderTop;
  let borbo = document.getElementById(`${cid}`).style.borderBottom;

  let Pborlef = document.getElementById(`${parent}`).style.borderLeft;
  let Pborri = document.getElementById(`${parent}`).style.borderRight;
  let Pborto = document.getElementById(`${parent}`).style.borderTop;
  let Pborbo = document.getElementById(`${parent}`).style.borderBottom;

  if(direction == 1) { borbo = "1px solid rgb(0 , 214 ,114)";} 
  if(direction == 2) { borto = "1px solid rgb(0 , 214 ,114)" ;} 
  if(direction == 3) { borri = "1px solid rgb(0 , 214 ,114)" ;} 
  if(direction == 4) { borlef = "1px solid rgb(0 , 214 ,114)";} 
  
  if(direction == 1) { Pborto = "1px solid rgb(0 , 214 ,114)";} 
  if(direction == 2) { Pborbo = "1px solid rgb(0 , 214 ,114)" ;} 
  if(direction == 3) { Pborlef = "1px solid rgb(0 , 214 ,114)" ;} 
  if(direction == 4) { Pborri = "1px solid rgb(0 , 214 ,114)";} 

  // console.log(direction , cid , parent);
  // console.log(borto , borbo , borlef , borri);
  var also1 = anime({
    targets : document.getElementById(`${parent}`),
    borderBottom : Pborbo,
    borderTop : Pborto,
    borderLeft : Pborlef,
    borderRight : Pborri,
    duration : 10,
  });

  var myanimation = anime({
    targets: document.getElementById(`${cid}`),
    backgroundColor : `${type == 1 ? 'rgb(0 , 214 ,114)' : 'rgb(60,255,236)'}`,
    scale: [
      {value: .1, easing: 'easeOutSine', duration: 10},
      {value: 1, easing: 'easeInOutQuad', duration: 10}
    ],
    borderBottom : borbo,
    borderTop : borto,
    borderLeft : borlef,
    borderRight : borri,
    duration : 10,
    delay : 1,
    complete: ()=> {
      if(index + 1 == sz) return;
      animate(index + 1 , ord[index + 1][0] * m + ord[index + 1][1] , ord[index + 1][2] , ord[index + 1][3]
        ,ord[index + 1][4]);
  }});

  also1.play();
  myanimation.play();
}

const staggersAnimation = anime.timeline({
  targets: '.cell',
  easing: 'easeInOutSine',
  delay: anime.stagger(50),
  loop: false,
  autoplay: false
})
.add({
  translateX: [
    {value: anime.stagger('-.1rem', {grid : [n , m], from: 'center', axis: 'x'}) },
    {value: anime.stagger('.1rem', {grid : [n , m], from: 'center', axis: 'x'}) }
  ],
  translateY: [
    {value: anime.stagger('-.1rem', {grid : [n , m], from: 'center', axis: 'y'}) },
    {value: anime.stagger('.1rem', {grid : [n , m], from: 'center', axis: 'y'}) }
  ],
  duration: 1000,
  scale: .5,
  delay: anime.stagger(100, {grid : [n , m], from: 'center'})
})
.add({
  scaleY: 1,
  scale: 1,
  translateX : 0,
  translateY : 0,
  rotate : 0,
  delay: anime.stagger(20, {grid : [n , m], from: 'center'}),
  complete : () => {
    animate(0 , ord[0][0] * m + ord[0][1] , 1 , ord[0][3] , ord[0][4]);
  }
})





// const yo = document.querySelector('.left');
// yo.innerHTML += cont.innerHTML;
// cont.innerHTML = "";


function clickHandler(event) {
  staggersAnimation.play();
}

const btn = document.querySelector('#go');
btn.addEventListener('click', function() {
  dfs(0 , 0 , 2 , 0);
  setTimeout(function() {
    animate(0 , ord[0][0] * m + ord[0][1] , 1 , ord[0][3] , ord[0][4]);
  }, 5000);
});