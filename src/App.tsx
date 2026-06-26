import { useEffect, useState } from 'react'
import './App.css'
import { useLiveGames } from './hooks/useLiveGames'
import MLBConcludedGameCard from './Modules/Sports/MLB/MLBConcludedGameCard'
import MLBUpcomingGameCard from './Modules/Sports/MLB/MLBUpcomingGameCard'
import MLBCurrentGame from './Modules/Sports/MLB/MLBCurrentGame'
import DivisionStandings from './Components/DivisionStandings'
import InningByInning from './Components/InningByInning'
import { weatherIcons } from './data/weatherIcons'
import BattingLeaders from './Components/BattingLeaders'
import PitchingLeaders from './Components/PitchingLeaders'
import MLBPostponedGameCard from './Modules/Sports/MLB/MLBPostponedGameCard'
import PostponedDetails from './Components/PostponedDetails'
// import NFLMatchupsCard from './Modules/Sports/NFL/NFLMatchupsCard'

type PrimaryView = 'inProgress' | 'concluded' | 'upcoming' | 'postponed'

const App = () => {
  const {
    games,
    connected
  } = useLiveGames()

  const { weatherDateTime } = games

  const [primaryRotationIndex, setPrimaryRotationIndex] = useState(0)
  const [currentSecondaryIndex, setCurrentSecondaryIndex] = useState(0)

  const ageSeconds = Math.floor(
    (Date.now() - games.lastUpdated) / 1000
  )

  console.log({connected, games, ageSeconds})

  const isGameInProgress = games.viewStatus === 'inProgress'

  const rotatingPrimaryModules: PrimaryView[] = [
    'concluded',
    'upcoming'
  ]

  if (games.postponedGame) {
    rotatingPrimaryModules.push('postponed')
  }

  const currentPrimaryModule: PrimaryView = 
    isGameInProgress
      ? 'inProgress'
      : rotatingPrimaryModules[
        primaryRotationIndex % rotatingPrimaryModules.length
      ]

  const PRIMARY_COMPONENTS = {
    inProgress: <MLBCurrentGame values={games.currentGame} />,
    concluded: <MLBConcludedGameCard values={games.lastGame} />,
    upcoming: <MLBUpcomingGameCard values={games.nextGame} />,
    postponed: <MLBPostponedGameCard values={games.postponedGame} />
  }

  const SECONDARY_MODULES = {
    inProgress: [
      <InningByInning
        awayTeam={games?.inningByInning?.homeInnings || [null]}
        homeTeam={games?.inningByInning?.awayInnings || [null]}
      />,
      <BattingLeaders
        leftSideBatters={games.battingLeaders?.away}
        rightSideBatters={games.battingLeaders?.home}
      />,
      <PitchingLeaders
        leftSidePitchers={games.pitchingLeaders?.filter((item: any) => item.side === 'away') || null}
        rightSidePitchers={games.pitchingLeaders?.filter((item: any) => item.side === 'home') || null}
      />
    ],
    concluded: [
      <InningByInning
        awayTeam={games?.inningByInning?.homeInnings || [null]}
        homeTeam={games?.inningByInning?.awayInnings || [null]}
      />,
      <BattingLeaders
        leftSideBatters={games.battingLeaders?.away}
        rightSideBatters={games.battingLeaders?.home}
      />,
      <PitchingLeaders
        isConcluded
        leftSidePitchers={games.pitchingLeaders?.filter((item: any) => item.side === 'away') || null}
        rightSidePitchers={games.pitchingLeaders?.filter((item: any) => item.side === 'home') || null}
      />
    ],
    upcoming: [
      <DivisionStandings
        standingsData={games?.divisionStandings}
      />
    ],
    postponed: [
      <PostponedDetails
        gameData={games?.postponedGame}
      />
    ]
  }

  useEffect(() => {
    if (isGameInProgress) return

    const interval = setInterval(() => {
      setPrimaryRotationIndex((prevIndex) => (prevIndex + 1))
    }, 20000)

    return () => clearInterval(interval)
  }, [isGameInProgress])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSecondaryIndex((prevIndex) => (prevIndex + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setCurrentSecondaryIndex(0)
  }, [currentPrimaryModule])

  const availableSecondaryModules = SECONDARY_MODULES[currentPrimaryModule]

  const SecondaryComponent = availableSecondaryModules[currentSecondaryIndex % availableSecondaryModules.length]

  const getWeatherIcon = (code: number) => {
    switch (code) {
      case 0:
        return weatherIcons['clear']
      case 1:
        return weatherIcons['partlyCloudy']
      case 2:
        return weatherIcons['mostlyCloudy']
      case 3:
        return weatherIcons['cloudy']
      case 45:
        return weatherIcons['foggy']
      case 51:
      case 53:
      case 55:
        return weatherIcons['raindrops']
      case 56:
      case 57:
      case 66:
      case 67:
        return weatherIcons['freezingRain']
      case 61:
      case 63:
      case 65:
        return weatherIcons['rain']
      case 71:
      case 73:
      case 75:
      case 77:
        return weatherIcons['snow']
      case 80:
      case 81:
      case 82:
        return weatherIcons['rainShower']
      case 85:
      case 86:
        return weatherIcons['snowShower']
      case 95:
        return weatherIcons['thunderstorm']
      case 57:
        return weatherIcons['heavyThunderstorm']
      case 56:
        return weatherIcons['hailstorm']
    
      default:
        return weatherIcons['cloudy']
    }
  }

  const statusHealth =
    ageSeconds < 60
      ? 'good'
      : ageSeconds < 240
      ? 'warning'
      : 'error'

  const PrimaryComponent = PRIMARY_COMPONENTS[currentPrimaryModule]
  
  if (games.length <1) {
    return
  }

  return (
    <>
      <div className='container' style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <div style={{ fontSize: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', backgroundColor: '#1a222c', height: '50px', flexShrink: 0, alignContent: 'center'}}>
          <div className='weather-details'>
            <img
              color='white'
              style={{filter: 'brightness(0) saturate(100%) invert(44%) sepia(10%) saturate(601%) hue-rotate(224deg) brightness(91%) contrast(93%)'}}
              src={getWeatherIcon(games?.weatherDateTime?.weatherCode)}
              alt=''
              width={34}
              height={34}
            />
            <p style={{textAlign: 'left'}}> {weatherDateTime?.temperature} | {weatherDateTime?.forecast}</p>
          </div>
          <p>{weatherDateTime?.date} {`\u00B7`} {weatherDateTime?.time}</p>
          <div className='api-status'>
            <div className={`status-dot ${statusHealth}`}></div>
            <span>{ageSeconds}s</span>
          </div>
        </div>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0}}>
          {PrimaryComponent}
          {/* <NFLMatchupsCard /> */}
        </div>
        <div style={{flexShrink: 0}}>
          {SecondaryComponent}
        </div>
      </div>
    </>
  )
}

export default App
