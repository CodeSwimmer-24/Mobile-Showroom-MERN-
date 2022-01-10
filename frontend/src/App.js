import { Expo } from 'gsap/all';
import { TweenMax } from 'gsap/gsap-core';
import { useEffect } from 'react';
import './App.css';
import Home from './Home';
import Navbar from './Navbar';

function App() {
  return (
    <>
    <Navbar />
    <Home />
  </>
  );
}

export default App;
