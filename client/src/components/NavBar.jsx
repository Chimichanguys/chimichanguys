import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const NavBar = () => {
    return (
        <nav>
            <ul>
                <Link id="homelink" to="/ingredients"><HomeIcon/>Home</Link>
                <Link id="orderhistorylink" to="/OrderHistory"><HistoryIcon/>Order History</Link>
                <Link id="cartlink" to="/Cart"><ShoppingCartIcon/>Cart</Link>
            </ul>
        </nav>
    );
}

export default NavBar;