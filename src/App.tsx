import { useEffect, useState } from 'react'
import './App.css'
import { useLiveGames } from './hooks/useLiveGames'
import MLBConcludedGameCard from './Modules/Sports/MLB/MLBConcludedGameCard'
import MLBGameCard from './Modules/Sports/MLB/MLBGameCard'
import MLBUpcomingGameCard from './Modules/Sports/MLB/MLBUpcomingGameCard'
import MLBCurrentGame from './Modules/Sports/MLB/MLBCurrentGame'
import DivisionStandings, { type TeamStanding } from './Components/DivisionStandings'
import { mlbTeams } from './data/mlbTeams'
import InningByInning, { type TeamScore } from './Components/InningByInning'

const App = () => {
  const {
    games,
    connected
  } = useLiveGames()

  const [currentIndex, setCurrentIndex] = useState(0)
  // const [liveData, setLiveData]: any = useState(games)

  console.log({connected, games})


  const components = [
    <MLBConcludedGameCard values={games.lastGame} />,
    <MLBUpcomingGameCard values={games.nextGame} />
  ]

  useEffect(() => {
    // Set up the interval for 10 seconds (10000 milliseconds)
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
    }, 10000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [components.length])

  const ActiveComponent = components[currentIndex]

  const formattedStandings = () => {
    const abbMap = new Map(
      mlbTeams.map((item: any) => [item.appId, item.abbreviation])
    )

    return games.divisionStandings.standings.map((team: any) => ({
      ...team,
      abbreviation: abbMap.get(team.teamId)
    }))
  }

  // const divisionName = games.divisionStandings.divisionName

  const away: TeamScore = {
    name: 'STL',
    // 11 elements: Inning 11 is currently active, 12+ are unplayed
    innings: [0, 2, 0, 1, 0, 0, 0, 0, 1, 0, 2, null, null],
    // innings: [0, 2, 0, 1, 0, 0, 0, 0, 1],
    runs: 6,
    hits: 11,
    errors: 0,
  }
  
    const home: TeamScore = {
      name: 'CIN',
      // Bottom of the 11th hasn't happened yet (null), 12+ are unplayed
      innings: [1, 0, 0, 0, 3, 0, 0, 0, 0, 0, null, null],
      // innings: [1, 0, 0, 0, 3, 0, 0, 0, 0],
      runs: 4,
      hits: 9,
      errors: 2,
    }

  return (
    <>
      <div className='container' style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        {/* TOP BAR */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', backgroundColor: '#1a222c', height: '50px', flexShrink: 0, alignContent: 'center'}}>
          <p style={{textAlign: 'left'}}>[icon] 82dF Mostly Sunny</p>
          <p>Sat Jun 7 d 10:34 PM</p>
          <p style={{textAlign: 'right'}}>[icon] API Delayed</p>
        </div>
        {/* MAIN CONTENT */}
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0}}>
          {/* <MLBConcludedGameCard values={games.lastGame} /> */}
          {/* {games.viewStatus === 'CONCLUDED'
            && <MLBConcludedGameCard values={games.lastGame} />}
          {games.viewStatus === 'UPCOMING'
            && <MLBUpcomingGameCard values={games.nextGame} />} */}
          {/* <MLBGameCard /> */}
          {games.viewStatus === 'IN_PROGRESS'
            ? <MLBCurrentGame values={games.currentGame} />
            : ActiveComponent}
        </div>
        {/* BOTTOM DOCK */}
        <div style={{height: '140px', flexShrink: 0}}>
          {/* <DivisionStandings
            divisionName={divisionName}
            // divisionName='NL Central'
            teams={formattedStandings()}
          /> */}
          <InningByInning
            awayTeam={games.inningByInning.homeInnings}
            homeTeam={games.inningByInning.awayInnings}
          />
        </div>
      </div>
    </>
  )
}

export default App
