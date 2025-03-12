import './App.css'
// import the exports from the BowlerList and Header components
import BowlerList from './BowlerList'
import Header from './Header'

function App() {
  return (
    <>
    {/* Call the Header and BowlerList components */}
      <Header />
      <BowlerList />
    </>
  )
}

export default App
