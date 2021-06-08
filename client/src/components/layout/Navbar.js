import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logoutUser, user } = authContext;
  const onLogout = () => {
    logoutUser();
  };
  const authLinks = (
    <>
      <li>Hello {user && user.name}</li>
      <li>
        <a href='#!' onClick={onLogout}>
          <i className='fa fa-sign-out-alt' />
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </>
  );
  const guestLinks = (
    <>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} style={iconStyle} /> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fa fa-id-card',
};

const iconStyle = {
  color: 'white',
};
export default Navbar;
