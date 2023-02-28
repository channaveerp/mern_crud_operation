import React, { useState } from 'react';
import style from './index.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  });
  const [formSubmit, setFormSubmit] = useState([]);

  const [formerror, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validation = (value) => {
    console.log('value:', value);
    const error = {};
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!value.username) {
      error.username = 'User name is required!';
    }
    if (!value.email) {
      error.email = 'Email is required!';
    } else if (!reg.test(value.email)) {
      error.email = 'Not a valid email!';
    }
    if (!value.phone) {
      error.phone = 'Phone number is required!';
    } else if (value.phone.length > 10 || value.phone.length < 9) {
      error.phone = 'Not valid phone number!';
    }
    return error;
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    setError(validation(formData));
    setFormSubmit({ ...formData });

    try {
      const res = await axios.post(
        'http://localhost:8080/auth/register',
        formData
      );

      // console.log('res:', res.status);
      if (
        formData.email === '' ||
        formData.phone === '' ||
        formData.username === ''
      ) {
        Swal.fire('Please fill credentials');
      }
      // else if (res.status === 200) {
      //   Swal.fire('Account registered successfully');
      // }
      return setFormData(res.data);
    } catch (err) {
      if ((err.response.statusText = 'Internal Server Error')) {
        alert('Internal Server Error');
      }
    }
    setFormData({
      username: '',
      email: '',
      password: '',
      phone: '',
    });
  };

  return (
    <div className={style.container}>
      <h4 style={{ fontSize: '1.5rem', fontWeight: '500' }}>Sign-up</h4>
      <form className={style.formcontainer}>
        <input
          type='text'
          placeholder='User Name'
          name='username'
          value={formData.username}
          onChange={handleChange}
        />
        <p style={{ color: 'red', margin: '-1rem 0rem 0  0rem' }}>
          {formerror.username}
        </p>
        <input
          type='text'
          placeholder='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
        <p style={{ color: 'red', margin: '-1rem 0rem 0  0rem' }}>
          {formerror.email}
        </p>
        <input
          type='text'
          placeholder='Phone number'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          maxLength='10'
        />
        <p style={{ color: 'red', margin: '-1rem 0rem 0  0rem' }}>
          {formerror.phone}
        </p>
        <input
          type='text'
          placeholder='Password'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
        {formData.email === '' ||
        formData.phone === '' ||
        formData.username === '' ||
        formData.password === '' ? (
          <button type='button' onClick={handlesubmit} disabled>
            Signup
          </button>
        ) : (
          <button
            type='button'
            onClick={handlesubmit}
            style={{ background: 'green', color: 'white' }}>
            Signup
          </button>
        )}
      </form>
    </div>
  );
};

export default Signup;
