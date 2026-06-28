import { nhlTeams } from '../../../data/nhlTeams'

const NHLConcludedGameCard = (values: any) => {
  const gameData = values.values

  if (!gameData) {

    return <div>Loading</div>
  }

  const awayLogo: any = nhlTeams.find((team: any) => team.abbreviation === gameData.away.abbreviation).logo
  const homeLogo: any = nhlTeams.find((team: any) => team.abbreviation === gameData.home.abbreviation).logo

  return (
    <>
      <div className='mlb-game-concluded' style={{flex: 1, minHeight: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: '2fr 1fr 2fr', height: '100%'}}>
          
          {/* AWAY TEAM INFO */}
          <div style={{display: 'grid', gridTemplateColumns: '2.2fr 1.2fr', backgroundColor: '#1a222c'}}>
            <div style={{display: 'grid', backgroundColor: '#1a222c'}}>
              <div style={{alignContent: 'center'}}>
                <img src={awayLogo} />
              </div>
              <div style={{fontSize: '65px', fontFamily: 'sans-serif', color: '#f5f7fa', marginTop: '20px'}}>
                ({gameData.away.record.wins}-{gameData.away.record.losses}-{gameData.away.record.otLosses})
              </div>
            </div>
            <div style={{alignContent: 'center', fontSize: '125px', fontFamily: 'sans-serif', color: '#f5f7fa'}}>
              {gameData.away.score}
            </div>
          </div>

          {/* LINESCORE */}
          <div style={{backgroundColor: '#1a222c'}}>
            <div style={{paddingBottom: '40px', fontSize: '40px', fontFamily: 'Rajdhani', color: '#f5f7fa', marginTop: '55px'}}>
              <p>{gameData.gameDate}</p>
            </div>
            <div style={{transform: 'rotate(-90deg)', fontSize: '60px', fontFamily: 'Rajdhani', color: '#f5f7fa', marginTop: '80px'}}>
              <p>Final</p>
            </div>
          </div>

          {/* HOME TEAM INFO */}
          <div style={{display: 'grid', gridTemplateColumns: '1.2fr 2.2fr', backgroundColor: '#1a222c'}}>
            <div style={{alignContent: 'center', fontSize: '125px', fontFamily: 'sans-serif', color: '#f5f7fa'}}>
              {gameData.home.score}
            </div>
            <div style={{display: 'grid', backgroundColor: '#1a222c'}}>
              <div style={{alignContent: 'center'}}>
                <img src={homeLogo} />
              </div>
              <div style={{fontSize: '65px', fontFamily: 'sans-serif', color: '#f5f7fa', marginTop: '20px'}}>
                ({gameData.home.record.wins}-{gameData.home.record.losses}-{gameData.home.record.otLosses})
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default NHLConcludedGameCard
