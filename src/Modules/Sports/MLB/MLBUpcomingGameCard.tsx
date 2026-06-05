
const MLBUpcomingGameCard = () => {

  return (
    <>
      <div className='mlb-game-upcoming' style={{flex: 1, minHeight: 0, overflow: 'hidden', borderStyle: 'solid', borderColor: 'purple', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr', height: '100%'}}>
        {/* 2.4fr 0.5fr 1.6fr */}
        {/* AWAY TEAM INFO */}
        <div style={{display: 'grid', gridTemplateRows: '1.8fr 0.5fr 1fr', backgroundColor: '#1a222c'}}>
          <div style={{alignContent: 'center'}}>
            <img src='src\assets\MlbTeamLogos\stl.png' style={{width: '55%', height: 'auto', marginTop: '5px'}} />
          </div>
          <div style={{alignContent: 'center', fontSize: '50px', fontFamily: 'sans-serif', color: '#f5f7fa'}}>
            (28-21)
          </div>
          <div style={{display: 'grid', rowGap: '20px', alignContent: 'center', fontSize: '35px', fontFamily: 'inter', color: '#9aa4b2'}}>
            <p>M. Liberatore (LHP)</p>
            <p>2-2, 4.70 ERA</p>
          </div>
        </div>

        {/* LINESCORE */}
        <div style={{display: 'grid', rowGap: '80px', alignContent: 'center', backgroundColor: '#1a222c'}}>
          <div style={{fontSize: '65px', fontFamily: 'Rajdhani', color: '#f5f7fa'}}>
            <p>05/23/26</p>
          </div>
          <div style={{fontSize: '65px', fontFamily: 'Rajdhani', color: '#f5f7fa'}}>
            <p>@</p>
          </div>
          <div style={{fontSize: '65px', fontFamily: 'Rajdhani', color: '#f5f7fa'}}>
            <p>12:15pm</p>
          </div>
        </div>

        {/* HOME TEAM INFO */}
        <div style={{display: 'grid', gridTemplateRows: '1.8fr 0.5fr 1fr', backgroundColor: '#1a222c'}}>
          <div style={{alignContent: 'center'}}>
            <img src='src\assets\MlbTeamLogos\cin.png' style={{width: '55%', height: 'auto', marginTop: '5px'}} />
          </div>
          <div style={{alignContent: 'center', fontSize: '50px', fontFamily: 'sans-serif', color: '#f5f7fa'}}>
            (26-24)
          </div>
          <div style={{display: 'grid', rowGap: '20px', alignContent: 'center', fontSize: '35px', fontFamily: 'inter', color: '#9aa4b2'}}>
            <p>N. Lodolo (LHP)</p>
            <p>0-1, 7.20 ERA</p>
          </div>
        </div>

      </div>
      <div style={{borderStyle: 'solid', borderColor: 'purple', height: '140px', flexShrink: 0}}>
        <p>Secondary Module Full Width</p>
      </div>
    </>
  )
}

export default MLBUpcomingGameCard
