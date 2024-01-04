import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContainer from '../../components/AuthContainer';
import ErrorText from '../../components/ErrorText';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import logging from '../../config/logging';
import { initializeApp } from 'firebase/app';
import config from '../../config/config';
import { Input, Button, Text, FormControl, FormLabel } from '@chakra-ui/react';
import { AuthProvider, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

interface IPageProps {
    name: string;
    path: string;
    exact: boolean;
    protected: boolean;
    error:unknown
}
const LoginPage: React.FunctionComponent<IPageProps> = props => {
    const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const firebaseApp = initializeApp(config.firebaseConfig);
    const navigate = useNavigate();
    const auth = getAuth();

    const signInWithEmailAndPasswordd = () => {
        if (error !== '') setError('');

        setAuthenticating(true);

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                logging.info(result);
                navigate('/');
            })
            .catch(error => {
                logging.error(error);
                setAuthenticating(false);
                setError(error.message);
            });
    }

    const signInWithGoogle = async (provider: AuthProvider) => {
      
        try {
          const result = await signInWithPopup(auth, provider);
          logging.info(result);
          navigate('/');
        } catch (error) {
          logging.error(error);
          setAuthenticating(false);
          setError((error as Error)?.message || 'An unknown error occurred');
        }
      };

    return (
        <AuthContainer header="Login">
            <FormControl>
                <FormLabel>Email Address</FormLabel>
                <Input
                    type="email"
                    placeholder="Email Address"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                    autoComplete="new-password"
                    type="password"
                    name='password'
                    id='password'
                    placeholder="Enter Password"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                />
            </FormControl>
            <Button
                disabled={authenticating}
                mt={4}
                color={'green'}
                onClick={() => signInWithEmailAndPasswordd()}
                ml={'40%'}
            >
                Login
            </Button>
            <Text mt={2} textAlign="center">
                Don't have an account?{' '}
                <Link to="/register">
                    <Text color="red" display="inline">
                        Register here.
                    </Text>
                </Link>
            </Text>
            <Text mt={2} textAlign="center">
                <Link to="/forget">
                    <Text color="red" display="inline">
                    Forget your password?
                    </Text>
                </Link>
            </Text>

            <ErrorText error={error} />
            <Button
                isDisabled={authenticating}
                onClick={() => signInWithGoogle(new GoogleAuthProvider())}
                backgroundColor='#ea4335'
                borderColor='#ea4335'
                _hover={{ backgroundColor: '#d52d22', borderColor: '#d52d22' }}
                ml={'30%'}
                mt={4}

            >
                <i className="fab fa-google mr-2"></i> Sign in with Google
            </Button>
        </AuthContainer>
    );
}

export default LoginPage;