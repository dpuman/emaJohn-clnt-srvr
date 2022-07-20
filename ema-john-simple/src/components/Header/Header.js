import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import img from '../../images/logo.png'
import './Header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div>
            <div className="header">
                <img src={img} alt="Logo" />
                <nav>
                    <Link to="/">Shop</Link>
                    <Link to="/shipment">Shipment</Link>
                    <Link to="/inventory">Manage Inventory</Link>
                    <Link to="/login">Login</Link>
                    <button onClick={() => setLoggedInUser({})}>Sign Out</button>

                </nav>
            </div>

        </div>
    );
};

export default Header;