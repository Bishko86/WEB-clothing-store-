"use strict"
// class for manage basket
class ShowBask {
	constructor() {
		this.showBask = {};
		}
	createTable() {
		let table = document.getElementById('table');
		let amount = localStorage.length + 1;
		let input = document.createElement('input');
		for(let i = 0;i <= amount;i++){
			let tr = document.createElement('tr');
			table.append(tr);
			for(let j = 0;j <=7;j++) {
				if(i == 0) {
				let th = document.createElement('th');
				tr.append(th);
				}
				else {
				let td = document.createElement('td');
				td
				tr.append(td);
				}
			}
		}
		input.setAttribute('type', 'button');
		input.setAttribute('value', 'To order');
		input.classList.add('order-input');
		table.after(input);
	}
	assignValueTable() {
	let tableHead = ['<i class="fa fa-trash" aria-hidden="true"></i>', 'Image', 'Name', 'Price', '', 'Amount', '','Sum'];
	let amount = localStorage.length;
	let keys = Object.keys(localStorage);
	let table = document.getElementById('table');
	let count = 1;
	for(let i=0;i<=7;i++) {
				table.rows[0].cells[i].innerHTML = tableHead[i];
				table.rows[0].cells[i].classList.add('empty-basket');
				}	
		for(let key of keys) {
			 let item = JSON.parse(localStorage[key]);
					table.rows[count].cells[0].innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
					table.rows[count].cells[1].innerHTML = '<img src="'+ item.link +'" alt="image" height="50">';
					table.rows[count].cells[2].innerHTML = item.name;
					table.rows[count].cells[2].classList.add('mess-emp-bask');
					table.rows[count].cells[3].innerHTML =  item.price +'$';
					table.rows[count].cells[3].classList.add('mess-emp-bask');
					table.rows[count].cells[4].innerHTML = '<span class="arrow-L">-</span>'
					table.rows[count].cells[5].setAttribute('class', 'countBask')
					table.rows[count].cells[5].classList.add('mess-emp-bask');
					table.rows[count].cells[5].innerHTML = item.count;
					table.rows[count].cells[6].innerHTML = '<span class="arrow-R">+</span>';
					table.rows[count].cells[7].innerHTML = item.sum +'$';
					table.rows[count].cells[7].classList.add('mess-emp-bask');
					table.rows[count].setAttribute('id',item.id)
					count++;
					}
				table.rows[0].cells[0].innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
				table.lastChild.cells[5].innerHTML = 'Total';
				table.lastChild.cells[5].classList.add('empty-basket');
				table.lastChild.cells[6].innerHTML = ':';
				table.lastChild.cells[6].classList.add('empty-basket');
				table.lastChild.cells[7].innerHTML = this.totalSum() + '$';
				table.lastChild.cells[7].classList.add('mess-emp-bask');
			}

	deleteRow() {
	let table = document.getElementById('table');
	let colection = Array.from(table.children);
	let index = colection.indexOf(this.parentNode);
	let id = this.parentNode.getAttribute('id')
	let input = document.querySelector('[type="button"]');
	table.rows[index].remove();
	localStorage.removeItem(id);
	table.lastChild.cells[7].innerHTML = ShowBask.prototype.totalSum() +'$';
	if(localStorage.length == 0) input.remove();
	
	stateLocal(); //audit for state of basket
	}
	increseAmount(event) {
		let target = event.target.closest('tr');
		let table = document.getElementById('table');
		let colection = Array.from(table.children);
		let index = colection.indexOf(target);
		let key = target.getAttribute('id')
		let item = JSON.parse(localStorage[key]);
		item.count++;
		table.rows[index].cells[5].innerHTML = item.count;
		item.sum = item.price * item.count;
		table.rows[index].cells[7].innerHTML = item.sum +'$';
		localStorage.setItem(key, JSON.stringify(item));
		table.lastChild.cells[7].innerHTML = ShowBask.prototype.totalSum() +'$';
		
		}
	reduceAmount(event) {
		let target = event.target.closest('tr');
		let table = document.getElementById('table');
		let colection = Array.from(table.children);
		let index = colection.indexOf(target);
		let key = target.getAttribute('id');
		let item = JSON.parse(localStorage[key]);
		item.count--;
		if (item.count < 1) item.count = 1;
		table.rows[index].cells[5].innerHTML = item.count;
		item.sum = item.price * item.count;
		table.rows[index].cells[7].innerHTML = item.sum +'$';
		localStorage.setItem(key, JSON.stringify(item));
		table.lastChild.cells[7].innerHTML = ShowBask.prototype.totalSum() +'$';
		
		}
	totalSum() {
		let sum = 0;
		for(let key of Object.keys(localStorage)) {
			let item = JSON.parse(localStorage[key]);
			sum += item.sum;
		}
		return sum;
	}
	}

let bask = new ShowBask;
 condition();
//stateLocal(); //audit for state of basket
// open and close menu
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
// close menu

hide.onclick = function() {
	document.getElementById('drop' ).style.display = 'none';
    visible = true;
}


// condition();
function condition(){
	if(localStorage.length>0) {
		bask.createTable();
		bask.assignValueTable();
	}
	else  emptyBasket();
}

//audit for state of basket
function stateLocal() {
if(localStorage.length == 0) emptyBasket();
}
// show empty basket
function emptyBasket() {
	document.querySelector('#table').style.display = 'none';
	let message = document.querySelector('.table-bask');
	let h1 = document.createElement('h1');
	let p = document.createElement('p');
	let img = document.createElement('img');
	h1.textContent = 'Your basket is empty.';
	h1.classList.add('empty-basket')
	p.textContent = 'Please, choose product and add to basket.';
	p.classList.add('mess-emp-bask')
	img.src = 'https://51cube.com.ua/foto/empty-cart.jpg';
	img.width = '300';
	img.alt = 'Empty basket';
	message.append(h1, p, img);
}

let colection =  Array.from(table.children);
for(let i = 1;i<colection.length;i++) {
	colection[i].children[0].addEventListener('click', bask.deleteRow);
}
let increseAmount = document.querySelectorAll('.arrow-R');
for(let elem of increseAmount) {
	elem.addEventListener('click', bask.increseAmount);
}
let reduceAmount = document.querySelectorAll('.arrow-L');
for(let elem of reduceAmount) {
	elem.addEventListener('click', bask.reduceAmount);
}
// code for show modal window

table.addEventListener('click', modal);
function modal(event){
	if (event.target.tagName !='IMG') return null;
	let modalWindow = document.querySelector('.modal');
  document.body.style.overflow = 'hidden';
  modalWindow.style.display = 'block';
  windowModalValue(event.target);
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

function windowModalValue(event) {
	let key = event.closest('tr');
	let infoObj = JSON.parse(localStorage[key.id]);
	let title = document.querySelector('.title_prod');
	title.innerHTML = infoObj.name;
	title.classList.add('modal-style-two');
	let image = document.querySelector('.img');
	image.src = infoObj.link;
	let blockInfo = document.querySelector('.prod-info');
	let info = blockInfo.children;
	if(info.length>0) {
  		for(let elem of info) elem.innerHTML = '';
	}
	let prop;
	for( let i = 0;i <= propOfList.length-1;i++) {
 		 let p = document.createElement('p');
  		if(infoObj.hasOwnProperty(propOfList[i])){
    	prop = propOfList[i][0].toUpperCase()+propOfList[i].slice(1);
    	p.textContent = prop + ' : ' + infoObj[propOfList[i]];
    	p.classList.add('modal-style');
    	blockInfo.append(p);
    	}
  	}
}