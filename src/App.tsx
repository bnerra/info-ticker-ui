import { useEffect, useState } from 'react'
import './App.css'
import { useLiveGames } from './hooks/useLiveGames'
import MLBConcludedGameCard from './Modules/Sports/MLB/MLBConcludedGameCard'
import MLBUpcomingGameCard from './Modules/Sports/MLB/MLBUpcomingGameCard'
import MLBCurrentGame from './Modules/Sports/MLB/MLBCurrentGame'
import DivisionStandings from './Components/DivisionStandings'
import { mlbTeams } from './data/mlbTeams'
import InningByInning from './Components/InningByInning'
import { weatherIcons } from './data/weatherIcons'
import BattingLeaders from './Components/BattingLeaders'
import PitchingLeaders from './Components/PitchingLeaders'

const App = () => {
  const {
    games,
    connected
  } = useLiveGames()

  const { weatherDateTime } = games

  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentSecondIndex, setCurrentSecondIndex] = useState(0)

  const ageSeconds = Math.floor(
    (Date.now() - games.lastUpdated) / 1000
  )

  console.log({connected, games, ageSeconds})

  const formattedStandings = () => {
    const abbMap = new Map(
      mlbTeams.map((item: any) => [item.appId, item.abbreviation])
    )

    return games?.divisionStandings?.standings.map((team: any) => ({
      ...team,
      abbreviation: abbMap.get(team.teamId)
    }))
  }

  const divisionName = games?.divisionStandings?.divisionName || 'NLC'


  const components = [
    <MLBConcludedGameCard values={games.lastGame} />,
    <MLBUpcomingGameCard values={games.nextGame} />
  ]

  const secondaryComponents = [
    <DivisionStandings
      divisionName={divisionName}
      teams={formattedStandings()}
    />,
    <InningByInning
      awayTeam={games?.inningByInning?.homeInnings || [null]}
      homeTeam={games?.inningByInning?.awayInnings || [null]}
    />,
    <BattingLeaders
      leftSideBatters={games.battingLeaders?.away}
      rightSideBatters={games.battingLeaders?.home}
    />,
    <PitchingLeaders
      isConcluded={games.viewStatus === 'CONCLUDED'}
      leftSidePitchers={games.pitchingLeaders?.filter((item: any) => item.side === 'away') || null}
      rightSidePitchers={games.pitchingLeaders?.filter((item: any) => item.side === 'home') || null}
    />
  ]

  useEffect(() => {
    // Set up the interval for 10 seconds (10000 milliseconds)
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
    }, 10000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [components.length])

  useEffect(() => {
    // Set up the interval for 10 seconds (10000 milliseconds)
    const interval = setInterval(() => {
      setCurrentSecondIndex((prevIndex) => (prevIndex + 1) % secondaryComponents.length);
    }, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [secondaryComponents.length])

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

  const ActiveComponent = components[currentIndex]
  const ActiveSecondaryComponent = secondaryComponents[currentSecondIndex]

  const statusHealth =
    ageSeconds < 60
      ? 'good'
      : ageSeconds < 240
      ? 'warning'
      : 'error'

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
          {games.viewStatus === 'IN_PROGRESS'
            ? <MLBCurrentGame values={games.currentGame} />
            : ActiveComponent}
        </div>
        <div style={{flexShrink: 0}}>
          {ActiveSecondaryComponent}
        </div>
      </div>
    </>
  )
}

export default App
