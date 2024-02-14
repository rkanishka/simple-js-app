

let pokemonRepository=(function(){
   //ARRAY TO STORE POKEMON DATA
   let pokemonlist=[];
    //DOM CONTAINER ELEMENT FOR DISPLAYING POKEMON DETAILS
   let pokemonContainer=document.querySelector('#pokemon-container');
    
   //FUNCTION TO SHOW DETAILS OF A POKEMON IN A MODAL
   function showModal(name,height,image){
      //CLEAR PREVIOUS CONTENT IN CONTAINER
      pokemonContainer.innerHTML='';
       
      //CREATE MODAL ELEMENT
      let modal=document.createElement('div');
      modal.classList.add('modal');
       
      
      //CREATE CLOSE BUTTON FOR MODAL
      let closeButtonElement=document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText='close';
      closeButtonElement.addEventListener('click',hideModal);
       
       //CREATE TITILE ELEMENT FOR MODAL
      let titleElement=document.createElement('h1');
      titleElement.innerText=name;
        
      //CREATE CONTENT ELEMENT FOR MODAL
       let contentElement =document.createElement('p');
       contentElement.innerText=height;
      
       //CRAETE IMAGE ELEMENT FOR MODAL
       let imageElement=document.createElement("img");
       imageElement.setAttribute("src",image);
       imageElement.setAttribute("width","304");
       imageElement.setAttribute("height","228");
       imageElement.setAttribute("alt","pokemon image");
      
       //APPEND ELEMENTS TO MODAL
       modal.appendChild(closeButtonElement);
       modal.appendChild(titleElement);
       modal.appendChild(contentElement);
       modal.appendChild(imageElement);
       pokemonContainer.appendChild(modal);
        
       //APPEND MODAL TO CONTAINER
       pokemonContainer.classList.add('is-visible');
   }
    
   //FUNCTION TO HIDE MODAL
   function hideModal(){
      //REMOVE CLASS TO HIDE MODAL
      pokemonContainer.classList.remove('is-visible');
   }
     
    //EVENT LISTENER FOR CLOSING MODAL WITH ESCAPE KEY
     window.addEventListener('keydown',(e)=>{
      if(e.key==='Escape'&& pokemonContainer.classList.contains('is-visible')){
         hideModal();
      }
       });

       //EVENT LISTENER FOR CLICKING OUTSIDE MODAL TO CLOSE IT
       pokemonContainer.addEventListener('click',(e) =>{
         let target=e.target;
         if(target === pokemonContainer){
            hideModal();
         }
       });

     //FUNCTION TO GET ALL POKEMON
   function getAll() {
    return pokemonlist;
       }

    //FUNCTION TO ADD POKEMON TO REPOSITORY
   function add(pokemon) {
     pokemonlist.push(pokemon);
          }  
          
    //FUNCTION TO ADD LIST ITEM FOR A POKEMON      
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

    //FUNCTION TO SHOW POKEMON DETAILS
   function showDetails(pokemon){
      //LOAD DEATILS TO A SELECTED POKEMON
      loadDetails(pokemon).then(function () {
         //DISPLAY MODAL WITH POKEMON LIST
         showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
     }).catch(function (error) {
         console.error("Error loading Pokemon details", error);
     });
 }


   //FUNCTION TO LOAD POKEMON LIST FROM API
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
     //FUNCTION TO LOAD DEATAILS OF SPECIFIC POKEMON 
   function loadDetails(pokemon){
       return(fetch('https://pokeapi.co/api/v2/pokemon/'+pokemon.name))  
      .then(function(response){
      return response.json();
      })
      .then(function(details){
         pokemon.imageUrl=details.sprites.front_default;
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
