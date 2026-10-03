import type { NFLFeedEntry } from './types'

type NFLTickerProps = {
  feed: NFLFeedEntry[]
}

const NFLTicker = ({ feed }: NFLTickerProps) => {
  if (feed.length === 0) {
    return (
      <div className='nfl-ticker'>
        <div className='nfl-ticker__empty'>Waiting for the next big play...</div>
      </div>
    )
  }

  return (
    <div className='nfl-ticker'>
      <div className='nfl-ticker__track'>
        {[...feed, ...feed].map((entry, index) => (
          <span key={`${entry.id}-${index}`} className='nfl-ticker__item'>
            <strong>{entry.teamAbbreviation}</strong> — {entry.text}
          </span>
        ))}
      </div>
    </div>
  )
}

export default NFLTicker
