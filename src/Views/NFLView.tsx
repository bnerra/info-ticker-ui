import NFLMatchupsCard from '../Modules/Sports/NFL/NFLMatchupsCard'
import { GameCard } from '../Modules/Sports/NFL/GameCard'
import NFLStatLeadersPanel from '../Modules/Sports/NFL/NFLStatLeadersPanel'
import type { NFLGame, NFLStatLeaderGroup } from '../Modules/Sports/NFL/types'

interface NFLViewProps {
  games: NFLGame[]
  weeklyLeaders: NFLStatLeaderGroup[]
}

const isToday = (iso: string) => {
  const gameDate = new Date(iso)
  const today = new Date()
  return gameDate.toDateString() === today.toDateString()
}

const NFLView = ({ games, weeklyLeaders }: NFLViewProps) => {
  const todaysGames = (games || []).filter((game) => isToday(game.kickoff))

  if (todaysGames.length === 0) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <p>No NFL games today</p>
      </div>
    )
  }

  if (todaysGames.length === 1) {
    const game = todaysGames[0]

    return (
      <>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <GameCard game={game} variant='hero' />
        </div>
        <div style={{ flexShrink: 0 }}>
          <NFLStatLeadersPanel title='Game Leaders' leaders={game.leaders} />
        </div>
      </>
    )
  }

  return (
    <>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <NFLMatchupsCard games={todaysGames} />
      </div>
      <div style={{ flexShrink: 0 }}>
        <NFLStatLeadersPanel title="Week's Leaders" leaders={weeklyLeaders} />
      </div>
    </>
  )
}

export default NFLView
