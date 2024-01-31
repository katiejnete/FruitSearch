const input = document.querySelector("#fruit");
const suggestions = document.querySelector(".suggestions ul");

const fruit = [
  "Apple",
  "Apricot",
  "Avocado 🥑",
  "Banana",
  "Bilberry",
  "Blackberry",
  "Blackcurrant",
  "Blueberry",
  "Boysenberry",
  "Currant",
  "Cherry",
  "Coconut",
  "Cranberry",
  "Cucumber",
  "Custard apple",
  "Damson",
  "Date",
  "Dragonfruit",
  "Durian",
  "Elderberry",
  "Feijoa",
  "Fig",
  "Gooseberry",
  "Grape",
  "Raisin",
  "Grapefruit",
  "Guava",
  "Honeyberry",
  "Huckleberry",
  "Jabuticaba",
  "Jackfruit",
  "Jambul",
  "Juniper berry",
  "Kiwifruit",
  "Kumquat",
  "Lemon",
  "Lime",
  "Loquat",
  "Longan",
  "Lychee",
  "Mango",
  "Mangosteen",
  "Marionberry",
  "Melon",
  "Cantaloupe",
  "Honeydew",
  "Watermelon",
  "Miracle fruit",
  "Mulberry",
  "Nectarine",
  "Nance",
  "Olive",
  "Orange",
  "Clementine",
  "Mandarine",
  "Tangerine",
  "Papaya",
  "Passionfruit",
  "Peach",
  "Pear",
  "Persimmon",
  "Plantain",
  "Plum",
  "Pineapple",
  "Pomegranate",
  "Pomelo",
  "Quince",
  "Raspberry",
  "Salmonberry",
  "Rambutan",
  "Redcurrant",
  "Salak",
  "Satsuma",
  "Soursop",
  "Star fruit",
  "Strawberry",
  "Tamarillo",
  "Tamarind",
  "Yuzu",
];

function search(str) {
  let results = [];
  results = fruit.filter((eaFruit) =>
    eaFruit.toLowerCase().includes(str.toLowerCase())
  );
  return results;
}

function searchHandler(e) {
  const inputVal = e.target.value;
  const results = search(inputVal);
  showSuggestions(results, inputVal);
}

function removeLis() {
  while (suggestions.firstChild) {
    suggestions.removeChild(suggestions.firstChild);
  }
}

function findBold(item, inputVal) {
  const idx1 = item.toLowerCase().indexOf(inputVal.toLowerCase());
  let idx2 = idx1 + inputVal.length + 1;
  if (!item.slice(idx1, idx2).includes(" ")) {
    idx2--;
  }
  const bold = item.slice(idx1, idx2);
  const unbold = [item.slice(0, idx1), item.slice(idx2)];
  return [unbold, bold];
}

function createBold(showAll, results, inputVal) {
  let length;
  removeLis();
  if (showAll) {
    length = results.length;
  } else {
    length = 5;
  }
  for (i = 0; i < length; i++) {
    const item = results[i];
    const li = document.createElement("li");
    const outerSpan1 = document.createElement("span");
    li.append(outerSpan1);
    const boldResults = findBold(item, inputVal);
    outerSpan1.innerText = boldResults[0][0];
    const innerSpan = document.createElement("span");
    innerSpan.innerText = boldResults[1];
    innerSpan.classList.add("bold");
    outerSpan1.append(innerSpan);
    const outerSpan2 = document.createElement("span");
    outerSpan2.innerText = boldResults[0][1];
    li.append(outerSpan2);
    suggestions.append(li);
  }
}

function showSuggestions(results, inputVal) {
  if (inputVal.length === 0) {
    removeLis();
    return;
  }
  if (inputVal.length > 1) {
    createBold(true, results, inputVal);
  } else {
    createBold(false, results, inputVal);
  }
}

function useSuggestion(e) {
  removeLis();
  input.value = e.target.innerText;
}

input.addEventListener("keyup", searchHandler);
suggestions.addEventListener("click", useSuggestion);
