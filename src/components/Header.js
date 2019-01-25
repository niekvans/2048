import React from 'react';

const Header = (props) => (
    <div className="header">
        <div className="container">
            <div className="header__content">
                <h1 className="header__title">{props.title}</h1>
            </div>
        </div>
    </div>
);

export default Header;