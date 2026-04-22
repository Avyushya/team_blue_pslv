// frontend/src/pages/ViewMembers.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewMembers() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/members');
        setMembers(res.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
    fetchMembers();
  }, []);

  return (
    <div className="page-container">
      <h2 className="title">MEET OUR AMAZING TEAM</h2>
      <div className="card-grid">
        {members.map(member => (
          <div className="card" key={member._id}>
            {/* Constructing the full URL to the static image served by Express */}
            <img src={`http://localhost:5000/${member.image}`} alt={member.name} className="card-image" />
            <div className="card-info">
              <h3>{member.name}</h3>
              <p>Roll Number: {member.rollNumber}</p>
              <Link to={`/member/${member._id}`} className="view-btn">VIEW DETAILS</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewMembers;