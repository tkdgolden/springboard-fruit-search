const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');
const dropdown = document.querySelector("#dropdown")

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

// find matching fruit list
function fruitSearch(str) {
	let results = [];

	// set everything to lowercase before comparing
	str = str.toLowerCase()

	// don't compare an empty string
	if (str != "") {

		// filter fruit array and put valid matches into results array
		results = fruit.filter((fruit) => {
			fruit = fruit.toLowerCase()

			// will return index if found, -1 if not
			if (fruit.search(str) != -1) {
				return fruit
			}
		})
	}

	return results;
}

// called on keyup in input
function searchHandler(e) {

	// all of the keys we want to check(upper and lowercase letters, delete, and backspace buttons) (mainly wanted to ignore the shift key so it wouldn't run twice on a capital letter)
	let validKey = ((e.keyCode > 64) && (e.keyCode < 123)) || (e.keyCode == 46) || (e.keyCode == 8)
	if (validKey) {

		let results = fruitSearch(input.value)
		showSuggestions(results, input.value)
	}
}

// display matching fruit
function showSuggestions(results, inputVal) {

	// refresh the dropdown or else itll just add on rather than update
	dropdown.innerText = ""

	//everything lowercase to compare
	inputVal.toLowerCase()

	// only going to show the top 5
	let counter = 0

	// unfortunately going to iterate through all results even after the counter is past 5... maybe should use a break?
	for (each of results) {
		if (counter < 5) {
			counter ++
			let lowercase = each.toLowerCase()

			// make the result into an array to select out the matching part, surround it in bold tags and combine it all together again
			// I feel like maybe I did this a difficult way and there would be a better way to do it?
			let array = lowercase.split(inputVal)
			let newString = array[0]
			let i = 1
			while (i < array.length) {
				newString += ("<b>" + inputVal + "</b>")
				newString += (array[i])
				i++
			}

			// then I had to go back in and capitalize the first letter... gotta be a better way...?
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

			// create an element and put the result in it and put it on the page
			let newLi = document.createElement("li")
			newLi.innerHTML = firstLetter
			dropdown.append(newLi)
		}
	}
}

// put the selected result in the input, clear the dropdown list
function useSuggestion(e) {
	input.value = e.srcElement.innerText
	dropdown.innerText = ""
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);