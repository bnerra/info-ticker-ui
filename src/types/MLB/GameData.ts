
export interface CurrentGameData {
  gamePk: number
  metaData: {
    date: string
    time: string
    inning: number
    inningState: string
    isTopInning: boolean
    count: {
      balls: number
      strikes: number
      outs: number
    },
    runners: {
      first: boolean
      second: boolean
      third: boolean
    },
    batter: {
      name: string
      number: number
      average: number
    }
    pitcher: {
      name: string
      pitchCount: number
    }
  }
  homeTeam: {
    name: string
    teamId: number
    score: number
  }
  awayTeam: {
    name: string
    teamId: number
    score: number
  }
}

export interface UpcomingGameData {
  gamePk: number
  metaData: {
    date: string
    time: string
  }
  awayTeam: {
    name: string
    teamId: number
    record: {
      wins: number
      losses: number
    }
    probablePitcher: {
      era: string
      hand: string
      name: string
      wins: number
      losses: number
    }
  }
  homeTeam: {
    name: string
    teamId: number
    record: {
      wins: number
      losses: number
    }
    probablePitcher: {
      era: string
      hand: string
      name: string
      wins: number
      losses: number
    }
  }
}
