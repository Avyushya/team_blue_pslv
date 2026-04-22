// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddMember from './pages/AddMember';
import ViewMembers from './pages/ViewMembers';
import MemberDetails from './pages/MemberDetails';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddMember />} />
        <Route path="/view" element={<ViewMembers />} />
        <Route path="/member/:id" element={<MemberDetails />} />
      </Routes>
    </Router>
  );
}

export default App;