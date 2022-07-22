import { GetServerSideProps, NextPage } from 'next'
import { PokemonClient, Pokemon } from 'pokenode-ts'
import ErrorPage from 'next/error'
import Image from 'next/image'

const PokemonPage: NextPage<{ pokemon?: Pokemon }> = (props) => {
  const { pokemon } = props
  if (!pokemon) return <ErrorPage statusCode={404} />
  return (
    <>
      {/* TODO: Figure out fallback image for this */}

      <Image
        alt={`${pokemon.name} official artwork`}
        src={pokemon.sprites.other['official-artwork'].front_default!}
        width={360}
        height={360}
      ></Image>
      <h1 className="capitalize">{pokemon.name}</h1>
      <table className=" border-collapse table-auto">
        <tbody>
          <tr className="border-t-2 border-b-2">
            <th scope="row" className="text-end p-2">
              type
            </th>
            <td className="p-2">
              {pokemon.types.map((type) => {
                return (
                  <button
                    key={type.slot}
                    className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                  >
                    {type.type.name}
                  </button>
                )
              })}
            </td>
          </tr>
          <tr className="border-b-2">
            <th scope="row" className="text-end p-2">
              height
            </th>
            <td className="p-2">{pokemon.height}</td>
          </tr>
          <tr className="border-b-2">
            <th scope="row" className="text-end p-2">
              weight
            </th>
            <td className="p-2">{pokemon.weight}</td>
          </tr>
          <tr className="border-b-2">
            <th scope="row" className="text-end p-2">
              abilities
            </th>
            <td className="p-2">
              {pokemon.abilities.map((ability) => {
                return (
                  <button
                    key={ability.slot}
                    className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                  >
                    {ability.ability.name}
                  </button>
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
    const api = new PokemonClient()
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
