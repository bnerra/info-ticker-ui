/* eslint-disable react-hooks/set-state-in-effect */
import * as React from 'react'
import type { NFLStatLeaderGroup } from './types'

type NFLStatLeadersPanelProps = {
  title: string
  leaders: NFLStatLeaderGroup[]
}

const NFLStatLeadersPanel = ({ title, leaders }: NFLStatLeadersPanelProps) => {
  const groupsWithData = leaders.filter((group) => group.entries.length > 0)
  const [groupIndex, setGroupIndex] = React.useState(0)

  React.useEffect(() => {
    setGroupIndex(0)
  }, [groupsWithData.length])

  React.useEffect(() => {
    if (groupsWithData.length <= 1) {
      return
    }

    const interval = setInterval(() => {
      setGroupIndex((current) => (current + 1) % groupsWithData.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [groupsWithData.length])

  if (groupsWithData.length === 0) {
    return (
      <div className='stat-leaders-panel'>
        <div className='stat-leaders-panel__title'>{title}</div>
        <div className='stat-leaders-panel__empty'>Stats will appear once games get underway</div>
      </div>
    )
  }

  const currentGroup = groupsWithData[groupIndex]

  return (
    <div className='stat-leaders-panel'>
      <div className='stat-leaders-panel__title'>{title} — {currentGroup.displayName}</div>
      <div className='stat-leaders-panel__entries'>
        {currentGroup.entries.map((entry, index) => (
          <div key={`${entry.playerName}-${index}`} className='stat-leaders-panel__row'>
            <span className='stat-leaders-panel__rank'>{index + 1}</span>
            <span className='stat-leaders-panel__player'>{entry.playerName} ({entry.teamAbbreviation})</span>
            <span className='stat-leaders-panel__value'>{entry.displayValue}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NFLStatLeadersPanel