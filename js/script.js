let pokemonRepository = (function () {
	let pokemonList = [
		{
			name: "Charmander",
			height: 0.6,
			types: ["fire", "steel"],
		},
		{
			name: "Bulbasaur",
			height: 0.7,
			types: ["grass", "poison"],
		},
		{
			name: "Squirtle",
			height: 0.5,
			types: ["water", "steel"],
		},
		{
			name: "Pikachu",
			height: 0.4,
			types: ["electric", "psychic"],
		},
	];

	function add(pokemon) {
		pokemonList.push(pokemon);
	}

	function getAll() {
		return pokemonList;
	}

	function showDetails(pokemon) {
		console.log(pokemon.name);
	}

	function addListItem(pokemon) {
		let list = document.querySelector(".pokemon-list");
		let listItem = document.createElement("li");
		let button = document.createElement("button");

		button.innerHTML = pokemon.name;
		button.classList.add("pokemon-button");

		listItem.appendChild(button);
		list.appendChild(listItem);

		button.addEventListener("click", function() {
			showDetails(pokemon);
		});
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
	};
})();

pokemonRepository.getAll().forEach(function (e) {
	pokemonRepository.addListItem(e);
});
