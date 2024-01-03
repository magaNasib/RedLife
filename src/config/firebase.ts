import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import config from '../config/config';

const firebaseApp = initializeApp(config.firebaseConfig);

export const Providers = {
    google: new GoogleAuthProvider()
}

export const auth = getAuth(firebaseApp);
export default firebaseApp;

console.log(auth);

