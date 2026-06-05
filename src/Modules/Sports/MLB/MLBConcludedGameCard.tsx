import { mlbTeams } from "../../../data/mlbTeams"
import { useLiveGames } from "../../../hooks/useLiveGames"

const MLBConcludedGameCard = () => {

  const {
      games,
      connected
    } = useLiveGames()
  
    console.log({ games })

  const awayLogo = mlbTeams.filter((team: any) => team.appId === games.lastGame.awayTeam.teamId)[0].logo
  const homeLogo = mlbTeams.filter((team: any) => team.appId === games.lastGame.homeTeam.teamId)[0].logo

  return (
    <>
      <div className='mlb-game-concluded' style={{flex: 1, minHeight: 0, overflow: 'hidden', borderStyle: 'solid', borderColor: 'purple', display: 'grid', gridTemplateColumns: '2fr 0.5fr 2fr', height: '100%'}}>
          
          {/* AWAY TEAM INFO */}
          <div style={{display: 'grid', gridTemplateColumns: '2.2fr 1.2fr', backgroundColor: '#1a222c'}}>
            <div style={{display: 'grid', backgroundColor: '#1a222c'}}>
              <div style={{alignContent: 'center'}}>
                <img src={awayLogo} style={{width: '90%', height: 'auto'}} />
              </div>
              <div style={{fontSize: '65px', fontFamily: 'sans-serif', color: '#f5f7fa', marginTop: '20px'}}>
                ({games.lastGame.awayTeam.record.wins}-{games.lastGame.awayTeam.record.losses})
              </div>
            </div>
            <div style={{alignContent: 'center', fontSize: '125px', fontFamily: 'sans-serif', color: '#f5f7fa'}}>
              {games.lastGame.awayTeam.score}
            </div>
          </div>

          {/* LINESCORE */}

          <div style={{alignContent: 'center', display: 'grid', backgroundColor: '#1a222c'}}>
            <div style={{fontSize: '60px', fontFamily: 'Rajdhani', color: '#f5f7fa', marginTop: '80px'}}>
              <p>Final</p>
            </div>
            <div style={{fontSize: '40px', fontFamily: 'Rajdhani', color: '#f5f7fa', marginTop: '50px'}}>
              <p>{games.lastGame.metaData.date}</p>
            </div>
          </div>

          {/* HOME TEAM INFO */}
          <div style={{display: 'grid', gridTemplateColumns: '1.2fr 2.2fr', backgroundColor: '#1a222c'}}>
            <div style={{alignContent: 'center', fontSize: '125px', fontFamily: 'sans-serif', color: '#f5f7fa'}}>
              {games.lastGame.homeTeam.score}
            </div>
            <div style={{display: 'grid', backgroundColor: '#1a222c'}}>
              <div style={{alignContent: 'center'}}>
                <img src={homeLogo} style={{width: '90%', height: 'auto'}} />
              </div>
              <div style={{fontSize: '65px', fontFamily: 'sans-serif', color: '#f5f7fa', marginTop: '20px'}}>
                ({games.lastGame.homeTeam.record.wins}-{games.lastGame.homeTeam.record.losses})
              </div>
            </div>
          </div>

      </div>
      <div style={{borderStyle: 'solid', borderColor: 'purple', height: '140px', flexShrink: 0}}>
        <p>Secondary Module Full Width</p>
      </div>
    </>
  )
}

export default MLBConcludedGameCard
