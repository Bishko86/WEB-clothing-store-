 "use strict"
 let list = {
  shoesWomen:{
    name: "Brended women's shoes",
    price: 120,
    size: 37,
    material:"Leather",
    manufacture:"Bishko",
    country:"Ukraine",
    count: 1,
    sum: 120,
    link: "images/women-shoes.gif",
    id: "shoesWomen"
  },
  shoesMan:{
    name: "Brended Men's shoes",
    price: 160,
    size: 37,
    material:"Leather",
    manufacture:"Bishko",
    country:"Ukraine",
    count: 1,
    sum: 160,
    link: "images/shoes.gif",
    id: "shoesMan"
  },
  tShirtLevis: {
    name: "Brended T-Shirt Levise",
    price: 130,
    size:"middle",
    material:"cotton 80%, poliester 20%",
    manufacture:"Levis",
    country:"USA",
    count: 1,
    sum: 130,
    link: "images/t-shirt2.gif",
    id: "tShirtLevis"
  },
  tShirt: {
    name: "Brended T-Shirt",
    price: 99,
    size:"small",
    material:"cotton",
    manufacture:"Bishko",
    country:"Ukraine",
    count: 1,
    sum: 99,
    link: "images/t-shirt3.gif",
    id: "tShirt"
  },
  wallet: {
    name: "Brended wallet",
    price: 75,
    material:"Leather",
    manufacture:"Bishko",
    country:"Ukraine",
    count: 1,
    sum: 75,
    link: "images/wallet.gif" ,
    id: "wallet"
  },
  bag: {
    name: "Brended Bag",
    price: 160,
    material:"Leather",
    manufacture:"Bishko",
    country:"Ukraine",
    count: 1,
    sum: 160,
    link: "images/bag.gif",
    id: "bag"
  },
  shorts: {
    name: "Brended man Shorts",
    price: 89,
    size:28,
    material:"cotton 100%",
    manufacture:"Bishko",
    country:"Ukraine",
    count: 1,
    sum: 89,
    link: "images/shorts.gif",
    id: "shorts"
  },
  tShirtGrey: {
    name: " Fashion T-Shirt",
    price: 79,
    size:"small",
    material:"cotton",
    manufacture:"Bishko",
    country:"Ukraine",
    count: 1,
    sum: 79,
    link: "images/t-shirt3.gif",
    id: "tShirtGrey"
  },
  tShirtStrauss: {
    name: "T-Shirt Levi Strauss",
    price: 199,
    size:"small",
    material:"cotton",
    manufacture:"Bishko",
    country:"Ukraine",
    count: 1,
    sum: 199,
    link: "images/t-shirt1 (2).gif",
    id: "tShirtStrauss"
  }
}
 let value = document.querySelectorAll('a[id^="get"]');

 for (let i = 0;i<value.length;i++){
   value[i].onclick=function(){
    for(let j = 0; j < value.length; j++){
      value[j].style.backgroundColor="#ffffff";
    }
    this.style.backgroundColor="#4ccfc1";
  }
}
let visible = true;
function navBat() {
	if(visible) {
		document.getElementById('drop' ).style.display = 'block';
    visible = false; 
  }

  else {
    document.getElementById('drop' ).style.display = 'none';
    visible = true;       
  }
}

hide.onclick = function() {
	document.getElementById('drop' ).style.display = 'none';

  visible = true;
}


// =================================================

let count = 0;
let widthElem = 0;
document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37:
    left();
    break;
    case 39:
    right();
    break;
  }
}
document.getElementById('left').addEventListener('click', left)
document.getElementById('right').addEventListener('click', right);

function left() {
  let elem = document.querySelector('.banner');
  widthElem += elem.children[count].offsetWidth;
  elem.style.transform = 'translateX('+'-'+ widthElem + 'px)';
  count++;
  if (count>5) {
    widthElem = 0;
    elem.style.transform = 'translateX('+ widthElem + 'px)';
    count = 0;
  }
}

function right() {
  let elem = document.querySelector('.banner');
  count--;
  if (count<0) {
    count++;
  }
  widthElem -= elem.children[count].offsetWidth
  if (widthElem < 0)widthElem = 0;
  elem.style.transform = 'translateX('+'-'+ widthElem + 'px)';   
}

class Basket {
  constructor() {
    this.basket = {};
  }
  addItem(argument, obj1) {
    if(this.basket[argument]!==undefined) {
      this.quantityUnits(argument);
    }
    else {
      Object.defineProperty(this.basket, argument, {
        value: JSON.parse(JSON.stringify(obj1)),
        writable: true,
        enumerable: true,
        configurable: true
      });
    }
    localStorage.setItem(argument, JSON.stringify(this.basket[argument]));
    phoneAdapBasket.innerHTML = localStorage.length;
  }
  quantityUnits(obj1) {
    let objProp = this.basket[obj1];
    objProp.count++;
    objProp.sum = objProp.price * objProp.count;
  }
  reduceUnits(obj) {
    let objProp = this.basket[obj];
    objProp.count--;
    if(objProp.count<1) {
      delete  this.basket[obj];
      localStorage.removeItem(obj);
    }
    objProp.sum = objProp.price * objProp.count;

  }
  deleteItem(obj) {
    delete this.basket[obj];
    localStorage.removeItem(obj);
  }
  totalPrice() {
    let total = 0;
    for(let key in this.basket) {
      total += this.basket[key].sum
    }
    console.log(total + '$');
  }
}

let basket = new Basket(); 

let allBtn = document.querySelectorAll('[class^="btn"]');
// let array = Array.from(allBtn);
for(let elem of allBtn) {
  elem.addEventListener('click', event);
}

let amountItems = document.querySelector('.prise-prod')
amountItems.innerHTML = localStorage.length;
let phoneAdapBasket = document.querySelector('.price-prod');
phoneAdapBasket.innerHTML = localStorage.length;
function event (event) {
  let id = event.target.id;
  let target = event.target;
  if(target.tagName != 'BUTTON')return
  basket.addItem(id, list[id]);
  amountItems.innerHTML = localStorage.length;
}
let infoProd = document.querySelectorAll('.modal-info');
for(let elem of infoProd) {
  elem.addEventListener('click', showModalWindow);
}

function showModalWindow(event) {
  let target = event.target.closest('div');
  if(!target) return;
  if(event.target.tagName == 'BUTTON')return;  
  let modalWindow = document.querySelector('.modal');
  document.body.style.overflow = 'hidden';
  modalWindow.style.display = 'block';
  windowModalValue(event.target, list);
} 

document.querySelector('#close').onclick = function() {
  let modalWindow = document.querySelector('.modal');
  modalWindow.style.display = 'none';
  document.body.style.overflow = '';
}

window.onclick = function(event) {
 let modalWindow = document.querySelector('.modal');
 if (event.target == modalWindow) {
  modalWindow.style.display = "none";
  document.body.style.overflow = '';
  }
}


let propOfList = ['price', 'material', 'size', 'manufacture', 'country'];
let objPropModal; 

function windowModalValue(event, obj) {
  let child;
    if(event.classList.contains('modal-info')) {
    child = event.querySelectorAll('*');
    }
    else {child = event.parentNode.querySelectorAll('*');
    }
  let property = child[child.length-1].getAttribute('id');
  objPropModal = property;
  let title = document.querySelector('.title_prod');
  title.innerHTML = obj[property].name;
  title.classList.add('modal-style-two');
  let image = document.querySelector('.img');
  image.src = obj[property].link;
  let blockInfo = document.querySelector('.prod-info');
  let info = blockInfo.children;
  if(info.length>0) {
    for(let elem of info) elem.innerHTML = '';
  }
let prop;
for( let i = 0;i <= propOfList.length-1;i++) {
  let p = document.createElement('p');
    if(obj[property].hasOwnProperty(propOfList[i])){
    prop = propOfList[i][0].toUpperCase()+propOfList[i].slice(1);
    p.textContent = prop + ' : ' + obj[property][propOfList[i]];
    p.classList.add('modal-style');
    blockInfo.append(p);
    }
  }
}

let modInputBack = document.querySelector('.back', message);
modInputBack.addEventListener('click', message);

function message() {
 alert('In future, here will be form for entering bank account');
}

let modInputToBask = document.querySelector('.toBasket');
modInputToBask.addEventListener('click', func);

function func() {
  basket.addItem(objPropModal, list[objPropModal]);
  showConfirmBlock();
 }
// show confirm window
function showConfirmBlock() {
   let confirmBlok = document.querySelector('.confirm');
   confirmBlok.style.display = 'block';
   let amountProd = document.querySelector('.namOfItem');
   amountProd.innerHTML = 'In your basket ' + localStorage.length + ' goods.';
   let modalWindow = document.querySelector('.modal');
   modalWindow.style.overflow = 'hidden';
}

let confirmBlok = document.querySelector('.confirm');
confirmBlok.addEventListener('click', click);

function click(event) {
  let target = event.target;
    if(target.tagName == 'INPUT'&&
    target.classList.contains("goToBask")){
    document.location.href = 'basket.html'
    }
    if(target.tagName == 'INPUT'&&
    target.classList.contains("shopping")){
    confirmBlok.style.display = 'none';
    let modalWindow = document.querySelector('.modal');
    modalWindow.style.display = 'none';
    }
    if(target.tagName== 'I'&&
    target.classList.contains("fa")) {
    confirmBlok.style.display = 'none';
    }
}

// assign price for product's lables
function assingPrice() {
  let prodBlok = document.querySelectorAll('.item');
  for(let elem of prodBlok){
    let children = elem.querySelectorAll('*');
    let label = children[children.length-1];
    children[3].innerHTML = "$"+ list[label.id].price;
  }
}
assingPrice();