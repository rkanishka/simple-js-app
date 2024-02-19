
let pokemonRepository = (function() {
   // Array to store Pokemon data
  
   let pokemonList = [];
   
   // DOM container element for displaying Pokemon details
   let pokemonContainer = document.querySelector('#pokemon-container');

   // Function to show details of a Pokemon in a modal
   function showModal(name, height, image) {
      
      // Clear previous content in container
       pokemonContainer.innerHTML = '';

       // Create modal element
       let modal = document.createElement('div');
       modal.classList.add('modal');

       // Create close button for modal
       let closeButtonElement = document.createElement('button');
       closeButtonElement.classList.add('modal-close');
       closeButtonElement.innerText = 'Close';
       closeButtonElement.addEventListener('click', hideModal);

       // Create title element for modal
       let titleElement = document.createElement('h1');
       titleElement.innerText = name;

       // Create content element for modal
       let contentElement = document.createElement('p');
       contentElement.innerText = 'Height: ' + height; 

       // Create image element for modal
       let imageElement = document.createElement("img");
       imageElement.setAttribute("src", image);
       imageElement.setAttribute("width", "304");
       imageElement.setAttribute("height", "228");
       imageElement.setAttribute("alt", "Pokemon image");

       // Append elements to modal
       modal.appendChild(closeButtonElement);
       modal.appendChild(titleElement);
       modal.appendChild(contentElement);
       modal.appendChild(imageElement);
       pokemonContainer.appendChild(modal);

       // Add class to container to show modal
       modalContainer.classList.add('is-visible');
   }

   // Function to hide modal
   function hideModal() {
       // Remove class to hide modal
       pokemonContainer.classList.remove('is-visible');
   }

   // Event listener for closing modal with escape key
   window.addEventListener('keydown', (e) => {
       if (e.key === 'Escape' && pokemonContainer.classList.contains('is-visible')) {
           hideModal();
       }
   });

   // Event listener for clicking outside modal to close it
   pokemonContainer.addEventListener('click', (e) => {
       let target = e.target;
       if (target === pokemonContainer) {
           hideModal();
       }
   });

   // Function to get all Pokemon
   function getAll() {
       return pokemonList;
   }

   // Function to add Pokemon to repository
   function add(pokemon) {
       pokemonList.push(pokemon);
   }

   // Function to add list item for a Pokemon
   function addListItem(pokemon) {
       let pokemonList = document.querySelector(".pokemon-list");
       let listPokemon = document.createElement("li");
       let button = document.createElement("button");
       button.innerText = pokemon.name;
       button.classList.add("button-class");
       listPokemon.appendChild(button);
       pokemonList.appendChild(listPokemon);
       button.addEventListener('click', function() {
           showDetails(pokemon);
       });
   }

   // Function to show Pokemon details
   function showDetails(pokemon) {
       loadDetails(pokemon)
           .then(function() {
               showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
           })
           .catch(function(error) {
               console.error("Error loading Pokemon details", error);
           });
   }

   // Function to load Pokemon list from API
   function loadList() {
       return fetch('https://pokeapi.co/api/v2/pokemon/')
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
       return fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon.name)
           .then(function(response) {
               return response.json();
           })
           .then(function(details) {
               pokemon.imageUrl = details.sprites.front_default;
               pokemon.height = details.height;
               pokemon.types = details.types;
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