/* eslint-disable @typescript-eslint/no-explicit-any */
interface NHLViewProps {
  games: any
}

const NHLView = ({ games }: NHLViewProps) => {
  return (
    <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <p>NHL view coming soon</p>
    </div>
  )
}

export default NHLView
