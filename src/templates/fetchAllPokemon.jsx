const fetchAllPokemon = async (setLoading, setError, setAllPokemon) => {
    setLoading(true); 
    setError(null); 
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1010');
      const data = await response.json();

      // problema: enseñar las imágenes, solución mapear id y utilizar la url de github
      const pokemonWithImages = data.results.map((pokemon) => {
        // (EJEMPLO) pokemon.url = "https://pokeapi.co/api/v2/pokemon/25/";
        const id = pokemon.url.split('/').slice(-2, -1)[0];
        return {
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
      });

      setAllPokemon(pokemonWithImages); 
    } catch (error) {
      console.error('Error fetching:', error);
      setError('Imposible cargar pokemon. Inténtelo de nuevo más tarde.');
    } finally { // finally es un bloque de código que se ejecuta siempre, haya o no un error
      setLoading(false);
    } 
  };

  export default fetchAllPokemon