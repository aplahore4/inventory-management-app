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
      toast.success('User registered successfully.');
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

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      `${REACT_APP_BACKEND_URL}/api/users/login`,
      userData
    );
    if (response.statusText === 'OK') {
      toast.success('User logged in successfully.');
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

export const logoutUser = async () => {
  await axios.get(`${REACT_APP_BACKEND_URL}/api/users/logout`);
  try {
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const forgotPassword = async (userData) => {
  try {
    const response = await axios.post(
      `${REACT_APP_BACKEND_URL}/api/users/forgotPassword`,
      userData
    );
    toast.success(response.data.message);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const resetPassword = async (userData, resetToken) => {
  try {
    const response = await axios.put(
      `${REACT_APP_BACKEND_URL}/api/users/resetPassword/${resetToken}`,
      userData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
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
