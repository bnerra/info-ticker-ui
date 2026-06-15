import { useEffect } from 'react'
import BaseballDiamond from '../../../Components/BaseballDiamond'
import { mlbTeams } from '../../../data/mlbTeams'
import type { CurrentGameData } from '../../../types/MLB/GameData'

const MLBCurrentGame = (values: any) => {
  const gameData: CurrentGameData = values.values
  
  if (!gameData) {

    return <div>Loading</div>
  }

  useEffect(() => {
  }, [gameData])

  // console.log({
  //   balls: gameData.metaData.count.balls,
  //   strikes: gameData.metaData.count.strikes,
  //   outs: gameData.metaData.count.outs
  // })

  const awayLogo = mlbTeams.filter((team: any) => team.appId === gameData.awayTeam.teamId)[0].logo
  const homeLogo = mlbTeams.filter((team: any) => team.appId === gameData.homeTeam.teamId)[0].logo

  const currentBases = {
    first: gameData.metaData.runners.first,
    second: gameData.metaData.runners.second,
    third: gameData.metaData.runners.third,
    home: false
  }

  return (
    <>
      <div className='mlb-game-in-progress' style={{flex: 1, minHeight: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr', height: '100%'}}>
        
        {/* AWAY TEAM INFO */}
        <div style={{display: 'grid', gridTemplateRows: '2.2fr 1.5fr 0.5fr', backgroundColor: '#1a222c'}}>
          <div style={{alignContent: 'center'}}>
            <img src={awayLogo} style={{width: '50%', height: 'auto', marginTop: '10px'}} />
          </div>
          <div style={{alignContent: 'center', fontSize: '150px', fontFamily: 'sans-serif', color: '#f5f7fa'}}>
            {gameData.awayTeam.score}
          </div>
          <div style={{alignContent: 'end', marginBottom: '10px', fontSize: '32px', fontFamily: 'inter', color: '#9aa4b2'}}>
            {gameData.metaData.isTopInning
              ? <>{gameData.metaData.batter.number}. {gameData.metaData.batter.name} &nbsp;{gameData.metaData.batter.average}</>
              : <>{gameData.metaData.pitcher.name} &nbsp;P:{gameData.metaData.pitcher.pitchCount}</>
              }
          </div>
        </div>

        {/* LINESCORE */}
        <div style={{display: 'grid', gridTemplateRows: '1fr 1.25fr 1fr', backgroundColor: '#1a222c'}}>
          <div style={{fontSize: '63px', fontFamily: 'Rajdhani', color: '#f5f7fa', display: 'flex', flexDirection: 'column', gap: '35px', marginTop: '10px'}}>
            <div className="live-dot-container">
              <div className="live-dot" />
              <span style={{ fontWeight: 'bold', color: 'white', fontSize: '28px' }}>LIVE</span>
            </div>
            <p>{gameData.metaData.inningState} {gameData.metaData.inning}</p>
          </div>
          <div>
            <BaseballDiamond runners={currentBases} />
          </div>
          <div style={{fontSize: '60px', display: 'flex', flexDirection: 'column', gap: '50px', fontFamily: 'Rajdhani', color: '#f5f7fa'}}>
            <p>{gameData.metaData.count.balls}-{gameData.metaData.count.strikes}</p>
            <p>{gameData.metaData.count.outs} out</p>
          </div>
        </div>

        {/* HOME TEAM INFO */}
        <div style={{display: 'grid', gridTemplateRows: '2.2fr 1.5fr 0.5fr', backgroundColor: '#1a222c'}}>
          <div style={{alignContent: 'center'}}>
            <img src={homeLogo} style={{width: '50%', height: 'auto', marginTop: '10px'}} />
          </div>
          <div style={{alignContent: 'center', fontSize: '150px', fontFamily: 'sans-serif', color: '#f5f7fa'}}>
            {gameData.homeTeam.score}
          </div>
          <div style={{alignContent: 'end', marginBottom: '10px', fontSize: '32px', fontFamily: 'inter', color: '#9aa4b2'}}>
            {!gameData.metaData.isTopInning
              ? <>{gameData.metaData.batter.number}. {gameData.metaData.batter.name} &nbsp;{gameData.metaData.batter.average}</>
              : <>{gameData.metaData.pitcher.name} &nbsp;P:{gameData.metaData.pitcher.pitchCount}</>
              }
          </div>
        </div>
      </div>
    </>
  )
}

export default MLBCurrentGame
