import * as React from 'react'

interface PostponedDetailsProps {
  gameData: any
}

const PostponedDetails: React.FC<PostponedDetailsProps> = ({ gameData }) => {

  if (!gameData) {

    return <></>
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
      flexDirection: 'column' as const,
      boxSizing: 'border-box' as const,
      overflow: 'hidden',
      padding: '4px 0 0 0',
      gap: '2px'
    },
    title: {
      fontSize: '35px',
      fontWeight: '800',
      textTransform: 'uppercase' as const,
      letterSpacing: '1.2px',
      color: '#9ca3af',
      textAlign: 'center' as const,
      flexShrink: 0
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{gameData.metaData.reason}</h2>
      <div style={{ fontFamily: 'sans-serif', fontSize: '30px', color: '#e7e7e7', paddingBottom: '10px'}}>
        Rescheduled for:
      </div>
      <div style={{ fontFamily: 'sans-serif', fontSize: '38px', fontWeight: '600', color: '#e7e7e7'}}>
        {gameData.metaData.rescheduledDate} @ {gameData.metaData.rescheduledTime}
      </div>
    </div>
  )
}

export default PostponedDetails
