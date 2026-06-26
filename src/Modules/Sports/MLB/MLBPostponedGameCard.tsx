import { mlbTeams } from '../../../data/mlbTeams'

const MLBUPostponedGameCard = (values: any) => {
  const gameData: any = values.values

  if (!gameData) {

    return <></>
  }

  const awayLogo = mlbTeams.filter((team: any) => team.appId === gameData?.awayTeam?.teamId)[0].logo || ''
  const homeLogo = mlbTeams.filter((team: any) => team.appId === gameData?.homeTeam?.teamId)[0].logo || ''

  return (
    <>
      <div className='mlb-game-upcoming' style={{flex: 1, minHeight: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr', height: '100%'}}>
        {/* AWAY TEAM INFO */}
        <div style={{display: 'grid', gridTemplateRows: '1.8fr 0.5fr 1fr', backgroundColor: '#1a222c'}}>
          <div style={{alignContent: 'center'}}>
            <img src={awayLogo} style={{width: '55%', height: 'auto', marginTop: '5px'}} />
          </div>
          <div style={{alignContent: 'center', fontSize: '50px', fontFamily: 'sans-serif', color: '#f5f7fa'}}>
            ({gameData.awayTeam.record.wins}-{gameData.awayTeam.record.losses})
          </div>
        </div>

        {/* LINESCORE */}
        <div style={{display: 'grid', rowGap: '80px', alignContent: 'center', backgroundColor: '#1a222c'}}>
          <div style={{fontSize: '55px', fontFamily: 'Rajdhani', color: '#f5f7fa'}}>
            <p>{gameData.metaData.originalDate}</p>
          </div>
          <div style={{transform: 'rotate(-90deg)', fontSize: '60px', fontFamily: 'Rajdhani', color: '#f5f7fa', marginTop: '80px'}}>
            <p>{gameData.metaData.status}</p>
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
        </div>
      </div>
    </>
  )
}

export default MLBUPostponedGameCard
