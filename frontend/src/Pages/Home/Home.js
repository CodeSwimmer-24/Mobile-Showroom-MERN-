import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

function Home() {
  return (
    <>
      <div className="home">
        <div className="home__text">
          <h1>
            welcome to <span>streetMart!</span>
          </h1>
          <h3>shop now from your home and get the best deals</h3>
          <div className="home__discount">
            <h2>50% discount on your first order</h2>
            <h3>
              use code : <span>getfast</span>
            </h3>
          </div>
          <button>
            <Link to="" className="shopNow__link">Shop Now</Link>
          </button>
        </div>
        <div className="home__image">
          <img src="https://media.istockphoto.com/vectors/fastfree-and-healthy-scooter-delivery-concept-vector-id1214959423?b=1&k=20&m=1214959423&s=612x612&w=0&h=5muaLty-OYvTuE8HPDFFtx4bwbcj8wD2ZJYHo5Np7VI=" />
        </div>
      </div>
    </>
  );
}

export default Home;
