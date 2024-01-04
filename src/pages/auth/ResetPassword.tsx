import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContainer from '../../components/AuthContainer';
import ErrorText from '../../components/ErrorText';
import logging from '../../config/logging';
import { FormControl, Spinner, Input, Button } from '@chakra-ui/react';
import { confirmPasswordReset, getAuth, verifyPasswordResetCode } from 'firebase/auth';
// import queryString from 'query-string';
import { useSearchParams } from 'react-router-dom';

interface IPageProps {
    name: string;
    path: string;
    exact: boolean;
    protected: boolean;
}

const ResetPasswordPage: React.FunctionComponent<IPageProps> = props => {
    const [verifying, setVerifying] = useState<boolean>(true);
    const [verified, setVerified] = useState<boolean>(false);
    const [changing, setChanging] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [oobCode, setOobCode] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();
    const auth = getAuth();
    const [searchParams] = useSearchParams();


    // useEffect(() => {
    //     logging.info('Extracting code');

    //     let stringParams = queryString.parse(props.location.search);

    //     if (stringParams) {
    //         let oobCode = stringParams.oobCode as string;

    //         if (oobCode) {
    //             logging.info('Code found');
    //             verifyPasswordResetLink(oobCode);
    //         }
    //         else {
    //             logging.error('Unable to find code');
    //             setVerified(false);
    //             setVerifying(false);
    //         }
    //     }
    //     else {
    //         logging.error('Unable to find code');
    //         setVerified(false);
    //         setVerifying(false);
    //     }
    //     // eslint-disable-next-line
    // }, []);

    useEffect(() => {
        logging.info('Extracting code');
    
        const oobCode = searchParams.get('oobCode');
    
        if (oobCode) {
            logging.info('Code found');
            verifyPasswordResetLink(oobCode);
        } else {
            logging.error('Unable to find code');
            setVerified(false);
            setVerifying(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const verifyPasswordResetLink = (_oobCode: string) => {
        verifyPasswordResetCode(auth,oobCode)
            .then(result => {
                logging.info(result);
                setOobCode(_oobCode);
                setVerified(true);
                setVerifying(false);
            })
            .catch(error => {
                logging.error(error);
                setVerified(false);
                setVerifying(false);
            });
    }

    const passwordResetRequest = () => {
        if (password !== confirm) {
            setError('Make sure your passwords are matching');
            return;
        }

        if (error !== '') setError('');

        setChanging(true);

        confirmPasswordReset(auth, oobCode, password)
            .then(() => {
                navigate('/login');
            })
            .catch(error => {
                logging.error(error);
                setError(error.message);
                setChanging(false);
            })


    }

    return (
        <AuthContainer header="Reset Password">
            {verifying ?
                <Spinner color="info" />
                :
                <>
                    {verified ?
                        <>
                            <p>Please enter a strong password.</p>
                            <FormControl>
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
                                onClick={() => passwordResetRequest()}
                                mt={4}
                                color={'green'}
                                ml={'40%'}
                            >
                                Reset Password
                            </Button>
                            <ErrorText error={error} />
                        </>
                        :
                        <p>Invalid link.</p>
                    }
                </>
            }
        </AuthContainer>
    );
}

export default ResetPasswordPage;