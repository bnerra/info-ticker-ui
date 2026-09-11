import type { NFLGame } from './types'

type GameCardProps = {
  game: NFLGame
  variant?: 'tile' | 'hero'
}

const formatKickoff = (iso: string) =>
  new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  })

export const GameCard = ({game, variant = 'tile'}: GameCardProps) => {
  const isLive = game.status === 'live'
  const awayPossession = isLive && game.possessionTeamId === game.awayTeam.id
  const homePossession = isLive && game.possessionTeamId === game.homeTeam.id
  const inRedZone = Boolean(isLive && game.isRedZone)

  const footerPrimary = 
    game.status === 'preview'
      ? formatKickoff(game.kickoff)
      : game.status === 'summary'
        ? 'FINAL'
        : `${game.period ? `${game.period}Q ` : ''}${game.displayClock || ''}`.trim()

  const footerSecondary = isLive ? (game.situationText || game.statusDetail) : null

  return (
    <div className={`game-card ${variant === 'hero' ? 'hero' : ''} ${isLive ? 'live' : ''} ${inRedZone ? 'redzone' : ''}`}>
      <div className='game-card__row'>
        <span>{game.awayTeam.abbreviation}</span>
        <span>{game.awayTeam.score ?? '-'}</span>
        {awayPossession ? <span className='possession-dot' /> : <span className='possession-space' />}
      </div>

      <div className='game-card__row'>
        <span>{game.homeTeam.abbreviation}</span>
        <span>{game.homeTeam.score ?? '-'}</span>
        {homePossession ? <span className='possession-dot' /> : <span className='possession-space' />}
      </div>

      <div className='game-card__footer'>
        {footerPrimary}
      </div>

      {footerSecondary && (
        <div className='game-card__footer-secondary'>
          {footerSecondary}
        </div>
      )}
    </div>
  )
}
