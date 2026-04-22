// frontend/src/pages/Home.jsx
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <h1>TEAM BLUE</h1>
      <p>Welcome to the BLUE Team Management</p>
      
      <div className="manage-box">
        <h3>Manage Team</h3>
        <div className="button-group">
          <Link to="/add" className="nav-btn">Add Member</Link>
          <Link to="/view" className="nav-btn">View Members</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;