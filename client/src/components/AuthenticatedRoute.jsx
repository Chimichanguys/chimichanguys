import  Ingredients  from './Ingredients'
import { Navigate } from 'react-router-dom';


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