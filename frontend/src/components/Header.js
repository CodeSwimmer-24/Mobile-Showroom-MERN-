import React from 'react';

function Header() {
    return (
        <div className="header">
            <div className="header__container">
                <div className="header__title">
                   <h1>streetMart</h1>
                </div>
                <div className="header__search">
                   <div className="location">
                       <h3>Enter your location</h3>
                   </div>
                   <div className="search">
                       <input type="search" />
                   </div>
                   <div className="account">
                     <button>Login</button>
                   </div>
                </div>
                <div className="header__cart">
                       <h1>Cart</h1>
                </div>
            </div>
        </div>
    )
}

export default Header
