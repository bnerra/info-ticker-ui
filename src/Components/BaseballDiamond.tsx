
const BaseballDiamond = ({ runners = { first: false, second: false, third: false } }) => {
  const getBaseColor = (isOccupied: boolean) => (isOccupied ? '#e53e3e' : '#e2e8f0')
  const baseSize = 31;
  const positions = {
    third: { x: 20, y: 65 },
    second: { x: 50, y: 35 },
    first: { x: 80, y: 65 },
    home: { x: 50, y: 80 }
  };

  const renderBase = (x: any, y: any, occupied: any) => (
    <rect
      x={x - baseSize / 2}
      y={y - baseSize / 2}
      width={baseSize +4}
      height={baseSize + 4}
      fill={getBaseColor(occupied)}
      stroke='#4B5563'
      strokeWidth='2'
      transform={`rotate(45 ${x} ${y})`}
    />
  )

  return (
    <>
      <div className='flex items-center justify-center p-4'>
        <svg width='160' height='145' viewBox='0 5 100 100' className='drop-shadow-sm'>
          {renderBase(positions.third.x, positions.third.y, runners.third)}
          {renderBase(positions.second.x, positions.second.y, runners.second)}
          {renderBase(positions.first.x, positions.first.y, runners.first)}
        </svg>
      </div>
    </>
  )
}

export default BaseballDiamond
