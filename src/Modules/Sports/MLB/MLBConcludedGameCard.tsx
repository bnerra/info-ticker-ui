
const MLBConcludedGameCard = () => {

  return (
    <>
      <div className='mlb-game-concluded' style={{flex: 1, minHeight: 0, overflow: 'hidden', borderStyle: 'solid', borderColor: 'purple', display: 'grid', gridTemplateColumns: '2fr 0.5fr 2fr', height: '100%'}}>
          
          {/* AWAY TEAM INFO */}
          <div style={{display: 'grid', gridTemplateColumns: '2.2fr 1.2fr', backgroundColor: '#1a222c'}}>
            <div style={{display: 'grid', backgroundColor: '#1a222c'}}>
              <div style={{alignContent: 'center'}}>
                <img src='src\assets\MlbTeamLogos\stl.png' style={{width: '90%', height: 'auto'}} />
              </div>
              <div style={{fontSize: '65px', fontFamily: 'sans-serif', color: '#f5f7fa', marginTop: '20px'}}>
                (28-21)
              </div>
            </div>
            <div style={{alignContent: 'center', fontSize: '125px', fontFamily: 'sans-serif', color: '#f5f7fa'}}>
              6
            </div>
          </div>

          {/* LINESCORE */}

          <div style={{alignContent: 'center', display: 'grid', backgroundColor: '#1a222c'}}>
            <div style={{fontSize: '60px', fontFamily: 'Rajdhani', color: '#f5f7fa', marginTop: '80px'}}>
              <p>Final</p>
            </div>
            <div style={{fontSize: '40px', fontFamily: 'Rajdhani', color: '#f5f7fa', marginTop: '50px'}}>
              <p>05/23/26</p>
            </div>
          </div>

          {/* HOME TEAM INFO */}
          <div style={{display: 'grid', gridTemplateColumns: '1.2fr 2.2fr', backgroundColor: '#1a222c'}}>
            <div style={{alignContent: 'center', fontSize: '125px', fontFamily: 'sans-serif', color: '#f5f7fa'}}>
              6
            </div>
            <div style={{display: 'grid', backgroundColor: '#1a222c'}}>
              <div style={{alignContent: 'center'}}>
                <img src='src\assets\MlbTeamLogos\cin.png' style={{width: '90%', height: 'auto'}} />
              </div>
              <div style={{fontSize: '65px', fontFamily: 'sans-serif', color: '#f5f7fa', marginTop: '20px'}}>
                (26-24)
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
