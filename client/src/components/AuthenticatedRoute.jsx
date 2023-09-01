import  Ingredients  from './Ingredients'
import Cart from "./Cart";
import OrderHistory from "./OrderHistory";
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';


const AuthenticatedRoute = (props) => {
const token = props.token
const admin = props.admin

    if (token) {
        return (
            <>
                   <Ingredients token= { token } admin={ admin }/>
            </>
        );
        
    }else{
        return <Navigate to="/" />;
    }

    
};

export default AuthenticatedRoute;