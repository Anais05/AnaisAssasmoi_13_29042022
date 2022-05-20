import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { logIn, setToken } from '../features/LoginReducer';

export default function Signin() {
  const dispatch = useDispatch();
  const login = useSelector(state => state.login);
  const token = localStorage.getItem('token')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
		if (token) {
			dispatch(setToken(token));
			navigate('/profile')
		}
	}, [token, dispatch, navigate])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(email, password));
  };

  if (login?.data) {    
    return <Navigate to='/profile' />;
  }

  return (
    <main className='main bg-dark'>
      <section className='sign-in-content'>
        <i className='fa fa-user-circle sign-in-icon'></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
						<label htmlFor="username">Username</label>
						<input type="text" id="username" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
          </div>
					<div className="input-wrapper">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
					</div>
					<div className="input-remember">
						<input type="checkbox" id="remember-me"/>
						<label htmlFor="remember-me">Remember me</label>
					</div>
					<button className="sign-in-button">Sign In</button>
					{login?.error && <p className="error">Email or password invalid</p>}
        </form>
      </section>
    </main>
  );
}
