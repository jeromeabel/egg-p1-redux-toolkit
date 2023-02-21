import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  endpoints: (build) => ({
    getPokemons: build.query({
      query() {
        return {
          url: 'pokemon',
          params: {
            limit: 9,
          },
        };
      },
    }),
    getPokemonDetails: build.query({
      query: ({ name }) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonDetailsQuery } = apiSlice;
