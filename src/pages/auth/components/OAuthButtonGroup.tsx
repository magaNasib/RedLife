import { Button, ButtonGroup, VisuallyHidden } from '@chakra-ui/react';
import { FbIcon, GoogleIcon, TwitterIcon } from './ProviderIcons';
import { signInWithPopup, GoogleAuthProvider, TwitterAuthProvider, FacebookAuthProvider, AuthProvider } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';

const providers = [
  { name: 'Google', icon: <GoogleIcon />, provider: new GoogleAuthProvider() },
  // { name: 'Twitter', icon: <TwitterIcon />, provider: new TwitterAuthProvider() },
  { name: 'Facebook', icon: <FbIcon />, provider: new FacebookAuthProvider() },
];

export const OAuthButtonGroup = () => {
  const navigate=useNavigate();
  const handleSignIn = async (provider: AuthProvider) => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ButtonGroup variant="secondary" spacing="4">
      {providers.map(({ name, icon, provider }) => (
        <Button key={name} flexGrow={1} onClick={() => handleSignIn(provider)}>
          <VisuallyHidden>Sign in with {name}</VisuallyHidden>
          {icon}
        </Button>
      ))}
    </ButtonGroup>
  );
};
