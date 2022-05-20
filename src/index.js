import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import Header from "./components/Header";
import Home from './pages/Home';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import { store } from "./utils/store";
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Signin />}/>
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
);