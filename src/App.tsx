import './App.css'
import MLBConcludedGameCard from './Modules/Sports/MLB/MLBConcludedGameCard'
import MLBGameCard from './Modules/Sports/MLB/MLBGameCard'
import MLBUpcomingGameCard from './Modules/Sports/MLB/MLBUpcomingGameCard'

const App = () => {

  return (
    <>
      <div className='container' style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        {/* TOP BAR */}
        <div style={{backgroundColor: '#1a222c', height: '50px', flexShrink: 0, alignContent: 'center'}}>
          <p>Header / Status Bar</p>
        </div>
        {/* MAIN CONTENT */}
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0}}>
          {/* <p>Primary Content - Flexible Layouts</p> */}
          {/* <MLBConcludedGameCard /> */}
          {/* <MLBUpcomingGameCard /> */}
          <MLBGameCard />
        </div>
        {/* BOTTOM DOCK */}
        {/* <div style={{borderStyle: 'solid', borderColor: 'green', height: '55px', flexShrink: 0}}>
          <p>Navigation</p>
        </div> */}
      </div>
    </>
  )
}

export default App
