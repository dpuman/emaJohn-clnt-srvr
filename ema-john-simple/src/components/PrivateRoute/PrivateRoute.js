import React, { useContext } from 'react';
import {
    Navigate,
    useLocation,
    Outlet,
} from "react-router-dom";
import { UserContext } from '../../App';

function PrivateRoute() {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    let location = useLocation();

    if (!loggedInUser.email) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return <Outlet />;
}

export default PrivateRoute;