import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useContext } from 'react';
import { serContext, UserContext } from '../../App';

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => {
        console.log('form submitted', data)
    };

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

            <input name="name" {...register("exampleRequired", { required: true })} placeholder="Your Name" />
            {errors.name && <span className="error">Name is required</span>}


            <input defaultValue={loggedInUser.email} name="email" {...register("example", { required: true })} />
            {errors.email && <span className="error">Email is required</span>}

            <input name="address" {...register("exampleRequired", { required: true })} placeholder="Your Address" />
            {errors.address && <span className="error">Address is required</span>}

            <input name="phone" {...register("exampleRequired", { required: true })} placeholder="Your Phone Number" />
            {errors.phone && <span className="error">Phone Number is required</span>}

            <input type="submit" />
        </form>
    );
};

export default Shipment;



// import React, { useContext } from 'react';
// import { useForm } from 'react-hook-form';
// import { UserContext } from '../../App';
// import './Shipment.css'

// const Shipment = () => {
//     const [loggedInUser, setLoggedInUser] = useContext(UserContext)
//     const { register, handleSubmit, watch, formState: { errors } } = useForm();
//     const onSubmit = data => console.log(data);

//     console.log(watch("example")); // watch input value by passing the name of it

//     return (

//         <form className={'ship-form'} onSubmit={handleSubmit(onSubmit)}>


//             <input name='name' placeholder='Name' defaultValue={loggedInUser.name}  {...register("exampleRequired", { required: true })} />
//             {errors.exampleRequired && <span>This field is required</span>}



//             <input name="email" placeholder='Your Email' defaultValue={loggedInUser.email}  {...register("exampleRequired", { required: true })} />
//             {errors.exampleRequired && <span>This field is required</span>}

//             <input name="address" placeholder='Your Address'   {...register("exampleRequired", { required: true })} />
//             {errors.exampleRequired && <span>This field is required</span>}

//             <input name="phone" placeholder='Your Phone'   {...register("exampleRequired", { required: true })} />
//             {errors.exampleRequired && <span>This field is required</span>}



//             <input type="submit" />
//         </form>
//     );
// };

// export default Shipment;