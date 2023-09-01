import  Ingredients  from './Ingredients'
import Cart from "./Cart";
import OrderHistory from "./OrderHistory";
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';


const AuthenticatedRoute = (props) => {
const token = props.token

if (!token) {
    return <Navigate to="/" />;
}
return <Outlet />; // Outlet will render the nested route component.
};

export default AuthenticatedRoute;