import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard';

import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/dashboard' exact element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
