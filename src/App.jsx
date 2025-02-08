import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Guide from './Pages/Guide/Guide'
import Description from './Pages/Description/Description'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        < Route path='/description' element={<Description />}/>
        <Route path="/guide" element={<Guide />} />
      </Routes>
    </Router>
  )
}

export default App
