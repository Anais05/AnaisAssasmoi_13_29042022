import React from "react"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/argentBankLogo.png';

export default function Header() {
  const firstName = useSelector(state => state.user?.data?.firstName || '');
  const isLoggedIn = useSelector(state => !!state.login?.data?.token);

  console.log(isLoggedIn)

  console.log(firstName)

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to='/'>
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      {
        isLoggedIn ? (
        <div>
          <i className="fa fa-user-circle"></i>
          <Link className="main-nav-item" to='/profile'>{ firstName }</Link>
          <Link data-testid='logout-btn' className="main-nav-item" to='/'>Sign Out</Link>
        </div>
        ) : (
        <div>
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        </div>
        )
      }
  </nav>
  )
}