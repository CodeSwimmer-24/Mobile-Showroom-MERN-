import { Expo } from 'gsap/all';
import { TweenMax } from 'gsap/gsap-core';
import { useEffect } from 'react';
import './App.css';
import Navbar from './Navbar';

function Home() {
  useEffect(() => {

    TweenMax.to(".overlay h1", 2, {
      opacity: 0,
      y: -60,
      ease: Expo.easeInOut
    })

    TweenMax.to(".overlay span", 2, {
      delay: .3,
      opacity: 0,
      y: -60,
      ease: Expo.easeInOut
    })

    TweenMax.to(".overlay", 2, {
      delay: 1,
      top: "-100%",
      ease: Expo.easeInOut
    })

    TweenMax.from(".ellipse-container", 1, {
      delay: 2,
      opacity: 0,
      ease: Expo.easeInOut
    })

    TweenMax.from(".yellow", 1, {
      delay: 3.5,
      opacity: 0,
      ease: Expo.easeInOut
    })

    TweenMax.from(".circle1", 1, {
      delay: 2.4,
      opacity: 0,
      ease: Expo.easeInOut
    })

    TweenMax.from(".circle2", 1, {
      delay: 2.6,
      opacity: 0,
      ease: Expo.easeInOut
    })

    TweenMax.from(".logo", 1, {
      delay: 3,
      opacity: 0,
      y: -100,
      ease: Expo.easeInOut
    })

    TweenMax.staggerFrom(".menu-links ul li", 1, {
      delay: 3.2,
      opacity: 0,
      x: -100,
      ease: Expo.easeInOut
    }, 0.08)

    TweenMax.from(".scrolldown", 1, {
      delay: 3.4,
      opacity: 0,
      y: 100,
      ease: Expo.easeInOut
    })

    TweenMax.from(".text .title", 1, {
      delay: 3,
      opacity: 0,
      x: 200,
      ease: Expo.easeInOut
    })

    TweenMax.from(".text p", 1, {
      delay: 3.2,
      opacity: 0,
      x: 200,
      ease: Expo.easeInOut
    })

    TweenMax.from(".watchnow", 1, {
      delay: 3.4,
      opacity: 0,
      x: 200,
      ease: Expo.easeInOut
    })

    TweenMax.staggerFrom(".media ul li", 1, {
      delay: 3,
      opacity: 0,
      y: 100,
      ease: Expo.easeInOut
    }, 0.08)

  })
  return (
    <>
    <div className="overlay">
    <h1>Reindeer</h1>
    <span>snow life</span>
  </div>
  <div className="wrapper">

    <div className="nav">
      <div className="logo">
        <h1>
          <span>rein <br /> deer</span>
          <br />
          snow life
        </h1>
      </div>

      <div className="menu-links">
        <ul>
          <li>home.</li>
          <li>snow life.</li>
          <li>contact.</li>
        </ul>
      </div>

      <div className="scrolldown">scroll</div>
    </div>

    <div className="text">
      <div className="title">reindeer</div>
      {/* <p>Mauris elementum, dui ac sagittis <br /> cursus, libero elit sodales odio</p> */}
    </div>

    <div className="watchnow">
      <i className="fa fa-play"></i>
      <a href="#">Log in!</a>
    </div>

   

    <div className="ellipse-container">
      <div className="ellipse thin"></div>
      <div className="ellipse thick"></div>
      <div className="ellipse yellow"></div>
      <div className="circle1"><span>Maecenas purus at</span></div>
      <div className="circle2"><span>Fringilla Maecenas</span></div>
    </div>
  </div>
  </>
  );
}

export default Home;
