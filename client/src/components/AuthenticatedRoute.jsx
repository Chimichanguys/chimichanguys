import  Ingredients  from './Ingredients'
import { Navigate } from 'react-router-dom';

const AuthenticatedRoute = (props) => {
const token = props.token

    if (token) {
        return (
            <>
                   <Ingredients token= { token } />
            </>
        );
        
    }else{
        return <Navigate to="/" />;
    }

    
};

export default AuthenticatedRoute;