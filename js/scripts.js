let pokemonRepository = (function() {
    
    let pokemonList = [];
   
    // DOM container element for displaying Pokemon details
    let modalContainer = document.querySelector('#exampleModal .modal-body');

    // Function to show details of a Pokemon in a modal
    function showModal(pokemon) {
        // Create modal content
        let modalContent = `
            <h1>${pokemon.name}</h1>
            <p>Height: ${pokemon.height}</p>
            <img src="${pokemon.imageUrlFront}" alt="${pokemon.name}" class="modal-img">
        `;

        // Update modal container with content
        modalContainer.innerHTML = modalContent;

        // Show modal using Bootstrap modal functionality
        $('#exampleModal').modal('show');
    }

    // Function to hide modal
    function hideModal() {
        // Hide modal using Bootstrap modal functionality
        $('#exampleModal').modal('hide');
    }

    // Event listener for closing modal with escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && $('#exampleModal').hasClass('show')) {
            hideModal();
        }
    });

    // Function to get all Pokemon
    function getAll() {
        return pokemonList;
    }

    // Function to add Pokemon to repository
    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }

    // Function to add list item for a Pokemon
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        // Add event listener to the button to show modal
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    // Function to show Pokemon details
    function showDetails(pokemon) {
        loadDetails(pokemon)
            .then(function() {
                showModal(pokemon);
            })
            .catch(function(error) {
                console.error("Error loading Pokemon details", error);
            });
    }

    // Function to load Pokemon list from API
    function loadList() {
        return fetch("https://pokeapi.co/api/v2/pokemon")
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                data.results.forEach(function(pokemon) {
                    let pokemonObj = {
                        name: pokemon.name,
                        detailsUrl: pokemon.url
                    };
                    add(pokemonObj);
                });
            })
            .catch(function(error) {
                console.error("Error loading Pokemon list", error);
            });
    }

    // Function to load details of specific Pokemon
    function loadDetails(pokemon) {
        return fetch(pokemon.detailsUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(details) {
                pokemon.imageUrlFront = details.sprites.front_default;
                pokemon.height = details.height;
                // Additional details can be assigned here if needed
            })
            .catch(function(error) {
                console.error("Error loading Pokemon details", error);
            });
    }

    // Return an object with public methods
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

// Load Pokemon list and add list items
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
