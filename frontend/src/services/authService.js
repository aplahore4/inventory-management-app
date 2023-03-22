import axios from 'axios';
import { toast } from 'react-toastify';
import { REACT_APP_BACKEND_URL } from '../config';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${REACT_APP_BACKEND_URL}/api/users/register`,
      userData,
      {
        withCredentials: true,
      }
    );
    if (response.statusText === 'OK') {
      toast.success('User Registered successfully.');
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
