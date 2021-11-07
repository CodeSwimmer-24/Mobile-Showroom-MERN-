import React from 'react'
import { Link } from 'react-router-dom';
import "./Navbar.scss";

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar__items">
                <div className="navbar__item">
                <Link to="" className="nav__links">
                     <img src="https://beta.saffola.in/wp-content/uploads/2020/08/Saffola-Tasty-5L-2.png" /> <p>grocery & staples</p>
                </Link>
                </div>
                <div className="navbar__item">
                <Link to="" className="nav__links">
                     <img src="https://media.istockphoto.com/photos/tomato-isolated-on-white-background-picture-id466175630?k=6&m=466175630&s=612x612&w=0&h=fu_mQBjGJZIliOWwCR0Vf2myRvKWyQDsymxEIi8tZ38=" /> <p>vegitables & fruits</p>
                </Link>
                </div>
                <div className="navbar__item">
                <Link to="" className="nav__links">
                     <img src="https://rukminim1.flixcart.com/image/416/416/jz30nm80/face-wash/3/q/r/100-men-pimple-clear-ponds-original-imafhhtbbyecfhxz.jpeg?q=70" /> <p>personal care</p>
                </Link>
                </div>
                <div className="navbar__item">
                <Link to="" className="nav__links">
                     <img src="https://images-static.nykaa.com/media/catalog/product/5/6/56374c14902430875011.png" /> <p>household items</p>
                </Link>
                </div>
                <div className="navbar__item">
                <Link to=""className="nav__links">
                     <img src="https://m.media-amazon.com/images/I/91oj-y3R2pL._SL1500_.jpg" /> <p>biscuits & snacks</p>
                </Link>
                </div>
                <div className="navbar__item">
                <Link to="" className="nav__links">
                     <img src="https://www.nescafe.com/sites/default/files/styles/product_recommendation_large/public/2020-04/NESCAF%C3%89%20Classic_0.png?itok=xEQ6xzPZ" /> <p>drinks</p>
                </Link>
                </div>
                <div className="navbar__item">
                <Link to="" className="nav__links">
                     <img src="https://www.washingtonpost.com/resizer/eGHCH-iWhPSj61BFcFCH7evO6gg=/arc-anglerfish-washpost-prod-washpost/public/4ZLH33AYAAI6TOHGKZYZBQX5BA.jpg" /> <p>breakfast & meal</p>
                </Link>
                </div>
                <div className="navbar__item">
                <Link to="" className="nav__links">
                     <img src="https://previews.123rf.com/images/bphoto/bphoto1111/bphoto111100049/11264122-stationary-appliances-on-white-background-.jpg" /> <p>stactionary</p>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
