import { mlbTeams } from "../../../data/mlbTeams"
import type { UpcomingGameData } from "../../../types/MLB/GameData"

const MLBUpcomingGameCard = (values: any) => {
  const gameData: UpcomingGameData = values.values

  if (!gameData) {

    return <div>Loading</div>
  }

  const awayLogo = mlbTeams.filter((team: any) => team.appId === gameData.awayTeam.teamId)[0].logo
  const homeLogo = mlbTeams.filter((team: any) => team.appId === gameData.homeTeam.teamId)[0].logo

  return (
    <>
      <div className='mlb-game-upcoming' style={{flex: 1, minHeight: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr', height: '100%'}}>
        {/* 2.4fr 0.5fr 1.6fr */}
        {/* AWAY TEAM INFO */}
        <div style={{display: 'grid', gridTemplateRows: '1.8fr 0.5fr 1fr', backgroundColor: '#1a222c'}}>
          <div style={{alignContent: 'center'}}>
            <img src={awayLogo} style={{width: '55%', height: 'auto', marginTop: '5px'}} />
          </div>
          <div style={{alignContent: 'center', fontSize: '50px', fontFamily: 'sans-serif', color: '#f5f7fa'}}>
            ({gameData.awayTeam.record.wins}-{gameData.awayTeam.record.losses})
          </div>
          <div style={{display: 'grid', rowGap: '20px', alignContent: 'center', fontSize: '35px', fontFamily: 'inter', color: '#9aa4b2'}}>
            <p>{gameData.awayTeam.probablePitcher.name} ({gameData.awayTeam.probablePitcher.hand}HP)</p>
            <p>{gameData.awayTeam.probablePitcher.wins}-{gameData.awayTeam.probablePitcher.losses}, {gameData.awayTeam.probablePitcher.era} ERA</p>
          </div>
        </div>

        {/* LINESCORE */}
        <div style={{display: 'grid', rowGap: '80px', alignContent: 'center', backgroundColor: '#1a222c'}}>
          <div style={{fontSize: '62px', fontFamily: 'Rajdhani', color: '#f5f7fa'}}>
            <p>{gameData.metaData.date}</p>
          </div>
          <div style={{fontSize: '65px', fontFamily: 'Rajdhani', color: '#f5f7fa'}}>
            <p>@</p>
          </div>
          <div style={{fontSize: '65px', fontFamily: 'Rajdhani', color: '#f5f7fa'}}>
            <p>{gameData.metaData.time}</p>
          </div>
        </div>

        {/* HOME TEAM INFO */}
        <div style={{display: 'grid', gridTemplateRows: '1.8fr 0.5fr 1fr', backgroundColor: '#1a222c'}}>
          <div style={{alignContent: 'center'}}>
            <img src={homeLogo} style={{width: '55%', height: 'auto', marginTop: '5px'}} />
          </div>
          <div style={{alignContent: 'center', fontSize: '50px', fontFamily: 'sans-serif', color: '#f5f7fa'}}>
            ({gameData.homeTeam.record.wins}-{gameData.homeTeam.record.losses})
          </div>
          <div style={{display: 'grid', rowGap: '20px', alignContent: 'center', fontSize: '35px', fontFamily: 'inter', color: '#9aa4b2'}}>
            <p>{gameData.homeTeam.probablePitcher.name} ({gameData.homeTeam.probablePitcher.hand}HP)</p>
            <p>{gameData.homeTeam.probablePitcher.wins}-{gameData.homeTeam.probablePitcher.losses}, {gameData.homeTeam.probablePitcher.era} ERA</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MLBUpcomingGameCard
