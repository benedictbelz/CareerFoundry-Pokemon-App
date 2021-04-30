let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	function add(pokemon) {
		pokemonList.push(pokemon);
	}

	function getAll() {
		return pokemonList;
	}

	function showModal(pokemon) {
		let modalTitle = document.querySelector('.modal-title');
		let pokemonImage = document.querySelector('.pokemon-image');
		let pokemonHeight = document.querySelector('.pokemon-height');
		let pokemonTypes = document.querySelector('.pokemon-types');

		modalTitle.innerHTML = pokemon.name;
		pokemonImage.src = pokemon.imageUrl;
		pokemonHeight.innerHTML = 'Height: ' + pokemon.height;
		pokemonTypes.innerHTML = 'Types: ' + pokemon.types;

		console.error('Hello');
	}

	function showDetails(pokemon) {
		loadDetails(pokemon).then(function () {
			showModal(pokemon);
		});
	}

	function addListItem(pokemon) {
		let list = document.querySelector('#pokemon-list');
		let listItem = document.createElement('li');
		listItem.classList = 'group-list-item';
		let button = document.createElement('button');
		button.classList = 'btn btn-block btn-primary';
		button.setAttribute('data-toggle', 'modal');
		button.setAttribute('data-target', '#pokemon-modal');
		let span = document.createElement('span');
		span.classList = 'sr-only';
		span.innerHTML = 'This button shows ' + pokemon.name;

		button.innerHTML = pokemon.name;

		button.appendChild(span);
		listItem.appendChild(button);
		list.appendChild(listItem);

		button.addEventListener('click', () => {
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

				let types = '';
				for (let i = 0; i < details.types.length; i++) {
					if (i === 0) types = types + details.types[i].type.name;
					else types = types + ', ' + details.types[i].type.name;
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
