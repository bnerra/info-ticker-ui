import * as React from 'react'

export interface DynamicBatterData {
  name: string;
  [key: string]: string | number;
}

interface BatterMatchupProps {
  leftSideBatters: DynamicBatterData[] // Exactly two batters for the left column
  rightSideBatters: DynamicBatterData[] // Exactly two batters for the right column
}

const BattingLeaders: React.FC<BatterMatchupProps> = ({ leftSideBatters, rightSideBatters }) => {

// !!!!!!!!!!MAX 2 BATTERS!!!!!!!!!!!

// Helper to cleanly format names: "Aaron Judge" -> "A. Judge"
  const formatName = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length <= 1) return fullName;
    return `${parts[0].charAt(0).toUpperCase()}. ${parts.slice(1).join(' ')}`;
  };

  // Helper to render a batter row block with their corresponding dynamic stats
  const renderBatterBlock = (batter: DynamicBatterData, alignment: 'left' | 'right') => {
    const statKeys = Object.keys(batter).filter(key => key !== 'name');
    const isRightAligned = alignment === 'left'; // Left column content aligns right towards the center divider

    return (
      <div style={styles.batterBlock}>
        <div style={isRightAligned ? styles.nameLeft : styles.nameRight}>
          {formatName(batter.name)}
        </div>
        <div style={{ ...styles.statRow, justifyContent: isRightAligned ? 'flex-end' : 'flex-start' }}>
          {statKeys.map((key) => (
            <div key={key} style={styles.statCell}>
              <span style={styles.label}>{key}</span>
              <span style={styles.value}>{batter[key]}</span>
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
    batterBlock: {
      display: 'flex',
      gap: '16px'
    },
    nameLeft: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#e7e7e7',
      textAlign: 'right' as const,
      marginBottom: '2px'
    },
    nameRight: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#e7e7e7',
      textAlign: 'left' as const,
      marginBottom: '2px'
    },
    statRow: {
      display: 'flex',
      gap: '16px',
      color: '#374151',
    },
    statCell: {
      display: 'inline-flex',
    },
    label: {
      color: '#9ca3af',
      fontSize: '24px',
      fontWeight: '600',
      marginRight: '6px',
      textTransform: 'uppercase' as const,
      alignSelf: 'end'
    },
    value: {
      fontWeight: '700',
      fontSize: '26px',
      color: '#cfcfcf'
    }
  };

  return (
    <div style={styles.container}>
      {/* Column 1: Left Side Batters */}
      <div style={styles.leftColumn}>
        {
          leftSideBatters.map((batter: DynamicBatterData) => renderBatterBlock(batter, 'left'))
        }
        {/* {renderBatterBlock(leftSideBatters[0], 'left')}
        {renderBatterBlock(leftSideBatters[1], 'left')} */}
      </div>

      {/* Center Divider */}
      <div style={styles.divider}></div>

      {/* Column 2: Right Side Batters */}
      <div style={styles.rightColumn}>
        {
          rightSideBatters.map((batter: DynamicBatterData) => renderBatterBlock(batter, 'right'))
        }
        {/* {renderBatterBlock(rightSideBatters[0], 'right')}
        {renderBatterBlock(rightSideBatters[1], 'right')} */}
      </div>
    </div>
  )
}

export default BattingLeaders
