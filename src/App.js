import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/loginPage';
import Success from './pages/successPage';
import Admin from './pages/adminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/react-host" element={<Login />} />
        <Route path="/react-host/success" element={<Success />} />
        <Route path="/react-host/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
