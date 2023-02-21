import { useGetPokemonsQuery } from '../app/apiSlice';

const PokemonList = ({ onPokemonSelected }) => {
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
};

export default PokemonList;
