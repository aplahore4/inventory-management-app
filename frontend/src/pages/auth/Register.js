import React, { useState } from 'react';
import styles from './auth.module.scss';
import Card from '../../components/card/Card';
import { TiUserAddOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser, validateEmail } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';

const initialState = {
  name: '',
  email: '',
  password: '',
  password2: '',
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const { name, email, password, password2 } = formData;

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !password2) {
      return toast.error('Please enter all fields.');
    }
    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters long.');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email.');
    }
    if (password !== password2) {
      return toast.error('Password does not match.');
    }
    const userData = { name, email, password };
    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      dispatch(SET_LOGIN(true));
      dispatch(SET_NAME(data.name));
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <TiUserAddOutline size={35} color='#999' />
          </div>
          <h2>Register</h2>
          <form onSubmit={formSubmitHandler}>
            <input
              type='text'
              placeholder='Name'
              name='name'
              required
              value={name}
              onChange={inputChangeHandler}
            />
            <input
              type='email'
              placeholder='Email'
              required
              name='email'
              value={email}
              onChange={inputChangeHandler}
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              required
              value={password}
              onChange={inputChangeHandler}
            />
            <input
              type='password'
              placeholder='Confirm Password'
              required
              name='password2'
              value={password2}
              onChange={inputChangeHandler}
            />
            <button type='submit' className='--btn --btn-primary --btn-block'>
              Register
            </button>
          </form>
          <span className={styles.register}>
            <Link to='/'>Home</Link>
            <p> &nbsp; Already have an account? &nbsp;</p>
            <Link to='/login'>Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
