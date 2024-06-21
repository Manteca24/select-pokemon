const getPokemonBtn = document.getElementById('get-pokemon');

getPokemonBtn.addEventListener('click', () => {
  const selectedPokemon = document.getElementById('pokemon-select').value;
  fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
    .then(response => response.json())
    .then(data => {
      displayPokemonInfo(data);
    })
    .catch(error => {
      console.error('Error en el fetch');
    });
});

function displayPokemonInfo(pokemon) {
  const container = document.querySelector('.container');
  const pokemonInfo = document.createElement('div');
  pokemonInfo.classList.add('pokemon-info');
  
  const name = document.createElement('h2');
  name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); 
  /*pokemon.name.charAt(0).toUpperCase(): para seleccionar la primera letra del string y hacerla mayúscula. La salida sería la letra.
    pokemon.name.slice(1): concateno con el nombre completo quitándole la primera letra (que sale en minúsculas). 
    La salida completa daría el nombre en mayúsculas. */
  
  const image = document.createElement('img');
  image.src = pokemon.sprites.front_default;
  image.alt = pokemon.name;
  
  const type = document.createElement('p');
  type.textContent = `Type: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}`;
  
  const height = document.createElement('p');
  height.textContent = `Height: ${pokemon.height / 10} m`; // en la documentación dice que la medida está en decímetros (1dm=0,1m)
  
  const weight = document.createElement('p');
  weight.textContent = `Weight: ${pokemon.weight / 10} kg`; // en la documentación dice que el peso está en hectogramos (1hg=0,1kg)

  pokemonInfo.appendChild(name);
  pokemonInfo.appendChild(image);
  pokemonInfo.appendChild(type);
  pokemonInfo.appendChild(height);
  pokemonInfo.appendChild(weight);
  
  // Antes de añadir la info nueva, necesitamos borrar la información antigua, para que no se acumulen en la página 
  const infoAntigua = document.querySelector('.pokemon-info');
  if (infoAntigua) {
    infoAntigua.remove();
  }
  
  // y por último añadimos el div con todo al contenedor 
  container.appendChild(pokemonInfo);
}