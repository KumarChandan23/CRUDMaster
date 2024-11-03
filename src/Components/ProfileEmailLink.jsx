import React from 'react';

const ProfileEmailLink = ({ profile, role }) => {
  const handleEmailClick = () => {
    const subject = role === 'jobProvider' ? 'Job Opportunity Inquiry' : 'Job Application';
    const greeting =
      role === 'jobProvider'
        ? `Hello ${profile.userName},\n\nI am reaching out to you regarding a job opening that may be suitable for you.`
        : `Hello,\n\nI am interested in the job opportunity and would like to apply.`;

    // Generate mailto link with subject and body
    const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(greeting)}`;

    // Open email client with the generated link
    window.location.href = mailtoLink;
  };

  return (
    <div>
      <p>Email: 
        <button onClick={handleEmailClick} style={{ border: 'none', background: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>
          {profile.email}
        </button>
      </p>
    </div>
  );
};

export default ProfileEmailLink;
