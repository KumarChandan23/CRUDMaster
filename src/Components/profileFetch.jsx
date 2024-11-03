import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileEmailLink from './ProfileEmailLink';
import UpdateProfileButton from './UpdateProfileButton';
import DeleteProfileButton from './DeleteProfileButton';

const ProfileFetch = ({ role }) => {
  const [profiles, setProfiles] = useState([]);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/profile`);
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const handleProfileUpdate = (profileId, updatedData) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile._id === profileId ? { ...profile, ...updatedData } : profile
      )
    );
  };

  const handleProfileDelete = (profileId) => {
    setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile._id !== profileId));
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="text-center text-light text-decoration-underline mb-2 ">User Profiles</h2>
      <div className="row g-4 justify-content-center">
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <div key={profile._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100">
                {profile.imageUrl && (
                  <img
                    src={`http://127.0.0.1:5000${profile.imageUrl}`}
                    alt="Profile"
                    className="card-img-top img-fluid"
                    style={{ maxHeight: '200px', objectFit: 'contain' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title h5">{profile.userName}</h5>
                  <ProfileEmailLink profile={profile} role={role} />
                  <p className="small">Mobile Number: {profile.mobileNumber}</p>
                  <p className="small">Profession: {profile.profession}</p>
                </div>
                <div className="card-footer d-flex justify-content-around">
                  <UpdateProfileButton profile={profile} onUpdate={handleProfileUpdate} />
                  <DeleteProfileButton id={profile._id} onDelete={handleProfileDelete} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No profiles available</p>
        )}
      </div>
    </div>
  );
};

export default ProfileFetch;
