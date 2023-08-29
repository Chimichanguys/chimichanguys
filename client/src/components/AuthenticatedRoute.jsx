
import { Navigate } from 'react-router-dom';

const AuthenticatedRoute = ({ token, children }) => {


    if (token) {
        return children;
        
    }else{
        return <Navigate to="/" />;
    }

    
};

export default AuthenticatedRoute;