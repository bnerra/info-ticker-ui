import type { GameData } from './NFLMatchupsCard'

type GameCardProps = {
  awayLabel: string
  awayValue: string | number
  homeLabel: string
  homeValue: string | number
  footer: string
  status: string
  meta: GameData
}

export const GameCard = ({
  awayLabel,
  awayValue,
  homeLabel,
  homeValue,
  footer,
  status,
  meta,
}: GameCardProps) => {
  const isLive = status === 'LIVE'
  const awayPossession = meta.hasPossession === 'away' && status === 'LIVE'
  const homePossession = meta.hasPossession === 'home' && status === 'LIVE'
  const inRedzone = meta.inRedzone && status === 'LIVE'

  return (
    <div className={`game-card ${isLive ? 'live' : ''} ${inRedzone ? 'redzone' : ''}`}>
      <div className='game-card__row'>
        <span>{awayLabel}</span>
        <span>{awayValue}</span>
        {awayPossession ? <span className='possession-dot' /> : <span className='possession-space' />}
      </div>

      <div className='game-card__row'>
        <span>{homeLabel}</span>
        <span>{homeValue}</span>
        {homePossession ? <span className='possession-dot' /> : <span className='possession-space' />}
      </div>

      <div className='game-card__footer'>
        {footer}
      </div>
    </div>
  )
}
