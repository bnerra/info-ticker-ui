type GameCardProps = {
  awayLabel: string
  awayValue: string | number
  homeLabel: string
  homeValue: string | number
  footer: string
  isLive?: boolean
};

export const GameCard = ({
  awayLabel,
  awayValue,
  homeLabel,
  homeValue,
  footer,
  isLive = false
}: GameCardProps) => {
  return (
    <div className={`game-card ${isLive ? 'live' : ''}`}>
      <div className='game-card__row'>
        <span>{awayLabel}</span>
        <span>{awayValue}</span>
      </div>

      <div className='game-card__row'>
        <span>{homeLabel}</span>
        <span>{homeValue}</span>
      </div>

      <div className='game-card__footer'>
        {footer}
      </div>
    </div>
  )
}
