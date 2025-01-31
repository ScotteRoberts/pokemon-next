import type { NextPage } from 'next'
import ErrorPage from 'next/error'
import Link from 'next/link'
import { NamedAPIResourceList, PokemonClient } from 'pokenode-ts'
import { useState } from 'react'

const Home: NextPage<{ pokemons: NamedAPIResourceList }> = (props) => {
  // Filtering Handler
  const [filter, setFilter] = useState('')
  const handleFilterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const { pokemons } = props
  if (pokemons.count === 0) {
    return <ErrorPage statusCode={404} title="Failed to Fetch Pokemon" />
  }
  return (
    <div className="p-4">
      <h1 className="text-center m-2 dark:text-white">Welcome to Pokemon</h1>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search by name"
          value={filter}
          onChange={handleFilterInput}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
        {pokemons?.results
          .filter((pokemonItem) => {
            if (filter) {
              return pokemonItem.name.includes(filter)
            }
            return true
          })
          .map((pokemonItem) => (
            <Link
              key={pokemonItem.url}
              href={pokemonItem.name}
              className="rounded overflow-hidden shadow-md capitalize text-center py-4 bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-rose-400"
            >
              {pokemonItem.name}
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
