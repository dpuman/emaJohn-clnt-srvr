import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {
    const handleAddProducts = () => {
        fetch(`http://localhost:5000/add-products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fakeData)
        })
    }

    return (
        <div>
            <h1>Inventory</h1>
            <p>Button is disabled</p>
            <button disabled onClick={handleAddProducts}>Add Products</button>
        </div>
    );
};

export default Inventory;