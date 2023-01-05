import PokemonStatMeter from 'components/PokemonStatMeter'
import { GetServerSideProps, NextPage } from 'next'
import ErrorPage from 'next/error'
import Image from 'next/image'
import { Pokemon, PokemonClient } from 'pokenode-ts'
import missingNo from 'public/images/missing-no.webp'

const PokemonPage: NextPage<{ pokemon: Pokemon }> = ({ pokemon }) => {
  if (!pokemon) return <ErrorPage statusCode={404} />

  let src =
    pokemon.sprites.other?.['official-artwork'].front_default ||
    pokemon.sprites.front_default ||
    missingNo
  let alt = `${pokemon.name} artwork`
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-4'>
      {/* TODO: Figure out fallback image for this */}

      <section className='flex items-center flex-col'>
        <h1 className="capitalize text-center my-2 text-3xl dark:text-white">{pokemon.name}</h1>

        <Image alt={alt} src={src} width={360} height={360} priority></Image>
      </section>
      <section>
        <h2 className='text-2xl text-center my-2 dark:text-white'>Description</h2>
        <table className="border-collapse table-auto w-full">
          <tbody>
            <tr className="border-t-2 border-b-2">
              <th scope="row" className="text-end p-2 dark:text-white">
                type
              </th>
              <td className="p-2">
                <div>

                  {pokemon.types.map((type) => {
                    return (
                      <span
                        key={type.slot}
                        className="block p-1 dark:text-white"
                      >
                        {type.type.name}
                      </span>
                    )
                  })}
                </div>
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
                      className="block p-1 dark:text-white"
                    >
                      {ability.ability.name}
                    </span>
                  )
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2 className='text-2xl text-center my-2 dark:text-white'>Stats</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className='w-5/12 dark:text-white'>Type</th>
              <th className='w-1/4 dark:text-white'>Base Value</th>
              <th className='w-1/3 dark:text-white'>Meter</th>
            </tr>
          </thead>
          <tbody>
            {pokemon.stats.map(stat => (
              <tr key={stat.stat.url} className="border-b-2">
                <th scope='row' className="text-end p-2 dark:text-white">
                  <span className='dark:text-white'>{stat.stat.name}</span>
                </th>
                <td className="text-end p-2 dark:text-white">
                  <span className='dark:text-white'>{stat.base_stat}</span>
                </td>
                <td className="text-end p-2 dark:text-white">
                  <PokemonStatMeter stat={stat}></PokemonStatMeter>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </div>
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
