import BaseballDiamond from '../../../Components/BaseballDiamond'
import BattingLeaders, { type DynamicBatterData } from '../../../Components/BattingLeaders'
import DivisionStandings, { type TeamStanding } from '../../../Components/DivisionStandings'
import InningByInning, { type TeamScore } from '../../../Components/InningByInning'
import type { DynamicPitcherData } from '../../../Components/PitchingLeaders'
import PitchingLeaders from '../../../Components/PitchingLeaders'

const MLBGameCard = () => {
  const currentBases = {
    first: true,
    second: false,
    third: true,
    home: false
  }

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

  const team1: DynamicBatterData[] = [
    { name: 'Gunnar Henderson', ab: 3, h: 2, rbi: 1, hr: 1 },
    { name: 'Adley Rutschman', ab: 2, h: 0, bb: 1, r: 1 }
  ];

  const team2: DynamicBatterData[] = [
    { name: 'Aaron Judge', ab: 2, h: 1, hr: 1, rbi: 2 },
    { name: 'Juan Soto', ab: 3, h: 1, double: 1, bb: 0 }
  ]

  const pitching1: DynamicPitcherData[] = [
    // UPCOMING STATS
  //  {
  //   name: 'Tarik Skubal',
  //   record: '7-2',
  //   era: 2.38,
  //   k: 85,
  //   whip: 0.92
  // },
      // IN GAME STATS
    // {
    //   name: 'Tarik Skubal',
    //   ip: 6.0,
    //   p: 72,
    //   h: 14,
    //   er: 2,
    //   bb: 4,
    //   k: 12,
    // },
      // CONCLUDED STATS
    {
      name: 'Tarik Skubal',
      record: '7-2',
      era: 2.38,
      isLoser: true,
    },
  ]

  const pitching2: DynamicPitcherData[] = [
    // UPCOMING STATS
  // {
  //   name: 'Corbin Burnes',
  //   record: '6-3',
  //   era: 2.95,
  //   k: 78,
  //   whip: 1.05
  // },
    // IN GAME STATS
  {
    name: 'Corbin Burnes',
    ip: 6.3,
    p: 82,
    h: 9,
    er: 1,
    k: 18,
  },
    // CONCLUDED STATS
    // {
    //   name: 'Corbin Burnes',
    //   record: '6-3',
    //   era: 2.95,
    //   isWinner: true,
    // },
    // {
    //   name: 'Donnie Smith',
    //   s: 18,
    //   era: 1.95,
    //   isSave: true,
    // }
  ]

  const nlCentral: [TeamStanding, TeamStanding, TeamStanding, TeamStanding, TeamStanding] = [
    { abbreviation: 'CHC', wins: 26, losses: 26, gamesBack: 5 },
    { abbreviation: 'MIL', wins: 31, losses: 21, gamesBack: '-' },
    { abbreviation: 'CIN', wins: 22, losses: 30, gamesBack: 9.0 },
    { abbreviation: 'STL', wins: 29, losses: 22, gamesBack: 1.5 },
    { abbreviation: 'PIT', wins: 25, losses: 27, gamesBack: 6 }
  ]

  return (
    <>
      <div className='mlb-game-in-progress' style={{flex: 1, minHeight: 0, overflow: 'hidden', borderStyle: 'solid', borderColor: 'purple', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr', height: '100%'}}>
        
        {/* AWAY TEAM INFO */}
        <div style={{display: 'grid', gridTemplateRows: '2.2fr 1.5fr 0.5fr', backgroundColor: '#1a222c'}}>
          <div style={{alignContent: 'center'}}>
            <img src='src\assets\MlbTeamLogos\stl.png' style={{width: '50%', height: 'auto', marginTop: '10px'}} />
          </div>
          <div style={{alignContent: 'center', fontSize: '150px', fontFamily: 'sans-serif', color: '#f5f7fa'}}>
            3
          </div>
          <div style={{alignContent: 'end', marginBottom: '10px', fontSize: '32px', fontFamily: 'inter', color: '#9aa4b2'}}>
            5. Batter's Name .229
          </div>
        </div>

        {/* LINESCORE */}
        <div style={{display: 'grid', gridTemplateRows: '1fr 1.25fr 1fr', backgroundColor: '#1a222c'}}>
          <div style={{fontSize: '62px', fontFamily: 'Rajdhani', color: '#f5f7fa', display: 'flex', flexDirection: 'column', gap: '35px', marginTop: '10px'}}>
            {/* <div style={{fontSize: '30px'}}>Live</div> */}
            <div className="live-dot-container">
              <div className="live-dot" />
              <span style={{ fontWeight: 'bold', color: 'white', fontSize: '28px' }}>LIVE</span>
            </div>
            <p>Top 4</p>
          </div>
          <div>
            <BaseballDiamond runners={currentBases} />
          </div>
          <div style={{fontSize: '60px', display: 'flex', flexDirection: 'column', gap: '50px', fontFamily: 'Rajdhani', color: '#f5f7fa'}}>
            <p>1-2</p>
            <p>2 out</p>
          </div>
        </div>

        {/* HOME TEAM INFO */}
        <div style={{display: 'grid', gridTemplateRows: '2.2fr 1.5fr 0.5fr', backgroundColor: '#1a222c'}}>
          <div style={{alignContent: 'center'}}>
            <img src='src\assets\MlbTeamLogos\cin.png' style={{width: '50%', height: 'auto', marginTop: '10px'}} />
          </div>
          <div style={{alignContent: 'center', fontSize: '150px', fontFamily: 'sans-serif', color: '#f5f7fa'}}>
            1
          </div>
          <div style={{alignContent: 'end', marginBottom: '10px', fontSize: '32px', fontFamily: 'inter', color: '#9aa4b2'}}>
            Pitcher's Name P: 22
          </div>
        </div>

      </div>
      <div style={{height: '140px', flexShrink: 0}}>
        <InningByInning
          awayTeam={away}
          homeTeam={home}
        />
        {/* <BattingLeaders
          leftSideBatters={team1}
          rightSideBatters={team2}
        /> */}
        {/* <PitchingLeaders
          leftSidePitchers={pitching1}
          rightSidePitchers={pitching2}
        /> */}
        {/* <DivisionStandings
          divisionName='NL Central'
          teams={nlCentral}
        /> */}
      </div>
    </>
  )
}

export default MLBGameCard
