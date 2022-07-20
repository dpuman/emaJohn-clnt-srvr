import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'

import './Product.css';
const Product = (props) => {
    // console.log(props.product);

    const { product, handleAddProduct } = props
    const { img, name, seller, price, stock, key } = product

    return (
        <div className="product">
            <div className="product-image">
                <img src={img} alt="pic" />
            </div>
            <div className="product-details">
                <h3 className='name' >
                    <Link to={'product/' + key}>{name}</Link>
                </h3>

                <p><small>by: {seller}</small></p>
                <br />
                <p>${price}</p>
                <p><small>only {stock} left in stock - order soon</small></p>

                {props.showAdd &&
                    <button onClick={() => { handleAddProduct(product) }} className="card-button"> <FontAwesomeIcon icon={faCartArrowDown} />add to card</button>}

            </div>
        </div>
    );
};

export default Product;