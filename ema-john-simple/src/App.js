
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import NoMatch from './components/NoMatch/NoMatch';
import OrderReview from './components/OrderReview/OrderReview';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import Inventory from './components/Inventory/Inventory';


export const UserContext = createContext();



function App() {
  const [loggedInUser, setLoggedInUser] = useState({})


  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <BrowserRouter>
        {/* <p>email:{loggedInUser.email}</p> */}
        <Header></Header>
        <Routes>

          <Route path='/' element={<Shop />} />
          <Route path='/review' element={<OrderReview />} />
          <Route path='product/:productId' element={<ProductDetails />} />
          <Route path='/login' element={<Login />} />



          <Route element={<PrivateRoute />}>
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/shipment" element={<Shipment />} />
          </Route>


          <Route path="*" element={<NoMatch />} />


        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
