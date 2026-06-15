import * as React from 'react'

export interface DynamicPitcherData {
  name: string
  isWinner?: boolean
  isSave?: boolean
  [key: string]: string | number | boolean | undefined
}

interface PitcherMatchupProps {
  leftSidePitchers: DynamicPitcherData[] // Exactly two pitchers for the left column
  rightSidePitchers: DynamicPitcherData[] // Exactly two pitchers for the right column
}

const PitchingLeaders: React.FC<PitcherMatchupProps> = ({ leftSidePitchers, rightSidePitchers }) => {

// Helper to cleanly format names: "Aaron Judge" -> "A. Judge"
  const formatName = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length <= 1) return fullName;
    return `${parts[0].charAt(0).toUpperCase()}. ${parts.slice(1).join(' ')}`;
  };

  // Helper to render a batter row block with their corresponding dynamic stats
  const renderPitcherBlock = (pitcher: DynamicPitcherData, alignment: 'left' | 'right') => {
    const statKeys = Object.keys(pitcher).filter(key => key !== 'name' && key !== 'isWinner' && key !== 'isSave' && key !== 'isLoser');
    const isRightAligned = alignment === 'left'; // Left column content aligns right towards the center divider

    return (
      <div style={styles.pitcherBlock}>
        <div style={isRightAligned ? styles.nameLeft : styles.nameRight}>
          {pitcher.isWinner && 'W : '}
          {pitcher.isSave && 'S : '}
          {pitcher.isLoser && 'L : '}
          {formatName(pitcher.name)}
        </div>
        <div style={{ ...styles.statRow, justifyContent: isRightAligned ? 'flex-end' : 'flex-start' }}>
          {statKeys.map((key) => (
            <div key={key} style={styles.statCell}>
              <span style={styles.label}>{key !== 'record' && key}</span>
              <span style={styles.value}>{pitcher[key]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const styles = {
    container: {
      width: '1024px',
      height: '140px',
      margin: '0 auto',
      padding: '0 18px',
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
      gap: '26px',
      paddingRight: '18px'
    },
    // Right column wrapper containing two stacked batters
    rightColumn: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      gap: '26px',
      paddingLeft: '18px'
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
      fontSize: '26px',
      fontWeight: '600',
      color: '#e7e7e7',
      textAlign: 'right' as const,
      marginBottom: '2px'
    },
    nameRight: {
      fontSize: '26px',
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
      // alignSelf: 'end'
    },
    value: {
      fontWeight: '700',
      fontSize: '24px',
      color: '#cfcfcf'
    }
  };

  return (
    <div style={styles.container}>
      {/* Column 1: Left Side Pitchers */}
      <div style={styles.leftColumn}>
        {
          leftSidePitchers.map((pitcher: DynamicPitcherData) => renderPitcherBlock(pitcher, 'left'))
        }
        {/* {renderBatterBlock(leftSideBatters[0], 'left')}
        {renderBatterBlock(leftSideBatters[1], 'left')} */}
      </div>

      {/* Center Divider */}
      <div style={styles.divider}></div>

      {/* Column 2: Right Side Pitchers */}
      <div style={styles.rightColumn}>
        {
          rightSidePitchers.map((pitcher: DynamicPitcherData) => renderPitcherBlock(pitcher, 'right'))
        }
        {/* {renderBatterBlock(rightSideBatters[0], 'right')}
        {renderBatterBlock(rightSideBatters[1], 'right')} */}
      </div>
    </div>
  )
}

export default PitchingLeaders
