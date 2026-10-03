import { useEffect, useState, type JSX } from 'react'
import './App.css'
import { useLiveGames } from './hooks/useLiveGames'
// import { weatherIcons } from './data/weatherIcons'
import MLBView from './Views/MLBView'
import NFLView from './Views/NFLView'
import NHLView from './Views/NHLView'

type Sport = 'mlb' | 'nfl' | 'nhl'

const SPORTS: { key: Sport; label: string }[] = [
  { key: 'mlb', label: 'MLB' },
  { key: 'nfl', label: 'NFL' },
  // { key: 'nhl', label: 'NHL' }
]

const App = () => {
  const {
    games,
    connected,
    ageSeconds
  } = useLiveGames()

  const DESIGN_WIDTH = 1024
  const DESIGN_HEIGHT = 600

  const [scale, setScale] = useState(1)

  const [selectedSport, setSelectedSport] = useState<Sport>(() => {
    const stored = localStorage.getItem('selectedSport')
    return (stored as Sport) || 'nfl'
  })

  useEffect(() => {
    localStorage.setItem('selectedSport', selectedSport)
  }, [selectedSport])

  useEffect(() => {
    const updateScale = () => {
      const scaleX = window.innerWidth / DESIGN_WIDTH
      const scaleY = window.innerHeight / DESIGN_HEIGHT
      setScale(Math.min(scaleX, scaleY))
    }

    updateScale()
    window.addEventListener('resize', updateScale)

    return () => window.removeEventListener('resize', updateScale)
  }, [])

  console.log({connected, games, ageSeconds})

  if (!games) {
    return null
  }

  // const { weatherDateTime }: any = games

  // const getWeatherIcon = (code: number) => {
  //   switch (code) {
  //     case 0:
  //       return weatherIcons['clear']
  //     case 1:
  //       return weatherIcons['partlyCloudy']
  //     case 2:
  //       return weatherIcons['mostlyCloudy']
  //     case 3:
  //       return weatherIcons['cloudy']
  //     case 45:
  //       return weatherIcons['foggy']
  //     case 51:
  //     case 53:
  //     case 55:
  //       return weatherIcons['raindrops']
  //     case 66:
  //     case 67:
  //       return weatherIcons['freezingRain']
  //     case 61:
  //     case 63:
  //     case 65:
  //       return weatherIcons['rain']
  //     case 71:
  //     case 73:
  //     case 75:
  //     case 77:
  //       return weatherIcons['snow']
  //     case 80:
  //     case 81:
  //     case 82:
  //       return weatherIcons['rainShower']
  //     case 85:
  //     case 86:
  //       return weatherIcons['snowShower']
  //     case 95:
  //       return weatherIcons['thunderstorm']
  //     case 57:
  //       return weatherIcons['heavyThunderstorm']
  //     case 56:
  //       return weatherIcons['hailstorm']

  //     default:
  //       return weatherIcons['cloudy']
  //   }
  // }

  const statusHealth = ageSeconds &&
    (ageSeconds < 60
      ? 'good'
      : ageSeconds < 240
      ? 'warning'
      : 'error')

  const localTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })

  const localDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })

  const VIEWS: Record<Sport, JSX.Element> = {
    mlb: <MLBView games={games} />,
    nfl: <NFLView games={games.nfl?.games || []} weeklyLeaders={games.nfl?.weeklyLeaders || []} feed={games.nfl?.feed || []} />,
    nhl: <NHLView games={games.nhl} />
  }

  return (
    <div
      style={{
        width: DESIGN_WIDTH,
        height: DESIGN_HEIGHT,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        position: 'absolute'
      }}
    >
      <div className='container' style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <div style={{ fontSize: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', backgroundColor: '#1a222c', height: '50px', flexShrink: 0, alignContent: 'center'}}>
          <div style={{ display: 'flex', gap: '8px', paddingLeft: '12px' }}>
            {SPORTS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSelectedSport(key)}
                style={{
                  padding: '4px 16px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: selectedSport === key ? '#3a5a8c' : '#2a333f',
                  color: 'white',
                  fontSize: '14px'
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <p style={{paddingTop: '4px'}}>{localDate} {`\u00B7`} {localTime}</p>
          <div className='api-status'>
            <div className={`status-dot ${statusHealth}`}></div>
            <span>{ageSeconds}s</span>
          </div>
        </div>

        {VIEWS[selectedSport]}
      </div>
    </div>
  )
}

export default App
