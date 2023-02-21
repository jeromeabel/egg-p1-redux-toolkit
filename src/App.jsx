import { useState } from 'react';
import POKEMONS from './data';
import { POKEMONS_DETAILS } from './data';
import { createApi } from '@reduxjs/toolkit/query/react';

function simulateLoading() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

export const api = createApi({
  baseQuery: () => {},
  endpoints: (build) => ({
    getPokemons: build.query({
      // query: () => '/',
      async queryFn() {
        await simulateLoading();
        return { data: POKEMONS };
      },
    }),
    getPokemonDetails: build.query({
      async queryFn() {
        await simulateLoading();
        return { data: POKEMONS_DETAILS };
      },
    }),
  }),
});

const { useGetPokemonsQuery, useGetPokemonDetailsQuery } = api;

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

function PokemonList({ onPokemonSelected }) {
  // const data = POKEMONS;
  const { data, isLoading, isError, isSuccess } = useGetPokemonsQuery();
  console.log(isLoading);
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
  // const data = POKEMONS_DETAILS;

  const { data, isLoading, isError, isSuccess } = useGetPokemonDetailsQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Someting went wrong!</p>;
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
