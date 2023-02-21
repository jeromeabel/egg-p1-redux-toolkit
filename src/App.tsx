import { useState } from 'react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import React from 'react';

// --------------- TS INTERFACES --------------- //

interface PokemonListing {
  count: number;
  results: Array<{ name: string; url: string }>;
}

interface PokemonDetailData {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{ slot: number; type: { name: string; url: string } }>;
  sprites: { front_default: string };
}

// --------------- API --------------- //

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  endpoints: (build) => ({
    getPokemons: build.query<PokemonListing, void>({
      query() {
        return {
          url: 'pokemon',
          params: {
            limit: 9,
          },
        };
      },
    }),
    getPokemonDetails: build.query<PokemonDetailData, { name: string }>({
      query: ({ name }) => `pokemon/${name}`,
    }),
  }),
});

const { useGetPokemonsQuery, useGetPokemonDetailsQuery } = api;

// --------------- APP --------------- //
function App() {
  // useState<string | undefined>(undefined);
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
//: { onPokemonSelected: (name: string) => void;}
function PokemonList({ onPokemonSelected }) {
  const { data, isLoading, isError, isUninitialized } = useGetPokemonsQuery();

  if (isUninitialized || isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Someting went wrong!</p>;
  }
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

const listFormatter = new Intl.ListFormat('en-GB', {
  style: 'short',
  type: 'conjunction',
});

function PokemonDetails({ pokemonName }: { pokemonName: string }) {
  const { data, isLoading, isError, isUninitialized } =
    useGetPokemonDetailsQuery({
      name: pokemonName,
    });

  if (isUninitialized || isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Something went wrong!</p>;
  }
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
