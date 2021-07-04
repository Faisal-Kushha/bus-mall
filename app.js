'use strict';

function randomIndex(){
    return Math.floor(Math.random() * Bus.arr.length);
}

let sectionElement = document.getElementById('one');
let leftImageElement = document.getElementById('left');
let centerImageElement = document.getElementById('center');
let rightImageElement = document.getElementById('right');

let maxAttempts = 25;
let counter = 0;

function Bus(name, source){
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.shown = 0;
    Bus.arr.push(this);

}
Bus.arr = [];

new Bus('Bag','bag.jpg');
new Bus('Banana','banana.jpg');
new Bus('Bathroom','bathroom.jpg');
new Bus('Boots','boots.jpg');
new Bus('Breakfast','breakfast.jpg');
new Bus('Bubblegum','bubblegum.jpg');
new Bus('Chair','chair.jpg');
new Bus('Cthulhu','cthulhu.jpg');
new Bus('Dog-duck','dog-duck.jpg');
new Bus('Dragon','dragon.jpg');
new Bus('Pet-sweep','pet-sweep.jpg');
new Bus('Pen','pen.jpg');
new Bus('Scissors','scissors.jpg');
new Bus('Shark','shark.jpg');
new Bus('Sweep','sweep.png');
new Bus('Tauntaun','tauntaun.jpg');
new Bus('Unicorn','unicorn.jpg');
new Bus('Water-can','water-can.jpg');
new Bus('Wine-glass','wine-glass.jpg');


let leftIndex;
let centerIndex;
let rightIndex;
 function renderThreeImages(){
     leftIndex = randomIndex();
     centerIndex = randomIndex();
     rightIndex = randomIndex();

     

     while (leftIndex === centerIndex || leftIndex === rightIndex || centerIndex === rightIndex){
        leftIndex = randomIndex();
        centerIndex = randomIndex();
     }

     leftImageElement.src = Bus.arr[leftIndex].source;
     centerImageElement.src = Bus.arr[centerIndex].source;
     rightImageElement.src = Bus.arr[rightIndex].source;
    }
 

 renderThreeImages();

 sectionElement.addEventListener('click', handleClick);

 function handleClick(event){
     counter ++

     if(maxAttempts >= counter){
         if(event.target.id === 'left'){
             Bus.arr[leftIndex].votes++;
           
         }else if (event.target.id === 'center'){
            Bus.arr[centerIndex].votes++;
          
     }else if (event.target.id === 'right'){
        Bus.arr[rightIndex].votes++;
    
     }
     Bus.arr[leftIndex].shown++;
     Bus.arr[centerIndex].shown++;
     Bus.arr[rightIndex].shown++;
  

    renderThreeImages();

        }else{

     renderList();
     
 }
}


function renderList(){
    let newBus = document.getElementById('button');
    newBus.addEventListener('click', handlebutton);
    function handlebutton(event){

    let ul = document.getElementById('unList');
    for(let x = 0 ; x < Bus.arr.length; x++){
        let li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = `${Bus.arr[x].name} had ${Bus.arr[x].votes} votes, and was seen ${Bus.arr[x].shown} times.` 
    }
    newBus.removeEventListener('click', handlebutton);
}
    sectionElement.removeEventListener('click',handleClick);
}

