import './nflStyle.css'
import { GameCard } from './GameCard'

type TeamData = {
  abbreviation: string
  city: string
  name: string
  score: number
  wins: number
  losses: number
}

type GameData = {
  date: string
  startTime: string
  quarter: number
  timeRemaining: string
  isLive: boolean
}

type NFLMatchup = {
  away: TeamData
  home: TeamData
  meta: GameData
}

const NFLMatchupsCard = () => {

  // const gameData: UpcomingGameData = values.values

  // if (!gameData) {

  //   return <div>No Matchups</div>
  // }

  // ATL    2-3
  // ARI    3-2
  // 11/15 12PM

  // ATL     21
  // ARI     14
  // 2Q    06:24

  // ATL     24
  // ARI     20
  // FINAL

  const games: NFLMatchup[] = [
  {
    away: {
      abbreviation: 'ARI',
      city: 'Arizona',
      name: 'Cardinals',
      score: 24,
      wins: 4,
      losses: 2
    },
    home: {
      abbreviation: 'ATL',
      city: 'Atlanta',
      name: 'Falcons',
      score: 21,
      wins: 3,
      losses: 3
    },
    meta: {
      date: '11/15',
      startTime: '12:00 PM',
      quarter: 4,
      timeRemaining: '08:42',
      isLive: true,
    }
  },
  {
    away: {
      abbreviation: 'BAL',
      city: 'Baltimore',
      name: 'Ravens',
      score: 17,
      wins: 5,
      losses: 1
    },
    home: {
      abbreviation: 'BUF',
      city: 'Buffalo',
      name: 'Bills',
      score: 20,
      wins: 4,
      losses: 2
    },
    meta: {
      date: '11/15',
      startTime: '12:00 PM',
      quarter: 3,
      timeRemaining: '05:11',
      isLive: true,
    }
  },
  {
    away: {
      abbreviation: 'CAR',
      city: 'Carolina',
      name: 'Panthers',
      score: 10,
      wins: 2,
      losses: 4
    },
    home: {
      abbreviation: 'CHI',
      city: 'Chicago',
      name: 'Bears',
      score: 13,
      wins: 3,
      losses: 3
    },
    meta: {
      date: '11/15',
      startTime: '12:00 PM',
      quarter: 2,
      timeRemaining: '01:48',
      isLive: true,
    }
  },
  {
    away: {
      abbreviation: 'CIN',
      city: 'Cincinnati',
      name: 'Bengals',
      score: 28,
      wins: 4,
      losses: 2
    },
    home: {
      abbreviation: 'CLE',
      city: 'Cleveland',
      name: 'Browns',
      score: 24,
      wins: 3,
      losses: 3
    },
    meta: {
      date: '11/15',
      startTime: '12:00 PM',
      quarter: 4,
      timeRemaining: '02:37',
      isLive: true,
    }
  },
  {
    away: {
      abbreviation: 'DAL',
      city: 'Dallas',
      name: 'Cowboys',
      score: 31,
      wins: 5,
      losses: 1
    },
    home: {
      abbreviation: 'DEN',
      city: 'Denver',
      name: 'Broncos',
      score: 14,
      wins: 2,
      losses: 4
    },
    meta: {
      date: '11/15',
      startTime: '3:25 PM',
      quarter: 3,
      timeRemaining: '11:22',
      isLive: true,
    }
  },
  {
    away: {
      abbreviation: 'DET',
      city: 'Detroit',
      name: 'Lions',
      score: 35,
      wins: 6,
      losses: 0
    },
    home: {
      abbreviation: 'GB',
      city: 'Green Bay',
      name: 'Packers',
      score: 30,
      wins: 4,
      losses: 2
    },
    meta: {
      date: '11/15',
      startTime: '3:25 PM',
      quarter: 4,
      timeRemaining: '06:19',
      isLive: true,
    }
  },
  {
    away: {
      abbreviation: 'HOU',
      city: 'Houston',
      name: 'Texans',
      score: 13,
      wins: 3,
      losses: 3
    },
    home: {
      abbreviation: 'IND',
      city: 'Indianapolis',
      name: 'Colts',
      score: 16,
      wins: 4,
      losses: 2
    },
    meta: {
      date: '11/15',
      startTime: '12:00 PM',
      quarter: 2,
      timeRemaining: '09:56',
      isLive: true,
    }
  },
  {
    away: {
      abbreviation: 'JAX',
      city: 'Jacksonville',
      name: 'Jaguars',
      score: 21,
      wins: 3,
      losses: 3
    },
    home: {
      abbreviation: 'KC',
      city: 'Kansas City',
      name: 'Chiefs',
      score: 27,
      wins: 5,
      losses: 1
    },
    meta: {
      date: '11/15',
      startTime: '3:25 PM',
      quarter: 4,
      timeRemaining: '12:07',
      isLive: false,
    }
  },
  {
    away: {
      abbreviation: 'LV',
      city: 'Las Vegas',
      name: 'Raiders',
      score: 7,
      wins: 1,
      losses: 5
    },
    home: {
      abbreviation: 'LAC',
      city: 'Los Angeles',
      name: 'Chargers',
      score: 20,
      wins: 4,
      losses: 2
    },
    meta: {
      date: '11/15',
      startTime: '3:25 PM',
      quarter: 3,
      timeRemaining: '03:44',
      isLive: false,
    }
  },
  {
    away: {
      abbreviation: 'LAR',
      city: 'Los Angeles',
      name: 'Rams',
      score: 24,
      wins: 4,
      losses: 2
    },
    home: {
      abbreviation: 'MIA',
      city: 'Miami',
      name: 'Dolphins',
      score: 24,
      wins: 4,
      losses: 2
    },
    meta: {
      date: '11/15',
      startTime: '7:20 PM',
      quarter: 4,
      timeRemaining: '14:55',
      isLive: false,
    }
  },
  {
    away: {
      abbreviation: 'MIN',
      city: 'Minnesota',
      name: 'Vikings',
      score: 10,
      wins: 2,
      losses: 4
    },
    home: {
      abbreviation: 'NE',
      city: 'New England',
      name: 'Patriots',
      score: 6,
      wins: 1,
      losses: 5
    },
    meta: {
      date: '11/15',
      startTime: '12:00 PM',
      quarter: 1,
      timeRemaining: '04:39',
      isLive: false,
    }
  },
  {
    away: {
      abbreviation: 'NO',
      city: 'New Orleans',
      name: 'Saints',
      score: 14,
      wins: 3,
      losses: 3
    },
    home: {
      abbreviation: 'NYG',
      city: 'New York',
      name: 'Giants',
      score: 17,
      wins: 2,
      losses: 4
    },
    meta: {
      date: '11/15',
      startTime: '12:00 PM',
      quarter: 3,
      timeRemaining: '13:18',
      isLive: false,
    }
  },
  {
    away: {
      abbreviation: 'NYJ',
      city: 'New York',
      name: 'Jets',
      score: 23,
      wins: 3,
      losses: 3
    },
    home: {
      abbreviation: 'PHI',
      city: 'Philadelphia',
      name: 'Eagles',
      score: 30,
      wins: 5,
      losses: 1
    },
    meta: {
      date: '11/15',
      startTime: '3:25 PM',
      quarter: 4,
      timeRemaining: '09:01',
      isLive: false,
    }
  },
  {
    away: {
      abbreviation: 'PIT',
      city: 'Pittsburgh',
      name: 'Steelers',
      score: 20,
      wins: 4,
      losses: 2
    },
    home: {
      abbreviation: 'SEA',
      city: 'Seattle',
      name: 'Seahawks',
      score: 13,
      wins: 3,
      losses: 3
    },
    meta: {
      date: '11/15',
      startTime: '3:25 PM',
      quarter: 2,
      timeRemaining: '07:25',
      isLive: false,
    }
  },
  {
    away: {
      abbreviation: 'SF',
      city: 'San Francisco',
      name: '49ers',
      score: 34,
      wins: 5,
      losses: 1
    },
    home: {
      abbreviation: 'TB',
      city: 'Tampa Bay',
      name: 'Buccaneers',
      score: 28,
      wins: 4,
      losses: 2
    },
    meta: {
      date: '11/15',
      startTime: '7:20 PM',
      quarter: 4,
      timeRemaining: '03:52',
      isLive: false,
    }
  },
  {
    away: {
      abbreviation: 'TEN',
      city: 'Tennessee',
      name: 'Titans',
      score: 17,
      wins: 2,
      losses: 4
    },
    home: {
      abbreviation: 'WSH',
      city: 'Washington',
      name: 'Commanders',
      score: 21,
      wins: 4,
      losses: 2
    },
    meta: {
      date: '11/15',
      startTime: '12:00 PM',
      quarter: 3,
      timeRemaining: '10:14',
      isLive: false,
    }
  }
]

const getGameFooter = (game: NFLMatchup) => {
  
  return `${game.meta.quarter}Q  ${game.meta.timeRemaining}`
}


  return (
    <>
      <div className='nfl-games-overview'>
        {games.map((game: NFLMatchup) => (
          <GameCard
            awayLabel={game.away.abbreviation}
            awayValue={game.away.score}
            homeLabel={game.home.abbreviation}
            homeValue={game.home.score}
            footer={getGameFooter(game)}
          />
        ))}
      </div>
    </>
  )
}

export default NFLMatchupsCard
