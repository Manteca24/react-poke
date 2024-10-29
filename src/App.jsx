import React, { useState, useEffect } from 'react';
import  fetchAllPokemon  from './templates/fetchAllPokemon';
import './App.css'

function App() {
  const [search, setSearch] = useState('');
  const [allPokemon, setAllPokemon] = useState([]); 
  const [filteredPokemon, setFilteredPokemon] = useState([]); 
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargamos todos los Pokémon
  useEffect(() => {
    fetchAllPokemon(setLoading, setError, setAllPokemon);
  }, []); // Al iniciar

  // Filtrar a medida que cambie search
  useEffect(() => {
    const filtered = allPokemon.filter(pokemon =>
      pokemon.name.toLowerCase().startsWith(search.toLowerCase())
    );
    setFilteredPokemon(filtered);
  }, [search, allPokemon]); // Se ejecuta cada vez que search u allPokemon cambie

  return (
    <>
      <h1>Buscador de Pokemon</h1>
      <input 
        type="text" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Pikachu"
      />
      {loading && <p>Cargando Pokemon...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <ul className="cards">
          {filteredPokemon.length > 0 ? 
          (filteredPokemon.map((pokemon, index) => (
              <li key={index}>
                <p>{pokemon.name}</p>
                <img src={pokemon.image} alt={pokemon.name} />
              </li>
            ))
          ) : (
            <p>Pokemon no encontrado</p>
              )}
        </ul>
      )}
    </>
  );
}

// pendiente modular Componentes

export default App;