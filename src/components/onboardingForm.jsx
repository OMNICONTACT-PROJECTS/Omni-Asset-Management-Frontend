import React, { useState } from "react";
import './onboardingForm.css';

function OnboardingForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    role: '---',  // Default value for role
    gender: '---', // Default value for gender
    company_email: '',
    phone_number: '',
    national_id: '',
    nationality: '',
    province: '---', // Default value for province
    home_address: '',
    job_title: '',
    current_location: '',
    department: '',
    profile_picture: null,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false); // State for toast notification

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate input types
    if (name === 'phone_number') {
      if (!/^[\d+]*$/.test(value)) return; // Allow only numbers and "+"
    }

    // Allow text-only for specific fields
    if (['first_name', 'last_name', 'nationality', 'department'].includes(name)) {
      if (!/^[a-zA-Z\s]*$/.test(value)) return; // Allow only letters and spaces
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profile_picture: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emptyFields = Object.keys(formData).filter(field => {
      return (formData[field] === '' || 
              (field !== 'profile_picture' && formData[field] === '---')); // Exclude profile_picture check
    });

    if (emptyFields.length > 0) {
      const labels = emptyFields.map(field => {
        switch(field) {
          case 'first_name': return 'First Name';
          case 'last_name': return 'Last Name';
          case 'username': return 'Username';
          case 'email': return 'Email';
          case 'role': return 'Role';
          case 'gender': return 'Gender';
          case 'company_email': return 'Company Email';
          case 'phone_number': return 'Phone Number';
          case 'national_id': return 'National ID';
          case 'nationality': return 'Nationality';
          case 'province': return 'Province';
          case 'home_address': return 'Home Address';
          case 'job_title': return 'Job Title';
          case 'current_location': return 'Current Location';
          case 'department': return 'Department';
          default: return '';
        }
      }).filter(Boolean);

      setErrorMessage(`Please fill in: ${labels.join(', ')}`);
    } else {
      setErrorMessage('');
      // Handle the form submission, e.g., send data to an API
      console.log('Form submitted:', formData);
      showToastNotification();
    }
  };

  const showToastNotification = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Toast will be shown for 3 seconds
  };

  return (
    <div className="formContainer">
      {errorMessage && <p className="error" style={{ color: '#900000' }}>{errorMessage}</p>}
      <form className="registerForm" onSubmit={handleSubmit}>
        <div>
          <label>First Name <span style={{ color: '#900000' }}>*</span></label>
          <input type="text" name="first_name" placeholder="Enter First Name" value={formData.first_name} onChange={handleChange} />
        </div>
        <div>
          <label>Last Name <span style={{ color: '#900000' }}>*</span></label>
          <input type="text" name="last_name" placeholder="Enter Last Name" value={formData.last_name} onChange={handleChange} />
        </div>
        <div>
          <label>Username <span style={{ color: '#900000' }}>*</span></label>
          <input type="text" name="username" placeholder="Enter Username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label>Email <span style={{ color: '#900000' }}>*</span></label>
          <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Role <span style={{ color: '#900000' }}>*</span></label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="---">---</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div>
          <label>Gender <span style={{ color: '#900000' }}>*</span></label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="---">---</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label>Company Email <span style={{ color: '#900000' }}>*</span></label>
          <input type="email" name="company_email" placeholder="Enter Company Email" value={formData.company_email} onChange={handleChange} />
        </div>
        <div>
          <label>Phone Number <span style={{ color: '#900000' }}>*</span></label>
          <input type="tel" name="phone_number" placeholder="Enter Phone Number" value={formData.phone_number} onChange={handleChange} />
        </div>
        <div>
          <label>National ID <span style={{ color: '#900000' }}>*</span></label>
          <input type="text" name="national_id" placeholder="Enter National ID" value={formData.national_id} onChange={handleChange} />
        </div>
        <div>
          <label>Nationality <span style={{ color: '#900000' }}>*</span></label>
          <input type="text" name="nationality" placeholder="Enter Nationality" value={formData.nationality} onChange={handleChange} />
        </div>
        <div>
          <label>Province <span style={{ color: '#900000' }}>*</span></label>
          <select name="province" value={formData.province} onChange={handleChange}>
            <option value="---">---</option>
            <option value="province1">Harare</option>
            <option value="province2">Bulawayo</option>
            <option value="province3">Masvingo</option>
            <option value="province4">South Africa</option>
          </select>
        </div>
        <div>
          <label>Home Address <span style={{ color: '#900000' }}>*</span></label>
          <input type="text" name="home_address" placeholder="Home Address" value={formData.home_address} onChange={handleChange} />
        </div>
        <div>
          <label>Job Title <span style={{ color: '#900000' }}>*</span></label>
          <input type="text" name="job_title" placeholder="Enter Job Title" value={formData.job_title} onChange={handleChange} />
        </div>
        <div>
          <label>Current Location <span style={{ color: '#900000' }}>*</span></label>
          <input type="text" name="current_location" placeholder="Enter current work station" value={formData.current_location} onChange={handleChange} />
        </div>
        <div>
          <label>Department <span style={{ color: '#900000' }}>*</span></label>
          <input type="text" name="department" placeholder="Enter Department" value={formData.department} onChange={handleChange} />
        </div>
        <div>
          <label>Profile Picture</label>
          <input type="file" name="profile_picture" onChange={handleFileChange} />
        </div>
        <div>
          <input id="registerBtn" type="submit" value="ONBOARD" />
        </div>
      </form>
      {showToast && <div className="toast">Submitted successfully</div>} {/* Toast notification */}
    </div>
  );
}

export default OnboardingForm;
