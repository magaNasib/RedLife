import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export interface IAuthRouteProps { children?: ReactNode | undefined; }

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = props => {
    const { children } = props;
    const [loading, setLoading] = useState(false);
    const auth = getAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const AuthCheck = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
            } else {
                console.log('unauthorized');
                navigate('/login');
            }
        });

        return () => AuthCheck();
    }, [auth,navigate]);

    if (!auth.currentUser)
    {
        return <Navigate to="/login" />;
    }

    if (loading) return <p>loading ...</p>;

    return (
        <div>{children}</div>
    );
}

export default AuthRoute;
