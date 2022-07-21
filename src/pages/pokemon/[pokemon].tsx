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
      <pre>
        <code>{JSON.stringify(props.pokemon, null, 2)}</code>
      </pre>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  try {
    const api = new PokemonClient()
    const pokemon = await api.getPokemonByName(params?.pokemon! as string)
    return {
      props: {
        pokemon,
      },
    }
  } catch {
    res.statusCode = 404
    return { props: {} }
  }
}

export default PokemonPage
