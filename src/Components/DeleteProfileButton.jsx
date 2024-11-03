// DeleteProfileButton.js
import React from 'react';
import axios from 'axios';

const DeleteProfileButton = ({ id, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/api/profile/${id}`);
      console.log(response.data); // Logs success message
      onDelete(id); // Callback to update the parent state
      alert('Profile deleted successfully');
    } catch (error) {
      console.error('Error deleting profile:', error.response?.data || error.message);
      alert('Error deleting profile');
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}> Delete</button>
  );
};

export default DeleteProfileButton;
