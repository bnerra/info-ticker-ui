export type NFLGameStatus = 'preview' | 'live' | 'summary'

export type NFLTeam = {
  id: string
  abbreviation: string
  displayName: string
  logo: string
  color?: string
  alternateColor?: string
  score?: string
}

export type NFLStatLeaderEntry = {
  playerName: string
  teamId: string
  teamAbbreviation: string
  displayValue: string
  value: number
}

export type NFLStatLeaderGroup = {
  category: string
  displayName: string
  entries: NFLStatLeaderEntry[]
}

export type NFLGame = {
  id: string
  status: NFLGameStatus
  statusDetail: string
  kickoff: string
  period?: number
  displayClock?: string
  possessionTeamId?: string
  situationText?: string
  isRedZone?: boolean
  homeTeam: NFLTeam
  awayTeam: NFLTeam
  leaders: NFLStatLeaderGroup[]
}

export type NFLFeedEntry = {
  id: string
  gameId: string
  teamAbbreviation: string
  text: string
  scoreValue: number
  statYardage: number
  timestamp: number
}
