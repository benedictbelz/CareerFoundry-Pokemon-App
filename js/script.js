let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
	let modal = document.querySelector("#modal-container");
	let title = document.querySelector("#modal-container #title");
	let close = document.querySelector("#modal-container #close");
	let height = document.querySelector("#modal-container #height");
	let types = document.querySelector("#modal-container #types");
	let image = document.querySelector("#modal-container #image img");
	let modalIsVisible = false;

	close.addEventListener("click", function() {
		hideModal();
	});

	modal.addEventListener("click", (e) => {
		let target = e.target;
		if (target === modal) {
		  hideModal();
		}
	  });

	window.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && modalIsVisible)
			hideModal();	
	});

	function add(pokemon) {
		pokemonList.push(pokemon);
	}

	function getAll() {
		return pokemonList;
	}

	function hideModal() {
		modal.classList = "";
		modalIsVisible = false;
	}

	function showModal() {
		modal.classList = "is-visible";
		modalIsVisible = true;
	}

	function showDetails(pokemon) {
		loadDetails(pokemon).then(function () {
			showModal();
			title.innerHTML = pokemon.name;
			height.innerHTML = "Height: "+pokemon.height;
			types.innerHTML = "Types: "+pokemon.types;
			image.src = pokemon.imageUrl;
		});
	}

	function addListItem(pokemon) {
		let list = document.querySelector(".pokemon-list");
		let listItem = document.createElement("li");
		let button = document.createElement("button");

		button.innerHTML = pokemon.name;
		button.classList.add("pokemon-button");

		listItem.appendChild(button);
		list.appendChild(listItem);

		button.addEventListener("click", function () {
			showDetails(pokemon);
		});
	}

	function loadList() {
		return fetch(apiUrl)
			.then(function (response) {
				return response.json();
			})
			.then(function (json) {
				json.results.forEach(function (item) {
					let pokemon = {
						name: item.name,
						detailsUrl: item.url,
					};
					add(pokemon);
				});
			})
			.catch(function (e) {
				console.error(e);
			});
	}

	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url)
			.then(function (response) {
				return response.json();
			})
			.then(function (details) {
				item.imageUrl = details.sprites.front_default;
				item.height = details.height;

				let types = "";
				for (let i = 0; i < details.types.length; i++) {
					if (i === 0)
						types = types + details.types[i].type.name;
					else
						types = types + ", " + details.types[i].type.name;
				}

				item.types = types;
			})
			.catch(function (e) {
				console.error(e);
			});
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
	};
})();

pokemonRepository.loadList().then(function () {
	pokemonRepository.getAll().forEach(function (pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
