import { GetServerSideProps, NextPage } from 'next'
import ErrorPage from 'next/error'
import Image from 'next/image'
import { Pokemon, PokemonClient } from 'pokenode-ts'
import missingNo from '../public/images/missing-no.webp'

const PokemonPage: NextPage<{ pokemon: Pokemon }> = ({ pokemon }) => {
  if (!pokemon) return <ErrorPage statusCode={404} />

  let src =
    pokemon.sprites.other?.['official-artwork'].front_default ||
    pokemon.sprites.front_default ||
    missingNo
  let alt = `${pokemon.name} artwork`
  return (
    <>
      {/* TODO: Figure out fallback image for this */}

      <Image alt={alt} src={src} width={360} height={360}></Image>
      <h1 className="capitalize dark:text-white">{pokemon.name}</h1>
      <table className=" border-collapse table-auto">
        <tbody>
          <tr className="border-t-2 border-b-2">
            <th scope="row" className="text-end p-2 dark:text-white">
              type
            </th>
            <td className="p-2">
              {pokemon.types.map((type) => {
                return (
                  <span
                    key={type.slot}
                    className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                  >
                    {type.type.name}
                  </span>
                )
              })}
            </td>
          </tr>
          <tr className="border-b-2">
            <th scope="row" className="text-end p-2 dark:text-white">
              height
            </th>
            <td className="p-2 dark:text-white">
              {(pokemon.height / 3.048).toPrecision(2)} ft
            </td>
          </tr>
          <tr className="border-b-2">
            <th scope="row" className="text-end p-2 dark:text-white">
              weight
            </th>
            <td className="p-2 dark:text-white">
              {/* Weight is originally in hectograms */}
              {Math.round(pokemon.weight / 4.536)} lbs
            </td>
          </tr>
          <tr className="border-b-2">
            <th scope="row" className="text-end p-2 dark:text-white">
              abilities
            </th>
            <td className="p-2">
              {pokemon.abilities.map((ability) => {
                return (
                  <span
                    key={ability.slot}
                    className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                  >
                    {ability.ability.name}
                  </span>
                )
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res
}) => {
  try {
    const api = new PokemonClient({
      cacheOptions: { maxAge: 360000, exclude: { query: false } }
    })
    const pokemon = await api.getPokemonByName(params?.pokemon! as string)
    return {
      props: {
        pokemon
      }
    }
  } catch {
    res.statusCode = 404
    return { props: {} }
  }
}

export default PokemonPage
