import * as React from 'react'

export interface DynamicBatterData {
  name: string;
  [key: string]: string | number;
}

interface BatterMatchupProps {
  leftSideBatters: DynamicBatterData[]
  rightSideBatters: DynamicBatterData[]
}

const BattingLeaders: React.FC<BatterMatchupProps> = ({ leftSideBatters, rightSideBatters }) => {

 if (!leftSideBatters && !rightSideBatters) {
  return <></>
 }

  const renderBatterBlock = (batter: DynamicBatterData, alignment: 'left' | 'right') => {
    const isRightAligned = alignment === 'left'

    return (
      <div style={styles.batterBlock}>
        <div style={isRightAligned ? styles.nameLeft : styles.nameRight}>
          {batter.name}
        </div>
        <div style={{ ...styles.statRow, justifyContent: isRightAligned ? 'flex-end' : 'flex-start' }}>
          {batter.summary}
        </div>
      </div>
    )
  }

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
    leftColumn: {
      paddingTop: '15px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      gap: '12px',
      alignItems: 'center'
    },
    rightColumn: {
      paddingTop: '15px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      gap: '12px',
      alignItems: 'center'
    },
    divider: {
      width: '1px',
      height: '100px',
      backgroundColor: '#e5e7eb',
      flexShrink: 0
    },
    batterBlock: {
      display: 'flex',
      gap: '16px',
      fontSize: '27px'
    },
    nameLeft: {
      fontFamily: 'sans-serif',
      fontSize: '28px',
      fontWeight: '600',
      color: '#e7e7e7',
      textAlign: 'right' as const,
      marginBottom: '2px'
    },
    nameRight: {
      fontFamily: 'sans-serif',
      fontSize: '28px',
      fontWeight: '600',
      color: '#e7e7e7',
      textAlign: 'left' as const,
      marginBottom: '2px'
    },
    statRow: {
      display: 'flex',
      gap: '16px',
      color: '#cfcfcf',
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.leftColumn}>
        {
          leftSideBatters.map((batter: DynamicBatterData) => renderBatterBlock(batter, 'left'))
        }
      </div>

      <div style={styles.divider}></div>

      <div style={styles.rightColumn}>
        {
          rightSideBatters.map((batter: DynamicBatterData) => renderBatterBlock(batter, 'right'))
        }
      </div>
    </div>
  )
}

export default BattingLeaders
