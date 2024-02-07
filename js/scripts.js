
let pokemonRepository=(function(){
      let pokemonlist=[];
      
      function getAll() {
       return pokemonlist;
          }


      function add(pokemon) {
        pokemonlist.push(pokemon);
             }  
             
             
      function addListItem(pokemon){
        let pokemonList=document.querySelector(".pokemon-list"); 
        let listPokemon=document.createElement("li");
        let button=document.createElement("button");
        button.innerText=pokemon.name;
        button.classList.add("button-class");
        listPokemon.appendChild(button);
         pokemonList.appendChild(listPokemon);
            button.addEventListener('click',function(){
            showDetails(pokemon);
           });
             }


      function showDetails(pokemon){
        console.log(pokemon);
             }


      function loadList(){
        return(fetch('https://pokeapi.co/api/v2/pokemon/'))
        .then(function(response){
            return response.json();
        })
        .then(function(data){
         data.results.forEach(function(pokemon){
        
            let pokemonobj={
             name:pokemon.name,
             detailsUrl:pokemon.url
          };
             add(pokemonobj);
        });
      })
      .catch(function(error) {
            console.error("Error loading Pokemon list", error);
        });
}
         
      function loadDetails(pokemon){
          return(fetch('https://pokeapi.co/api/v2/pokemon/'))  
         .then(function(response){
         return response.json();
         })
         .then(function(details){
            pokemon.imageUrl=details.spirites.front_default;
            pokemon.height=details.height;
            pokemon.types=details.types;
         })
         .catch(function(error) {
            console.error("Error loading Pokemon list", error);
        });
      
        }
         return {
            getAll: getAll,
            add: add,
           addListItem: addListItem,
           loadList: loadList,
           loadDetails: loadDetails
          };
      })();

      
      pokemonRepository.loadList().then(function() {
      pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
       
 });
});
