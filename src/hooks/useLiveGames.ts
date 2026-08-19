/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react'

const MAX_RETRY_DELAY = 30_000 // cap backoff at 30s
const BASE_RETRY_DELAY = 1_000 // start at 1s
const STALE_THRESHOLD_MS = 90_000 // if no message in 90s, force reconnect even if "connected"

export interface GameData {
  viewStatus: 'concluded' | 'live' | 'upcoming' | 'postponed' | string
  weatherDateTime: {
    temperature?: string
    weatherCode?: string
    forecast?: string
    date?: string
    time?: string
    [key: string]: unknown
  }
  lastUpdated: number
  currentGame: Record<string, unknown>
  lastGame: Record<string, unknown>
  nextGame: Record<string, unknown>
  divisionStandings: Array<{
    divisionName: string
    standings: Array<Record<string, unknown>>
  }>
  inningByInning: Record<string, unknown>
  battingLeaders: Record<string, unknown>
  pitchingLeaders: Array<Record<string, unknown>>
  postponedGame: unknown
  nhl: Record<string, unknown>
  [key: string]: unknown // catch-all for anything not yet modeled above
}

export function useLiveGames() {
  const [games, setGames] = useState<any>({})
  const [connected, setConnected] = useState<boolean>(false)
  const [lastMessageAt, setLastMessageAt] = useState<number | null>(null)
  const [retryCount, setRetryCount] = useState<number>(0)

  const retryCountRef = useRef(0)
  const eventSourceRef = useRef<EventSource | null>(null)
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const watchdogRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    const baseUrl = import.meta.env.VITE_API_URL
    const url = `${baseUrl}/api/live-games`

    function connect() {
      // Clean up any prior instance before opening a new one
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
        eventSourceRef.current = null
      }

      console.log('[SSE] Connecting...', new Date().toISOString())
      const eventSource = new EventSource(url)
      eventSourceRef.current = eventSource

      eventSource.onopen = () => {
        console.log('[SSE] Connected', new Date().toISOString())
        setConnected(true)
        retryCountRef.current = 0 // reset backoff on successful connect
        setRetryCount(0)
      }

      eventSource.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data)
          setGames(parsed)
          setLastMessageAt(Date.now())
        } catch (err) {
          console.error('[SSE] Failed to parse data:', err, event.data)
        }
      }

      eventSource.onerror = (error) => {
        console.error('[SSE] Connection error:', error, new Date().toISOString())
        setConnected(false)
        eventSource.close()
        eventSourceRef.current = null

        if (!isMountedRef.current) return

        // Exponential backoff with cap
        const delay = Math.min(
          BASE_RETRY_DELAY * 2 ** retryCountRef.current,
          MAX_RETRY_DELAY
        )
        retryCountRef.current += 1
        setRetryCount(retryCountRef.current)

        console.log(`[SSE] Reconnecting in ${delay}ms (attempt ${retryCountRef.current})`)
        reconnectTimeoutRef.current = setTimeout(() => {
          if (isMountedRef.current) connect()
        }, delay)
      }
    }

    connect()

    // Watchdog: if we haven't received a message in a while, force a reconnect
    // even if the browser still thinks it's "connected" (handles zombie connections
    // where onerror never fires — e.g. some proxy layers silently drop the stream).
    watchdogRef.current = setInterval(() => {
      if (lastMessageAt && Date.now() - lastMessageAt > STALE_THRESHOLD_MS) {
        console.warn('[SSE] Watchdog: no message in', STALE_THRESHOLD_MS, 'ms - forcing reconnect')
        connect()
      }
    }, 15_000)

    return () => {
      isMountedRef.current = false
      if(reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current)
      if (watchdogRef.current) clearInterval(watchdogRef.current)
      if (eventSourceRef.current) eventSourceRef.current.close()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ageSeconds is derived from Date.now(), which is impure and must not be
  // called during render. Instead, tick it in an effect on an interval so
  // it's plain state by the time render reads it.
  const [ageSeconds, setAgeSeconds] = useState<number | null>(null)
 
  useEffect(() => {
    const tick = () => {
      setAgeSeconds(lastMessageAt ? Math.floor((Date.now() - lastMessageAt) / 1000) : null)
    }
    tick() // set immediately on change, don't wait for first interval tick
    const intervalId = setInterval(tick, 1000)
    return () => clearInterval(intervalId)
  }, [lastMessageAt])

  return {
    games,
    connected,
    ageSeconds,
    hasReceivedData: lastMessageAt !== null,
    retryCount
  }
}
