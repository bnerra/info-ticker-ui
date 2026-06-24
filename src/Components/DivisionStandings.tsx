import * as React from 'react'
import { mlbTeams } from '../data/mlbTeams'

export interface TeamStanding {
  abbreviation: string
  wins: number;
  losses: number;
  gamesBack: number | '-'
}

interface DivisionStandingsProps {
  standingsData: any[]
}

const formattedStandings = (standings: any[]) => {
  const abbMap = new Map(
    mlbTeams.map((item: any) => [item.appId, item.abbreviation])
  )

  return standings.map((team: any) => ({
    ...team,
    abbreviation: abbMap.get(team.teamId)
  }))
}

const DivisionStandings: React.FC<DivisionStandingsProps> = ({ standingsData }) => {

  if (!(standingsData.length > 0)) {

    return <></>
  }

  const [divisionIndex, setDivisionIndex] = React.useState(0)

  React.useEffect(() => {
    if (!standingsData?.length) return

    const interval = setInterval(() => {
      setDivisionIndex(prev => (prev + 1) % standingsData.length)
    }, 6500)

    return () => clearInterval(interval)
  }, [standingsData.length])

  const currentDivision = standingsData[divisionIndex]

  const divisionName = currentDivision.divisionName

  const teams: any = formattedStandings(currentDivision.standings)

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
      padding: '4px 0 0 0'
    },
    title: {
      fontSize: '30px',
      fontWeight: '800',
      textTransform: 'uppercase' as const,
      letterSpacing: '1.2px',
      color: '#9ca3af',
      textAlign: 'center' as const,
      flexShrink: 0
    },
    gridContainer: {
      flex: 1,
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      alignItems: 'center'
    },
    // Cell wrapper layout holding the sub-columns side-by-side
    teamCell: {
      display: 'flex',
      flexDirection: 'row' as const,
      alignItems: 'center',
      justifyContent: 'center',
      height: '75px',
      boxSizing: 'border-box' as const,
      gap: '5px'
    },
    // Sub-column 1: Small left column purely tracking the position number
    placeColumn: {
    },
    placeNum: {
      fontSize: '50px',
      color: '#ffffff',
      fontWeight: '700'
    },
    // Sub-column 2: Vertical container stacked to the right of the place column
    dataColumn: {
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingLeft: '4px'
    },
    // Top Row: Big, bold team abbreviation
    teamAbbr: {
      fontSize: '35px',
      fontWeight: '800',
      color: '#cfcfcf',
      letterSpacing: '-0.3px',
      lineHeight: '1.1',
      marginBottom: '1px',
      alignSelf: 'center'
    },
    // Bottom Row: Record and parenthesized games back
    statsRow: {
      fontSize: '26px',
      fontWeight: '800',
      color: '#9ca3af',
      lineHeight: '1'
    },
    gbText: {
      color: '#9ca3af',
      fontWeight: '700',
      fontSize: '24px',
      marginLeft: '2px'
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{divisionName}</h2>
      <div style={styles.gridContainer}>
        {teams?.slice(0, 5).map((team: any, index: number) => {
          const place = index + 1
          const isLast = place === 5

          return (
            <div 
              key={team.abbreviation} 
              style={isLast ? styles.teamCell : { ...styles.teamCell, borderRight: '1px solid #e5e7eb' }}
            >
              <div style={styles.placeColumn}>
                <span style={styles.placeNum}>{place}</span>
              </div>
              <div style={styles.dataColumn}>
                <div style={styles.teamAbbr}>{team.abbreviation.toUpperCase()}</div>
                <div style={styles.statsRow}>
                  {team.wins}-{team.losses}
                  <span style={styles.gbText}>({team.gamesBack})</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DivisionStandings
