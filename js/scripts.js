
let pokemonRepository = (function() {
   
    // Array to store Pokemon data
  let pokemonList = [];
   
   // DOM container element for displaying Pokemon details
   let modalContainer = document.querySelector('#modal-container');

   // Function to show details of a Pokemon in a modal
   function showModal(pokemon) {
      
      

       // Create modal element
       let modal = document.createElement('div');
       modal.classList.add('modal');

       // Create close button for modal
       let closeButtonElement = document.createElement('button');
       closeButtonElement.classList.add('modal-close');
       closeButtonElement.innerText = 'Close';
       closeButtonElement.addEventListener('click', hideModal);

       // Create title element for modal
       let nameElement = document.createElement('h1');
       nameElement.innerText = pokemon.name;

       // Create content element for modal
       let heightElement = document.createElement('p');
       heightElement.innerText = 'Height: ' +pokemon.height; 

       // Create image element for modal
       let imageElement = document.createElement("img");
        imageElement.classList.add('modal-img');
        imageElement.style.width = '70%';
        imageElement.src = pokemon.imageUrlFront;  

       modal.appendChild(closeButtonElement);
       modal.appendChild(nameElement);
       modal.appendChild(heightElement);
       modal.appendChild(imageElement);
       modalContainer.innerHTML = ''; 
       modalContainer.appendChild(modal);

       // Add class to container to show modal
       modalContainer.classList.add('is-visible');
   }

   // Function to hide modal
   function hideModal() {
       // Remove class to hide modal
       modalContainer.classList.remove('is-visible');
   }

   // Event listener for closing modal with escape key
   modalContainer.addEventListener('keydown', (e) => {
       if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
           hideModal();
       }
   });

   // Event listener for clicking outside modal to close it
   modalContainer.addEventListener('click', (e) => {
       let target = e.target;
       if (target === modalContainer) {
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