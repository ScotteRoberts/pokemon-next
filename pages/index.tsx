import type { NextPage } from 'next'
import ErrorPage from 'next/error'
import Link from 'next/link'
import { NamedAPIResourceList, PokemonClient } from 'pokenode-ts'

const Home: NextPage<{ pokemons?: NamedAPIResourceList }> = (props) => {
  const { pokemons } = props
  if (pokemons?.count === 0) {
    return <ErrorPage statusCode={404} title="Failed to Fetch Pokemon" />
  }
  return (
    <div className="p-4">
      <h1>Welcome to Pokemon</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
        {pokemons?.results.map((pokemonItem) => (
          <Link key={pokemonItem.url} href={pokemonItem.name}>
            <a className="rounded overflow-hidden shadow-lg capitalize text-center py-4">
              {pokemonItem.name}
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

Home.getInitialProps = async () => {
  const api = new PokemonClient({
    cacheOptions: { maxAge: 360000 }
  })
  const pokemons = await api.listPokemons(0, 1100)
  return {
    pokemons
  }
}

export default Home
