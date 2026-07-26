import { useEffect, useState } from 'react'

export function useLiveGames() {
  const [games, setGames] = useState<any>([])
  const [connected, setConnected] = useState<boolean>(false)

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_URL
    const url = `${baseUrl}/api/live-games`

    const eventSource = new EventSource(url)

    eventSource.onopen = () => {
      setConnected(true)
    }

    eventSource.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data)
        setGames(parsed)
      } catch (err) {
        console.error('Failed to parse SSE data:', err)
        console.log('Failed to parse SSE data:', err)
      }
    }

    eventSource.onerror = (error: any) => {
      setConnected(false)
      console.log('SSE connection error: ', error)
      console.error('SSE connection error: ', error)
      eventSource.close()
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
