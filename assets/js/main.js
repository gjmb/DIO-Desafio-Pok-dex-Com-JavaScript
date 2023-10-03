
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById("loadMoreButton");
const limit =8; 
let offset=0;
const maxRecords=151;


function loadPokemonItens(offset, limit){


    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => 
            `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.order}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    
                    <img src="${pokemon.photo}" alt="${pokemon.name}">

                    <ol class="types">
                        ${pokemon.types.map((type) =>  `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                </div>

            </li>
            ` 
        ).join('');
        pokemonList.innerHTML += newHtml;   
    })
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () =>{

    offset+=limit;
    const recordsNextPage = offset + limit;

    if(recordsNextPage >= maxRecords){
        const newLimit = maxRecords - offset;

        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
        
    } else
         loadPokemonItens(offset, limit);
})
    

