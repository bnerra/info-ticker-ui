import NFLMatchupsCard from '../Modules/Sports/NFL/NFLMatchupsCard'
import { GameCard } from '../Modules/Sports/NFL/GameCard'
import NFLStatLeadersPanel from '../Modules/Sports/NFL/NFLStatLeadersPanel'
import NFLTicker from '../Modules/Sports/NFL/NFLTicker'
import type { NFLFeedEntry } from '../Modules/Sports/NFL/types'
import type { NFLGame, NFLStatLeaderGroup } from '../Modules/Sports/NFL/types'

interface NFLViewProps {
  games: NFLGame[]
  weeklyLeaders: NFLStatLeaderGroup[]
  feed: NFLFeedEntry[]
}

const isToday = (iso: string) => {
  const gameDate = new Date(iso)
  const today = new Date()
  return gameDate.toDateString() === today.toDateString()
}

const NFLView = ({ games, weeklyLeaders, feed }: NFLViewProps) => {
  const todaysGames = (games || []).filter((game) => isToday(game.kickoff))

  if (todaysGames.length === 0) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <p>No NFL games today</p>
      </div>
    )
  }

  const liveGames = todaysGames.filter((game) => game.status === 'live')

  const heroGame =
    liveGames.length === 1
      ? liveGames[0]
      : liveGames.length === 0 && todaysGames.length === 1
        ? todaysGames[0]
        : null

        console.log({heroGame, todaysGames})
  const mainContent = heroGame
    ? (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 0 }}>
        <GameCard game={heroGame} variant='hero' />
      </div>
    )
    : (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0 }}>
        <NFLMatchupsCard games={todaysGames} />
      </div>
    )

  const sidebarLeaders = heroGame ? heroGame.leaders : weeklyLeaders
  const sidebarTitle = heroGame ? 'Game Leaders' : "Week's Leaders"

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {mainContent}
        <div className={`nfl-sidebar ${heroGame ? 'hero' : ''}`}>
          <NFLStatLeadersPanel title={sidebarTitle} leaders={sidebarLeaders} />
        </div>
      </div>
      <NFLTicker feed={feed} />
    </div>
  )
}

export default NFLView
