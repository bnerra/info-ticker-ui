import * as React from 'react'

// Structure for each of the 5 teams
export interface TeamStanding {
  abbreviation: string
  wins: number;
  losses: number;
  gamesBack: number | '-'
}

interface DivisionStandingsProps {
  divisionName: string
  teams: TeamStanding[]
}

const DivisionStandings: React.FC<DivisionStandingsProps> = ({ divisionName, teams }) => {

   // Auto-sort the array based on overall win percentage before rendering
  // const sortedTeams = [...teams].sort((a, b) => {
  //   const winPctA = a.wins / (a.wins + a.losses || 1);
  //   const winPctB = b.wins / (b.wins + b.losses || 1);
  //   return winPctB - winPctA;
  // });

  // Helper to format games back to one decimal place if it's a number
  // const formatGB = (gb: number | '-') => {
  //   if (gb === '-') return '-';
  //   return gb.toFixed(1);
  // };

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
      color: '#6b7280',
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
      color: '#9ca3af',
      letterSpacing: '-0.3px',
      lineHeight: '1.1',
      marginBottom: '1px',
      alignSelf: 'center'
    },
    // Bottom Row: Record and parenthesized games back
    statsRow: {
      fontSize: '26px',
      fontWeight: '800',
      color: '#6b7280',
      lineHeight: '1'
    },
    gbText: {
      color: '#6b7280',
      fontWeight: '700',
      fontSize: '24px',
      marginLeft: '2px'
    }
  }

  return (
    <div style={styles.container}>
      {/* Centered Division Header Title */}
      <h2 style={styles.title}>{divisionName}</h2>

      {/* Standings Grid */}
      <div style={styles.gridContainer}>
        {teams.slice(0, 5).map((team, index) => {
          const place = index + 1;
          const isLast = place === 5;

          return (
            <div 
              key={team.abbreviation} 
              style={isLast ? styles.teamCell : { ...styles.teamCell, borderRight: '1px solid #e5e7eb' }}
            >
              {/* Sub-Column 1: Place Number */}
              <div style={styles.placeColumn}>
                <span style={styles.placeNum}>{place}</span>
              </div>

              {/* Sub-Column 2: Team Data Info Track */}
              <div style={styles.dataColumn}>
                <div style={styles.teamAbbr}>{team.abbreviation.toUpperCase()}</div>
                <div style={styles.statsRow}>
                  {team.wins}-{team.losses}
                  <span style={styles.gbText}>({team.gamesBack})</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default DivisionStandings