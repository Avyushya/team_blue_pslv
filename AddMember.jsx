// frontend/src/pages/AddMember.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddMember() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', rollNumber: '', year: '', degree: '',
    project: '', hobbies: '', certificate: '', internship: '', aim: ''
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // We must use FormData to send files via Axios
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (image) data.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/members', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Member Added Successfully!');
      navigate('/view'); // Redirect to view page
    } catch (error) {
      console.error('Error uploading:', error);
    }
  };

  return (
    <div className="page-container">
      <h2>Add Team Member</h2>
      <form onSubmit={handleSubmit} className="full-form">
        <input type="text" name="name" placeholder="Name" onChange={handleInputChange} required />
        <input type="text" name="rollNumber" placeholder="Roll Number" onChange={handleInputChange} required />
        <input type="text" name="year" placeholder="Year" onChange={handleInputChange} required />
        <input type="text" name="degree" placeholder="Degree" onChange={handleInputChange} required />
        <input type="text" name="project" placeholder="About Project" onChange={handleInputChange} required />
        <input type="text" name="hobbies" placeholder="Hobbies (comma separated)" onChange={handleInputChange} required />
        <input type="text" name="certificate" placeholder="Certificate" onChange={handleInputChange} required />
        <input type="text" name="internship" placeholder="Internship" onChange={handleInputChange} required />
        <input type="text" name="aim" placeholder="About Your Aim" onChange={handleInputChange} required />
        
        <div className="file-upload">
          <label>Browse: </label>
          <input type="file" accept="image/*" onChange={handleFileChange} required />
        </div>
        
        <button type="submit" className="submit-btn">SUBMIT</button>
      </form>
    </div>
  );
}

export default AddMember;