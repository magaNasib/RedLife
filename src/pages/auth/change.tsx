import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContainer from '../../components/AuthContainer';
import ErrorText from '../../components/ErrorText';
import { getAuth, updatePassword } from "firebase/auth";
import logging from '../../config/logging';
import { initializeApp } from 'firebase/app';
import config from '../../config/config';
import { Input, Button, FormControl, FormLabel } from '@chakra-ui/react';

interface IPageProps {
    name: string;
    path: string;
    exact: boolean;
    protected: boolean;
}
const ChangePasswordPage: React.FunctionComponent<IPageProps> = props => {
    const [changing, setChanging] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [old, setOld] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const firebaseApp = initializeApp(config.firebaseConfig);
    const navigate = useNavigate();
    const auth = getAuth();

    const passwordChangeRequest = async () => {
        if (password !== confirm) {
            setError('Make sure your passwords are matching');
            return;
        }

        if (error !== '') setError('');

        setChanging(true);

        try {
            await updatePassword(auth.currentUser!, password);
            logging.info('Password change successful.');
            navigate('/')
        } catch (error) {
            logging.error(error);
            setChanging(false);
            setError((error as Error).message);
        }
    }

    // useEffect(() => {
    //     if (auth.currentUser?.providerData[0]?.providerId !== 'password') {
    //         return navigate('/');
    //     }
    // }, [auth.currentUser?.providerData, navigate]);

    return (
        <AuthContainer header="Change password">
            <FormControl>
                <FormLabel>Current password</FormLabel>
                <Input
                    autoComplete="new-password"
                    type="password"
                    name="oldPassword"
                    id="oldPassword"
                    placeholder="Current Password"
                    onChange={event => setOld(event.target.value)}
                    value={old}
                />
            </FormControl>
            <FormControl>
                <FormLabel>New password</FormLabel>
                <Input
                    autoComplete="new-password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Confirm your new password</FormLabel>
                <Input
                    autoComplete="new-password"
                    type="password"
                    name="confirm"
                    id="confirm"
                    placeholder="Confirm Password"
                    onChange={event => setConfirm(event.target.value)}
                    value={confirm}
                />
            </FormControl>
            <Button
                disabled={changing}
                mt={4}
                color={'green'}
                onClick={() => passwordChangeRequest()}
                ml={'40%'}
            >
                Change Password
            </Button>
            <ErrorText error={error} />

        </AuthContainer>
    );
}

export default ChangePasswordPage;