import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Box, Spinner, Text } from '@chakra-ui/react';

export interface IAuthRouteProps { children?: ReactNode | undefined; }

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = props => {
    const { children } = props;
    const auth = getAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
            } else {
                console.log('unauthorized');
                navigate('/login');
            }
            setAuthChecked(true);
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    if (!authChecked) {
        return  <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        w={'100%'}
        fontSize={'2rem'}   
      >
        <Spinner thickness='8px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl'/>
      </Box>;
    }

    if (!auth.currentUser) {
        return <Navigate to="/login" />;
    }

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <>
            <Outlet />
        </>
    );
};
export default AuthRoute;