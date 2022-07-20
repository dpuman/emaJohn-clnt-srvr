import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = (props) => {
    const { productId } = useParams();

    const [product, setProduct] = useState({})

    useEffect(() => {
        fetch(`http://localhost:5000/product/${productId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProduct(data)
            })
    }, [productId])

    return (
        <div>
            <Product key={product.key} showAdd={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;