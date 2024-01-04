import React, { useState } from 'react';
import AuthContainer from '../../components/AuthContainer';
import ErrorText from '../../components/ErrorText';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'; 
import logging from '../../config/logging';
import { Input, Button, FormControl } from '@chakra-ui/react';

interface IPageProps {
  name: string;
  path: string;
  exact: boolean;
  protected: boolean;
}

const ForgotPasswordPage: React.FunctionComponent<IPageProps> = (props) => {
  const [sending, setSending] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  const auth = getAuth(); 

  const resetPasswordRequest = () => {
    if (error !== '') setError('');

    setSending(true);

    sendPasswordResetEmail(auth, email) 
      .then(() => {
        logging.info('Email sent.');
        setSent(true);
        setSending(false);
      })
      .catch((error) => {
        logging.error(error);
        setError(error.message);
        setSending(false);
      });
  };

  return (
    <AuthContainer header="Send Password Reset">
      {sent ? (
        <p>A link has been sent to your email with instructions.</p>
      ) : (
        <>
          <p>Please enter your email.</p>
          <FormControl>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </FormControl>
          <Button
            disabled={sending}
            mt={4}
            color={'green'}
            onClick={() => resetPasswordRequest()}
            ml={'40%'}
          >
            Send Reset Link
          </Button>
          <ErrorText error={error} />
        </>
      )}
    </AuthContainer>
  );
};

export default ForgotPasswordPage;
