import React from 'react';
import "./Header.scss";
import {MdLocationOn} from "react-icons/md";
import {BsSearch} from "react-icons/bs";
import {Link} from "react-router-dom";
import {AiOutlineShoppingCart} from "react-icons/ai";

function Header() {
    return (
        <div className="header">
            <div className="header__container">
                <div className="header__title">
                   <h1>streetMart</h1>
                </div>
                <div className="header__search">
                   <div className="location">
                       <MdLocationOn className="location__icon"/>
                       <p>
                       Select your location
                       </p>
                   </div>
                   <div className="search">
                       <input type="search" placeholder="Search for product"/>
                       <BsSearch />
                   </div>
                   <div className="account">
                     <Link to="login">
                     <button>
                     Login
                     </button>
                     </Link>
                   </div>
                     {/* </Link> */}
                     <div className="faq">
                      {/* <Link> */}
                       FAQ ?
                     {/* </Link>  */}
                     </div>
                </div>
                <div className="header__cart">
                       <AiOutlineShoppingCart className="cart__icon"/>
                       <p>My Cart</p>
                </div>
            </div>
        </div>
    )
}

export default Header
