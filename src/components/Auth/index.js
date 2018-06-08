import { firebaseAuth, googleProvider } from '../../constants';

export const logout = () => firebaseAuth().signOut();
export const loginWithGoogle = () => firebaseAuth().signInWithRedirect(googleProvider);
