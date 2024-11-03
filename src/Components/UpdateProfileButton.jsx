// UpdateProfileButton.js
import React, { useState } from 'react';
import axios from 'axios';

const UpdateProfileButton = ({ profile, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    userName: profile.userName,
    email: profile.email,
    mobileNumber: profile.mobileNumber,
    profession: profile.profession,
  });
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      // Create a FormData object to include text fields and image
      const formData = new FormData();
      formData.append('userName', updatedProfile.userName);
      formData.append('email', updatedProfile.email);
      formData.append('mobileNumber', updatedProfile.mobileNumber);
      formData.append('profession', updatedProfile.profession);
      
      if (imageFile) {
        formData.append('image', imageFile); // Add the image file only if selected
      }

      const response = await axios.put(`http://127.0.0.1:5000/api/profile/${profile._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data for file upload
        },
      });
      
      console.log(response.data); // Logs success message
      onUpdate(profile._id, { ...updatedProfile, imageUrl: response.data.imageUrl }); // Update parent state with new data
      setShowModal(false); // Close the modal
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
      alert('Error updating profile');
    }
  };

  return (
    <>
      <button className="btn btn-info me-2" onClick={() => setShowModal(true)}>
        Update
      </button>

      {showModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Profile</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="userName"
                      value={updatedProfile.userName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={updatedProfile.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mobile Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="mobileNumber"
                      value={updatedProfile.mobileNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Profession</label>
                    <input
                      type="text"
                      className="form-control"
                      name="profession"
                      value={updatedProfile.profession}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Profile Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleImageChange}
                      accept="image/*" // Accept only image files
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary"  onClick={handleUpdate}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProfileButton;
