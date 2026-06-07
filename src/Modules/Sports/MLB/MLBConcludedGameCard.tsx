import DivisionStandings, { type TeamStanding } from '../../../Components/DivisionStandings'
import { mlbTeams } from '../../../data/mlbTeams'

const MLBConcludedGameCard = (values: any) => {
  const gameData = values.values

  if (!gameData) {

    return <div>Loading</div>
  }

  const awayLogo = mlbTeams.filter((team: any) => team.appId === gameData.awayTeam.teamId)[0].logo
  const homeLogo = mlbTeams.filter((team: any) => team.appId === gameData.homeTeam.teamId)[0].logo

  return (
    <>
      <div className='mlb-game-concluded' style={{flex: 1, minHeight: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: '2fr 0.5fr 2fr', height: '100%'}}>
          
          {/* AWAY TEAM INFO */}
          <div style={{display: 'grid', gridTemplateColumns: '2.2fr 1.2fr', backgroundColor: '#1a222c'}}>
            <div style={{display: 'grid', backgroundColor: '#1a222c'}}>
              <div style={{alignContent: 'center'}}>
                <img src={awayLogo} style={{width: '90%', height: 'auto'}} />
              </div>
              <div style={{fontSize: '65px', fontFamily: 'sans-serif', color: '#f5f7fa', marginTop: '20px'}}>
                ({gameData.awayTeam.record.wins}-{gameData.awayTeam.record.losses})
              </div>
            </div>
            <div style={{alignContent: 'center', fontSize: '125px', fontFamily: 'sans-serif', color: '#f5f7fa'}}>
              {gameData.awayTeam.score}
            </div>
          </div>

          {/* LINESCORE */}

          <div style={{alignContent: 'center', display: 'grid', backgroundColor: '#1a222c'}}>
            <div style={{fontSize: '60px', fontFamily: 'Rajdhani', color: '#f5f7fa', marginTop: '80px'}}>
              <p>Final</p>
            </div>
            <div style={{fontSize: '40px', fontFamily: 'Rajdhani', color: '#f5f7fa', marginTop: '50px'}}>
              <p>{gameData.metaData.date}</p>
            </div>
          </div>

          {/* HOME TEAM INFO */}
          <div style={{display: 'grid', gridTemplateColumns: '1.2fr 2.2fr', backgroundColor: '#1a222c'}}>
            <div style={{alignContent: 'center', fontSize: '125px', fontFamily: 'sans-serif', color: '#f5f7fa'}}>
              {gameData.homeTeam.score}
            </div>
            <div style={{display: 'grid', backgroundColor: '#1a222c'}}>
              <div style={{alignContent: 'center'}}>
                <img src={homeLogo} style={{width: '90%', height: 'auto'}} />
              </div>
              <div style={{fontSize: '65px', fontFamily: 'sans-serif', color: '#f5f7fa', marginTop: '20px'}}>
                ({gameData.homeTeam.record.wins}-{gameData.homeTeam.record.losses})
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default MLBConcludedGameCard
