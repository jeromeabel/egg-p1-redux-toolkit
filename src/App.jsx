import { useState } from 'react';
import { createApi } from '@reduxjs/toolkit/query/react';

// --------------- API --------------- //

export const api = createApi({
  baseQuery: () => {},
  endpoints: (build) => ({
    getPokemons: build.query({
      async queryFn() {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=9'
        );
        if (response.ok) {
          const data = await response.json();
          return { data };
        } else {
          return { error: 'Something went wrong while fetching Pokemons' };
        }
      },
    }),
    getPokemonDetails: build.query({
      async queryFn({ name }) {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}/`
        );
        if (response.ok) {
          const data = await response.json();
          return { data };
        } else {
          return {
            error: 'Something went wrong while fetching Pokemon details',
          };
        }
      },
    }),
  }),
});

const { useGetPokemonsQuery, useGetPokemonDetailsQuery } = api;

// --------------- APP --------------- //
function App() {
  const [selectedPokemon, selectPokemon] = useState(undefined);

  return (
    <>
      <header>
        <h1>My Pokedex</h1>
      </header>
      <main>
        {selectedPokemon ? (
          <>
            <PokemonDetails pokemonName={selectedPokemon} />
            <button onClick={() => selectPokemon(undefined)}>back</button>
          </>
        ) : (
          <PokemonList onPokemonSelected={selectPokemon} />
        )}
      </main>
    </>
  );
}

export default App;

// --------------- COMPONENTS --------------- //

function PokemonList({ onPokemonSelected }) {
  const { data, isLoading, isError, isSuccess } = useGetPokemonsQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Someting went wrong!</p>;
  }
  if (isSuccess) {
    return (
      <article>
        <h2>Overview</h2>
        <ol start={1}>
          {data.results.map((pokemon) => (
            <li key={pokemon.name}>
              <button onClick={() => onPokemonSelected(pokemon.name)}>
                {pokemon.name}
              </button>
            </li>
          ))}
        </ol>
      </article>
    );
  }
}

const listFormatter = new Intl.ListFormat('en-GB', {
  style: 'short',
  type: 'conjunction',
});
function PokemonDetails({ pokemonName }) {
  const { data, isLoading, isError, isSuccess } = useGetPokemonDetailsQuery({
    name: pokemonName,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Something went wrong!</p>;
  }
  if (isSuccess) {
    return (
      <article>
        <h2>{data.name}</h2>
        <img src={data.sprites.front_default} alt={data.name} />
        <ul>
          <li>id: {data.id}</li>
          <li>height: {data.height}</li>
          <li>weight: {data.weight}</li>
          <li>
            types:
            {listFormatter.format(data.types.map((item) => item.type.name))}
          </li>
        </ul>
      </article>
    );
  }
}
