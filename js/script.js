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

for (let i = 0; i < pokemonList.length; i++) {
	
	let current = pokemonList[i];
	let note = "";

	if (current.height >= 0.7) {
		note = " - Wow, that's big!"
	}

	document.write(current.name+" (height: "+current.height+")"+note+"\n");
}