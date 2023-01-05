import { PokemonStat } from 'pokenode-ts'

interface PokemonStatProp {
  stat: PokemonStat
}

function PokemonStatMeter({ stat }: PokemonStatProp) {
  const className = `w-full`
  return (
    <meter
      min="0"
      max="255"
      low={50}
      high={125}
      optimum={200}
      value={stat.base_stat}
      className={className}
    >
      {stat.base_stat}
    </meter>
  )
}

export default PokemonStatMeter