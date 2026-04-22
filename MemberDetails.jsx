// frontend/src/pages/MemberDetails.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function MemberDetails() {
  const { id } = useParams(); // Get ID from URL
  const [member, setMember] = useState(null);

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/members/${id}`);
        setMember(res.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };
    fetchMemberDetails();
  }, [id]);

  if (!member) return <div className="page-container">Loading...</div>;

  return (
    <div className="page-container">
      <Link to="/view" className="back-btn">← Back to Team</Link>
      <div className="details-card">
        <img src={`http://localhost:5000/${member.image}`} alt={member.name} className="details-image" />
        <h2>{member.name}</h2>
        <p><strong>Roll Number:</strong> {member.rollNumber}</p>
        <p><strong>Year:</strong> {member.year} | <strong>Degree:</strong> {member.degree}</p>
        <p><strong>Project:</strong> {member.project}</p>
        <p><strong>Certificate:</strong> {member.certificate}</p>
        <p><strong>Internship:</strong> {member.internship}</p>
        <p><strong>About Your Aim:</strong> {member.aim}</p>
        <div className="hobbies">
          <strong>Hobbies:</strong>
          {member.hobbies.split(',').map((hobby, index) => (
            <span key={index} className="hobby-tag">{hobby.trim()}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MemberDetails;