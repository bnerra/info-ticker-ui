import { useEffect, useState } from 'react'

export interface GameData {
  gamePk: number
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  inning: number
  inningHalf: 'Top' | 'Bot'
}

export function useLiveGames() {
  const [games, setGames] = useState<any>([])
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3000/api/live-games')

    eventSource.onopen = () => {
      setConnected(true)
    }

    eventSource.onmessage = (event) => {
      setGames(JSON.parse(event.data))
    }

    eventSource.onerror = () => {
      setConnected(false)
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return {
    games,
    connected
  }
}