import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, Text, FormControl, FormLabel } from '@chakra-ui/react';
import ErrorText from '../../components/ErrorText';
// import { auth } from '../../config/firebase';
import AuthContainer from '../../components/AuthContainer';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import config from '../../config/config';
import logging from '../../config/logging';


interface IPageProps {
    name: string;
    path: string; 
    exact: boolean; 
    protected: boolean;
}

const RegisterPage: React.FunctionComponent<IPageProps> = (props) => {
    const [registering, setRegistering] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const firebaseApp = initializeApp(config.firebaseConfig);
    const navigate = useNavigate();
    const auth = getAuth();


    const signUpWithEmailAndPassword = () => {
        if (password !== confirm) {
            setError('Please make sure your passwords match.');
            return;
        }

        if (error !== '') setError('');

        setRegistering(true);


        createUserWithEmailAndPassword(auth, email, password)
            .then((result: any) => {
                logging.info(result);
                console.log(result);
                navigate('login')
            })
            .catch((error: { code: string | string[] }) => {
                if (error.code.includes('auth/weak-password')) {
                    setError('Please enter a stronger password.');
                } else if (error.code.includes('auth/email-already-in-use')) {
                    setError('Email already in use.');
                } else {
                    setError('Unable to register. Please try again later.');
                }

                setRegistering(false);
            });

    };

    return (
        <AuthContainer header="Register">
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
                    placeholder="Enter Password"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                    autoComplete="new-password"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(event) => setConfirm(event.target.value)}
                    value={confirm}
                />
            </FormControl>
            <Button
                disabled={registering}
                mt={4}
                color={'green'}
                onClick={() => signUpWithEmailAndPassword()}
                ml={'40%'}
            >
                Sign Up
            </Button>
            <Text mt={2} textAlign="center">
                Already have an account?{' '}
                <Link to="/login">
                    <Text color="red" display="inline">
                        Login.
                    </Text>
                </Link>
            </Text>

            <ErrorText error={error} />
        </AuthContainer>
    );
};

export default RegisterPage;
