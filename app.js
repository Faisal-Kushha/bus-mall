'use strict';

function randomIndex() {
    return Math.floor(Math.random() * Bus.arr.length);
}

let sectionElement = document.getElementById('one');
let buttonElement = document.getElementById('button');
let leftImageElement = document.getElementById('left');
let centerImageElement = document.getElementById('center');
let rightImageElement = document.getElementById('right');

let maxAttempts = 25;
let counter = 0;
let arrOfObjects = [];
let arrOfvotes = [];
let arrOfshown = [];

function Bus(name, source) {
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.shown = 0;
    Bus.arr.push(this);
    arrOfObjects.push(this.name);


}
Bus.arr = [];

new Bus('Bag', 'bag.jpg');
new Bus('Banana', 'banana.jpg');
new Bus('Bathroom', 'bathroom.jpg');
new Bus('Boots', 'boots.jpg');
new Bus('Breakfast', 'breakfast.jpg');
new Bus('Bubblegum', 'bubblegum.jpg');
new Bus('Chair', 'chair.jpg');
new Bus('Cthulhu', 'cthulhu.jpg');
new Bus('Dog-duck', 'dog-duck.jpg');
new Bus('Dragon', 'dragon.jpg');
new Bus('Pet-sweep', 'pet-sweep.jpg');
new Bus('Pen', 'pen.jpg');
new Bus('Scissors', 'scissors.jpg');
new Bus('Shark', 'shark.jpg');
new Bus('Sweep', 'sweep.png');
new Bus('Tauntaun', 'tauntaun.jpg');
new Bus('Unicorn', 'unicorn.jpg');
new Bus('Water-can', 'water-can.jpg');
new Bus('Wine-glass', 'wine-glass.jpg');


let leftIndex;
let centerIndex;
let rightIndex;
let arrNew = [];


function renderThreeImages() {
    leftIndex = randomIndex();
    centerIndex = randomIndex();
    rightIndex = randomIndex();



    while (leftIndex === centerIndex || leftIndex === rightIndex || centerIndex === rightIndex || arrNew.includes(leftIndex) || arrNew.includes(centerIndex) || arrNew.includes(rightIndex)) {
        leftIndex = randomIndex();
        centerIndex = randomIndex();
        rightIndex = randomIndex();
    }
    console.log(arrNew);
    arrNew = [];
    arrNew.push(leftIndex, centerIndex, rightIndex)

    leftImageElement.src = Bus.arr[leftIndex].source;
    centerImageElement.src = Bus.arr[centerIndex].source;
    rightImageElement.src = Bus.arr[rightIndex].source;

}

renderThreeImages();



sectionElement.addEventListener('click', handleClick);

function handleClick(event) {
    counter++;

    if (maxAttempts >= counter) {
        if (event.target.id === 'left') {
            Bus.arr[leftIndex].votes++;

        } else if (event.target.id === 'center') {
            Bus.arr[centerIndex].votes++;


        } else if (event.target.id === 'right') {
            Bus.arr[rightIndex].votes++;

        } else {
            counter--;
            return
        }

        Bus.arr[leftIndex].shown++;
        Bus.arr[centerIndex].shown++;
        Bus.arr[rightIndex].shown++;

        renderThreeImages();


    } else {

        buttonElement.addEventListener('click', handlebutton);
        sectionElement.removeEventListener('click', handleClick);
    }
}

function save(){
   
    let conArr = JSON.stringify(Bus.arr);
    localStorage.setItem ("Bus", conArr);
}

function load(){
    let data = localStorage.getItem ("Bus");
    let  parseData = JSON.parse(data)
    if (parseData){
        
        Bus.arr = parseData;
    }
}
load();

function handlebutton(event) {
    renderList();
    charts();
    buttonElement.removeEventListener('click', handlebutton);
    save();

          
    

}


function renderList() {

    let ul = document.getElementById('unList');
    for (let x = 0; x < Bus.arr.length; x++) {
        arrOfvotes.push(Bus.arr[x].votes);
        arrOfshown.push(Bus.arr[x].shown);
        let li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = `${Bus.arr[x].name} had ${Bus.arr[x].votes} votes, and was seen ${Bus.arr[x].shown} times.`

    }
}


function charts() {
    let ctx = document.getElementById('myChart');

    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: arrOfObjects,
            datasets: [{
                label: '# of Votes',
                data: arrOfvotes,
                backgroundColor: [
                    'rgb(8, 8, 238)',

                ],
                borderColor: [
                    'rgb(8, 8, 238)',

                ],
                borderWidth: .75
            }, {
                label: '# of shown',
                data: arrOfshown,
                backgroundColor: [
                    'rgb(250, 167, 14)',

                ],
            }
            ]
        },

    });
}



