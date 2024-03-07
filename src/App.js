import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Success from './pages/app';
import Admin from './pages/admin/app';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Success />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
