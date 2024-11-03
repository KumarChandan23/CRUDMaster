// ProfileCreate.js
import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const ProfileCreate = () => {

  const navigator = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    userName: Yup.string().required('Username is required'),
    mobileNumber: Yup.string().required('Mobile number is required'),
    profession: Yup.string().required('Profession is required'),
  });

  const handleCreate = async (values,{resetForm}) => {
    const formData = new FormData();
    formData.append('email',values.email);
    formData.append('userName', values.userName);
    formData.append('mobileNumber', values.mobileNumber);
    formData.append('profession', values.profession);
    if (values.image) formData.append('image', values.image);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Profile created successfully');
      resetForm();
      navigator('/users')
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  return (
    <div className='d-flex justify-content-center'>
      <Formik
        initialValues={{email: '', userName: '', mobileNumber: '', profession: '', image: null }}
        validationSchema={validationSchema}
        onSubmit={handleCreate}
      >
        {({ setFieldValue }) => (
          <Form className='d-flex gap-2 flex-column border  p-2 rounded bg-light' style={{width:"20rem", }}>
            <h2 className='text-center'>Create Profile</h2>
            <div>
              <label>Email Id</label>
              <Field name="email" type="text" className="form-control" />
              <ErrorMessage name="email" id="email" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label>Username</label>
              <Field name="userName" type="text" className="form-control" />
              <ErrorMessage name="userName" id="userName" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label>Mobile Number</label>
              <Field name="mobileNumber" type="text" className="form-control" />
              <ErrorMessage name="mobileNumber" id="mobileNumber" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label>Profession</label>
              <Field name="profession" type="text" className="form-control" />
              <ErrorMessage name="profession" id="profession" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label>Upload Image</label>
              <input
                name="image"
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(event) => setFieldValue('image', event.currentTarget.files[0])}
              />
            </div>
          <div className="d-flex">
          <button type="submit" className='btn btn-success me-2'>Create Profile</button>
          <button type="reset" className='btn btn-secondary'>Reset</button>
          </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileCreate;
