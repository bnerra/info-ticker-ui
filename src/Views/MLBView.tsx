/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import MLBConcludedGameCard from '../Modules/Sports/MLB/MLBConcludedGameCard'
import MLBUpcomingGameCard from '../Modules/Sports/MLB/MLBUpcomingGameCard'
import MLBCurrentGame from '../Modules/Sports/MLB/MLBCurrentGame'
import MLBPostponedGameCard from '../Modules/Sports/MLB/MLBPostponedGameCard'
import DivisionStandings from '../Components/DivisionStandings'
import InningByInning from '../Components/InningByInning'
import BattingLeaders from '../Components/BattingLeaders'
import PitchingLeaders from '../Components/PitchingLeaders'
import PostponedDetails from '../Components/PostponedDetails'

type PrimaryView = 'inProgress' | 'concluded' | 'upcoming' | 'postponed'

interface MLBViewProps {
  games: any
}

const MLBView = ({ games }: MLBViewProps) => {
  const [primaryRotationIndex, setPrimaryRotationIndex] = useState(0)
  const [currentSecondaryIndex, setCurrentSecondaryIndex] = useState(0)

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
    postponed: <MLBPostponedGameCard values={games.currentGame} />
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
  const PrimaryComponent = PRIMARY_COMPONENTS[currentPrimaryModule]

  return (
    <>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0}}>
        {PrimaryComponent}
      </div>
      <div style={{flexShrink: 0}}>
        {SecondaryComponent}
      </div>
    </>
  )
}

export default MLBView
