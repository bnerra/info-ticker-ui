import * as React from 'react'

export interface DynamicPitcherData {
  name: string
  isWinner?: boolean
  isSave?: boolean
  [key: string]: string | number | boolean | undefined
}

interface PitcherMatchupProps {
  isConcluded: boolean
  leftSidePitchers: DynamicPitcherData[]
  rightSidePitchers: DynamicPitcherData[]
}

const PitchingLeaders: React.FC<PitcherMatchupProps> = ({ leftSidePitchers, rightSidePitchers }) => {

  if (!leftSidePitchers || !rightSidePitchers) {
    return
  }
  // Helper to render a batter row block with their corresponding dynamic stats
  const renderPitcherBlock = (pitcher: DynamicPitcherData, alignment: 'left' | 'right') => {
    const isRightAligned = alignment === 'left'

    return (
      <div style={styles.pitcherBlock}>
        <div style={isRightAligned ? styles.nameLeft : styles.nameRight}>
          {pitcher.label} : {pitcher.name} {pitcher.stats}
        </div>
      </div>
    )
  }

  const styles = {
    container: {
      width: '1024px',
      height: '140px',
      margin: '0 auto',
      backgroundColor: '#1a222c',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxSizing: 'border-box' as const,
      overflow: 'hidden'
    },
    // Left column wrapper containing two stacked batters
    leftColumn: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      gap: '34px',
      alignItems: 'center'
    },
    // Right column wrapper containing two stacked batters
    rightColumn: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      gap: '34px',
      alignItems: 'center'
    },
    // Clean visual separator between the two team sides
    divider: {
      width: '1px',
      height: '100px',
      backgroundColor: '#e5e7eb',
      flexShrink: 0
    },
    pitcherBlock: {
      display: 'flex',
      gap: '8px',
      alignItems: 'end'
    },
    nameLeft: {
      fontSize: '34px',
      fontWeight: '600',
      color: '#e7e7e7',
      textAlign: 'right' as const,
      marginBottom: '2px'
    },
    nameRight: {
      fontSize: '34px',
      fontWeight: '600',
      color: '#e7e7e7',
      textAlign: 'left' as const,
      marginBottom: '2px'
    },
    statRow: {
      display: 'flex',
      gap: '8px',
      color: '#374151',
    },
    statCell: {
      display: 'inline-flex',
    },
    label: {
      color: '#9ca3af',
      fontSize: '18px',
      fontWeight: '600',
      marginRight: '4px',
      textTransform: 'uppercase' as const,
    },
    value: {
      fontWeight: '700',
      fontSize: '24px',
      color: '#cfcfcf'
    }
  }

  return (
    <div style={styles.container}>
      {/* Column 1: Left Side Pitchers */}
      <div style={styles.leftColumn}>
        {
          leftSidePitchers.map((pitcher: DynamicPitcherData) => renderPitcherBlock(pitcher, 'left'))
        }
      </div>

      {/* Center Divider */}
      <div style={styles.divider}></div>

      {/* Column 2: Right Side Pitchers */}
      <div style={styles.rightColumn}>
        {
          rightSidePitchers.map((pitcher: DynamicPitcherData) => renderPitcherBlock(pitcher, 'right'))
        }
      </div>
    </div>
  )
}

export default PitchingLeaders
