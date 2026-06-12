import { useEffect, useState } from 'react'

export function useSSE<T>(url: string) {
  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState<Event | null>(null)

  useEffect(() => {
    const eventSource = new EventSource(url)

    eventSource.onmessage = (event) => {
      try {
        console.log({event})
        const parsed = JSON.parse(event.data) as T
        console.log({parsed})
        setData((prev) => [...prev, parsed])
      } catch (err) {
        console.error('Failed to parse SSE payload', err)
      }
    }

    eventSource.onerror = (err) => {
      setError(err)
      eventSource.close()
    }

    // Safely disconnect on unmount
    return () => {
      eventSource.close()
    }

  }, [url])

  return { data, error }
}
