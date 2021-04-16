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

	return {
		add: add,
		getAll: getAll
	};

})();

pokemonRepository.getAll().forEach(function(e) {
	
	let note = "";

	if (e.height >= 0.7) {
		note = " - Wow, that's big!"
	}

	document.write(e.name+" (height: "+e.height+")"+note+"\n");

});