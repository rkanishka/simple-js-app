
let pokemonRepository=(function(){
      let pokemonlist=[
      {  
             name:'BALBASAUR',
             height:0.7,
             type:['GRASS','POISON']
      },
      { 
            name:'GOLBAT',      
            height:1.6, 
            type:['FLYING']
      },
      {
            name:'MEOWTH',
            height:0.4,
            type:['NORMAL']
      },
      {     
            name:'RAICHU',
            height:0.8,
            type:['ELECTRIC']
      },
      {      
            name:'NIDORINA',
            height:0.8,
            type:['POISON']
      },
      {
            name:'MACHOKE', 
           height:1.5, 
           type:['FIGHTING']
      }];
      //for( let i=0; i< pokemonlist.length; i++)
      //{ if (pokemonlist[i].height>1.0)
          //  {
          //  document.write("<p>"+"NAME:"+pokemonlist[i].name+"<br>"+ "HEIGHT:"+pokemonlist[i].height+"(wow that's big)"+"<br>"+"TYPE:"+pokemonlist[i].type+"<br>"+"</p>");
          //  }
         //   else
         //  {
          //  document.write("<p>"+"NAME:"+pokemonlist[i].name+"<br>"+"HEIGHT:"+pokemonlist[i].height+"<br>"+"TYPE:"+pokemonlist[i].type+"<br>"+"</p>");
         //  }
      //}
            function getAll() {
            return pokemonlist;
          }
          function add(pokemon) {
            pokemonlist.push(pokemon);
            }   
        function addListItem(pokemon)
        {
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
      
          return {
            getAll: getAll,
            add:add,
           addListItem:addListItem
          };
      })();
      pokemonRepository.getAll().forEach(function(pokemon){
           // document.write("<p>"+"NAME:"+pokemon.name+"<br>"+"HEIGHT:"+pokemon.height+"<br>"+"TYPE:"+pokemon.type+"</p>");
       //});
       pokemonRepository.addListItem(pokemon);
 });