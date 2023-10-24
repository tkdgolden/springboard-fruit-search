const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');
const dropdown = document.querySelector("#dropdown")

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function fruitSearch(str) {
	let results = [];
	str = str.toLowerCase()

	if (str != "") {
		results = fruit.filter((fruit) => {
			fruit = fruit.toLowerCase()
			if (fruit.search(str) != -1) {
				return fruit
			}
		})
	}
	console.log(results)

	return results;
}

function searchHandler(e) {
	console.log(e.keyCode)
	let validKey = ((e.keyCode > 64) && (e.keyCode < 123)) || (e.keyCode == 46) || (e.keyCode == 8)
	console.log(validKey)
	if (validKey) {
		let results = fruitSearch(input.value)
		showSuggestions(results, input.value)
	}
}

function showSuggestions(results, inputVal) {
	dropdown.innerText = ""
	inputVal.toLowerCase()
	let counter = 0
	for (each of results) {
		if (counter < 5) {
			counter ++
			let lowercase = each.toLowerCase()
			let array = lowercase.split(inputVal)
			console.log(array)
			let times = array.length
			let newString = array[0]
			let i = 1
			while (i < array.length) {
				newString += ("<b>" + inputVal + "</b>")
				newString += (array[i])
				i++
			}
			let firstLetter
			if (newString[0] == "<") {
				console.log("<")
				firstLetter = newString.slice(0,3)
				firstLetter += newString[3].toUpperCase()
				firstLetter += newString.slice(4)
			} else {
				firstLetter = newString[0].toUpperCase()
				firstLetter += newString.slice(1)
			}

			console.log("newString= " + firstLetter)
			let newLi = document.createElement("li")
			newLi.innerHTML = firstLetter
			dropdown.append(newLi)
		}
	}
}

function useSuggestion(e) {
	input.value = e.srcElement.innerText
	dropdown.innerText = ""
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);