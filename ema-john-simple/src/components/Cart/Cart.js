import React from 'react';



const Cart = (props) => {
    const cart = props.cart
    const total = cart.reduce((total, prd) => total + prd.price * prd.quantity || 1, 0)


    let shippingCost = 0
    if (total > 100) {
        shippingCost = 0;
    }
    else if (total > 50) {
        shippingCost = 15;

    }
    else if (total > 25) {
        shippingCost = 8;
    }
    const vat = total / 10

    const fixNumber = (number) => {
        let prefix = number.toFixed(2)
        return Number(prefix)
    }

    const grandTotal = total + shippingCost + vat
    return (
        <div>
            <h2>Order Summary</h2>
            <h4>Items added:{cart.length} </h4>
            <p>Product Price: {fixNumber(total)}</p>
            <p>Vat + Tax : {fixNumber(vat)}</p>
            <p><small>Shipping Cost: {shippingCost}</small></p>
            <p>Total: {fixNumber(grandTotal)}</p>
            <br />
            {
                props.children
            }


        </div>
    );
};

export default Cart;