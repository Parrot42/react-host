import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/loginPage';
import Success from './pages/successPage';
import Admin from './pages/admin/app';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
