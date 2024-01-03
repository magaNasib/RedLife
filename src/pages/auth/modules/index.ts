import { signInWithPopup, AuthProvider } from "firebase/auth";
import { auth } from "../../../config/firebase";

export const SignInWithSocialMedia = (provider: AuthProvider) =>
  new Promise<any>((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
