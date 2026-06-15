import { useEffect, useState } from 'react'

export function useLiveGames() {
  const [games, setGames] = useState<any>([])
  const [connected, setConnected] = useState<any>(false)

  useEffect(() => {
    const eventSource = new EventSource('http://127.0.0.1:3000/api/live-games')

    eventSource.onopen = () => {
      setConnected(true)
    }

    eventSource.onmessage = (event) => {
      setGames(JSON.parse(event.data))
    }

    eventSource.onerror = (error: any) => {
      setConnected({
        connected: false,
        message: error,
      })
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