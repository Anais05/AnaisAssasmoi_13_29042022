import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import Header from "./components/Header";
import Home from './pages/Home';
import Signin from './components/Signin';
import Footer from './components/Footer';
import { store } from "./utils/store";
import './index.css';


console.log(store)

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
            <Route path="/profile" />
          </Routes>
          <Footer />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
);