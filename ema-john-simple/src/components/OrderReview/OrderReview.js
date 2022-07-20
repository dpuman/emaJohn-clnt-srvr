import { library } from '@fortawesome/fontawesome-svg-core';
import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager'
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

import './OrderReview.css'
import happyImage from '../../images/giphy.gif'
import { useNavigate } from 'react-router-dom';

const OrderReview = () => {

    const [cart, setCart] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const cartData = getDatabaseCart()
        const productKeys = Object.keys(cartData)

        fetch('http://localhost:5000/review-products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productKeys)
        }).then(res => res.json())
            .then(data => {
                setCart(data);

            })

    }, [])

    const removeProduct = (product) => {

        const newCart = cart.filter(pd => pd.key !== product);
        setCart(newCart)
        removeFromDatabaseCart(product)
        console.log(newCart);
    }

    const processCheckout = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
        navigate('/shipment');
    }

    let thankyou;
    if (orderPlaced) {
        thankyou = <img src={happyImage} alt='thankyou' ></img>
    }
    return (
        <div>
            <h1>OrderReview</h1>
            <div className="order-container">

                <div className="product-container">

                    {cart.map(pd => <ReviewItem removeProduct={removeProduct} key={pd.key} product={pd}></ReviewItem>)

                    }
                    {thankyou}

                </div>

                <div className="cart-container">

                    <Cart cart={cart}>
                        <button onClick={processCheckout} className="card-button">Proceed Checkout</button>

                    </Cart>

                </div>
            </div>


        </div>
    );
};

export default OrderReview;