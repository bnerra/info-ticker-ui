/* eslint-disable react-hooks/set-state-in-effect */
import * as React from 'react'
import './nflStyle.css'
import { GameCard } from './GameCard'
import type { NFLGame } from './types'

type NFLMatchupsCardProps = {
  games: NFLGame[]
}

const PAGE_SIZE = 8

const NFLMatchupsCard = ({ games }: NFLMatchupsCardProps) => {
  const [pageIndex, setPageIndex] = React.useState(0)

  const gamePages = React.useMemo(() => {
    const pages = []
    for (let i = 0; i < games.length; i += PAGE_SIZE) {
      pages.push(games.slice(i, i + PAGE_SIZE))
    }
    
    return pages
  }, [games])

  React.useEffect(() => {
    setPageIndex(0)
  }, [games.length])

  React.useEffect(() => {
    if (gamePages.length <= 1) {
      return
    }

    const interval = setInterval(() => {
      setPageIndex((current) => (current + 1) % gamePages.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [gamePages.length])

  if (games.length === 0) {
    return null
  }

  return (
    <div className='nfl-games-overview'>
      {gamePages[pageIndex].map((game) => (
        <GameCard key={game.id} game={game} variant='tile' />
      ))}
    </div>
  )
}

export default NFLMatchupsCard
