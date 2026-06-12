import * as React from 'react'

export interface TeamScore {
  name: string
  // An array representing runs scored per inning. 
  // Use a number for completed innings, or null/undefined for unplayed future innings.
  innings: (number | null | undefined)[]
  runs: number
  hits: number
  errors: number
}

interface BaseballScoreboardProps {
  awayTeam: TeamScore
  homeTeam: TeamScore
}

const InningByInning: React.FC<BaseballScoreboardProps> = ({ awayTeam, homeTeam }) => {
  // Determine total innings to display (minimum of 9, or maximum played in case of extra innings)
  const totalInningsToDisplay = Math.max(9, awayTeam?.innings?.length, homeTeam?.innings?.length)
  
  // Generate headers array (e.g., [1, 2, 3, ..., 9, 10...])
  const inningsHeaders = Array.from({ length: totalInningsToDisplay }, (_, i) => i + 1)

  // Helper function to safely render the inning score or an empty placeholder
  const renderInningScore = (score: number | null | undefined) => {
    if (score === null || score === undefined) return '-'
    return score
  }

  return (
    <div style={{ overflowX: 'auto', fontFamily: 'sans-serif' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '700px', textAlign: 'center', fontSize: '30px' }}>
        <thead>
          <tr style={{ backgroundColor: '#1a222c', color: 'grey' }}>
            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }} />
            {inningsHeaders.map((inning) => (
              <th key={inning} style={{ padding: '10px', border: '1px solid #ddd', minWidth: '35px' }}>
                {inning}
              </th>
            ))}
            <th style={{ padding: '10px', border: '1px solid #ddd', minWidth: '40px', backgroundColor: '#36475c' }}>R</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', minWidth: '40px' }}>H</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', minWidth: '40px' }}>E</th>
          </tr>
        </thead>
        <tbody>
          {/* Home Team Row */}
          <tr style={{ backgroundColor: '#1a222c', color: '#fdd5b1' }}>
            <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd', fontWeight: 'bold' }}>
              {homeTeam.name}
            </td>
            {inningsHeaders.map((_, index) => (
              <td key={index} style={{ padding: '10px', border: '1px solid #ddd' }}>
                {renderInningScore(homeTeam.innings[index])}
              </td>
            ))}
            <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold', backgroundColor: '#36475c' }}>
              {homeTeam.runs}
            </td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{homeTeam.hits}</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{homeTeam.errors}</td>
          </tr>

          {/* Away Team Row */}
          <tr style={{ backgroundColor: '#1a222c', color: '#c2d9eb' }}>
            <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd', fontWeight: 'bold' }}>
              {awayTeam.name}
            </td>
            {inningsHeaders.map((_, index) => (
              <td key={index} style={{ padding: '10px', border: '1px solid #ddd' }}>
                {renderInningScore(awayTeam.innings[index])}
              </td>
            ))}
            <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold', backgroundColor: '#36475c' }}>
              {awayTeam.runs}
            </td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{awayTeam.hits}</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{awayTeam.errors}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default InningByInning
