import React, { useContext, useEffect, useState } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
const Register = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { registerUser, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      //redirect authenticated user to home
      props.history.push('/');
    }
    if (error === 'User already exist') {
      setAlert(error, 'danger');
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, props.history, isAuthenticated]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { name, email, password, passwordConfirm } = user;

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '' || password.trim() === '')
      setAlert('Please enter all fields', 'danger');
    else if (password !== passwordConfirm)
      setAlert('Passwords do not match', 'danger');
    else {
      registerUser({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            name='name'
            type='text'
            value={name}
            onChange={onChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            value={password}
            onChange={onChange}
            minLength='6'
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='passwordConfirm'>Confirm Password</label>
          <input
            name='passwordConfirm'
            type='password'
            value={passwordConfirm}
            onChange={onChange}
            minLength='6'
            required
          />
        </div>

        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
