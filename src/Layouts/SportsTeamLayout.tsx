import MLBGameCard from '../Modules/Sports/MLB/MLBGameCard'

export const sportsGameLayout = {
  header: [ 'dateAndTime', 'weatherMini', 'Rotating Status Area' ],
  primary: {
    module: <MLBGameCard />,
    contextSource: 'selectedGame',
    // notes: 'context source could refer to if the game is in progress, upcoming or concluded'
  },
  secondary: [
    {modules: ['inning-by-inning, pitching-leaders, batting-leaders, league-standings']},
  ],

}
