const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];
const fruitnIdx = fruit.map((eaFruit,idx) => [eaFruit,idx]);

function lowercase (name) {
	return name.toLowerCase();
}

// event listeners and span elements for all fruits
for (let eaFruit of fruit) {
	const li = document.createElement('li');
	li.style.display = 'none';

	li.setAttribute('data-fruit',eaFruit);
	li.addEventListener('mouseenter',highlight);
	li.addEventListener('mouseleave',regular);
	li.addEventListener('click', useSuggestion);
	suggestions.append(li);

	const lSpan = document.createElement('span');
	lSpan.classList.add('left');
	li.append(lSpan);

	const cSpan = document.createElement('span');
	cSpan.classList.add('center');
	li.append(cSpan);

	const rSpan = document.createElement('span');
	rSpan.classList.add('right');
	li.append(rSpan);
}

// returns all indices from fruit array that matches user input
function search(str) {
	const fruitArrs = fruitnIdx.filter(fruitArr => fruitArr[0].toLowerCase().includes(lowercase(str)));
	const resultsIdx = fruitArrs.map(fruitArr => fruitArr[1]);
	return resultsIdx;
}

// called everytime keyup from user input
function searchHandler(e) {
	const lowercased = lowercase(input.value);
	const lis = document.querySelectorAll('li');
	for (let li of lis) {
		li.style.display = 'none';
		const [left, center, right] = [li.children[0], li.children[1], li.children[2]];
		left.innerText = '';
		center.innerText = '';
		right.innerText = '';
	}
		const resultsIdx = search(lowercased);
		showSuggestions(resultsIdx, input.value);
}

// bolding what matches with input value
function findBold (fruitStyle, inputVal) {
	const idx = lowercase(fruitStyle).indexOf(lowercase(inputVal));
	if (idx !== -1) {
		const fruitArr = [...fruitStyle];
		const lUnbold = fruitArr.reduce((arr,curr, currIdx) => {
			if (currIdx < idx) arr.push(curr);
			return arr;
		},[]);
		// if there is a space within idx and idx + inputVal.length then include space in bold
		const bold = fruitArr.reduce((arr,curr, currIdx) => {
			const spcIdx = fruitStyle.indexOf(' ');
			if (spcIdx > idx && spcIdx <= idx + inputVal.length) {
				if (currIdx >= idx && currIdx < idx + inputVal.length + 1) arr.push(curr);
				return arr;
			}
			else {
				if (currIdx >= idx && currIdx < idx + inputVal.length) arr.push(curr);
				return arr;	
			}
		},[]);
		const rUnbold = fruitArr.reduce((arr,curr, currIdx) => {
			if (currIdx >= idx + inputVal.length) arr.push(curr);
			return arr;
		},[]);
		return [lUnbold.join(''), bold.join(''), rUnbold.join('')];
	}
	else if (idx === -1) {
		return false;
	}
}

// based on search function, relies on each index to display corresponding string, calling findBold to only bold user input value, rest of string has normal font weight
function showSuggestions(resultsIdx, inputVal) {
	if (inputVal.length === 1) {
		for (i=0; i<5; i++) {
			const fruitStr = fruit[resultsIdx[i]];
			const queryStr = `li[data-fruit='${fruitStr}']`;
			const li = document.querySelector(queryStr);
	
			const fruitStyle = fruitStr;
			const findBoldResults = findBold(fruitStyle, inputVal);
			if (!findBoldResults) li.style.display = 'none';
			else {
				const [lUnbold, bold, rUnbold] = findBoldResults;
				const [left, center, right] = [li.children[0], li.children[1], li.children[2]];
				
				left.innerText = lUnbold;
				center.innerText = bold;
				right.innerText = rUnbold;
		
				li.style.display = 'block';	
			}
		}
	}
	else if (inputVal.length > 1) {
		for (let idx of resultsIdx) {
			const fruitStr = fruit[idx];
			const queryStr = `li[data-fruit='${fruitStr}']`;
			const li = document.querySelector(queryStr);
	
			const fruitStyle = fruitStr;
			const findBoldResults = findBold(fruitStyle, inputVal);
			if (!findBoldResults) li.style.display = 'none';
			else {
				const [lUnbold, bold, rUnbold] = findBoldResults;
				const [left, center, right] = [li.children[0], li.children[1], li.children[2]];
				
				left.innerText = lUnbold;
				center.innerText = bold;
				right.innerText = rUnbold;
		
				li.style.display = 'block';	
			}
		}
	}
}

function highlight (e) {
	e.target.classList.toggle('highlight');
}

function regular (e) {
	e.target.classList.toggle('highlight');
}

// clicking on a suggestion
function useSuggestion(e) {
	const lis = document.querySelectorAll('li');
	for (let li of lis) {
		li.style.display = 'none';
	}
	if (e.target.tagName === 'LI') {
		input.value = e.target.textContent;
	}
	else {
		input.value = e.target.parentElement.textContent;
	}
}

input.addEventListener('keyup', searchHandler);