import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Shop = () => {

    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    //ALL PRODUCTS
    useEffect(() => {
        fetch(`http://localhost:5000/products`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProducts(data)
            })
    }, [])

    //CART PRODUCTS
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

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey)
        let count = 1;
        let newCart;

        if (sameProduct) {
            count = sameProduct.quantity + 1
            sameProduct.quantity = count
            const others = cart.filter(pd => pd.key !== toBeAddedKey)
            newCart = [...others, sameProduct]
        }
        else {
            product.quantity = 1
            newCart = [...cart, product]
        }

        setCart(newCart)
        addToDatabaseCart(product.key, count)
    }

    return (
        <div className='shop-container'>

            <div className="product-container">
                {
                    products.map(pd => <Product showAdd={true} key={pd.key} handleAddProduct={handleAddProduct} product={pd}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>

                    <Link to='/review'>
                        <button className="card-button"> <FontAwesomeIcon icon={faCartArrowDown} />Order Review</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;