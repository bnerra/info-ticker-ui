import NFLMatchupsCard from '../Modules/Sports/NFL/NFLMatchupsCard'
import { GameCard } from '../Modules/Sports/NFL/GameCard'
import type { NFLGame } from '../Modules/Sports/NFL/types'

interface NFLViewProps {
  games: NFLGame[]
}

const isToday = (iso: string) => {
  const gameDate = new Date(iso)
  const today = new Date()

  return gameDate.toDateString() === today.toDateString()
}

const NFLView = ({ games }: NFLViewProps) => {
  const todaysGames = (games || []).filter((game) => isToday(game.kickoff))

  console.log({games})

  if (todaysGames.length === 0) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        {/* <p>No NFL games today</p> */}
        <NFLMatchupsCard games={games} />
      </div>
    )
  }

  if (todaysGames.length === 1) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <GameCard game={todaysGames[0]} variant='hero' />
      </div>
    )
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <NFLMatchupsCard games={todaysGames} />
    </div>
  )
}

export default NFLView
