export type NFLGameStatus = 'preview' | 'live' | 'summary'

export type NFLTeam = {
  id: string
  abbreviation: string
  displayName: string
  logo: string
  score?: string
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
}
