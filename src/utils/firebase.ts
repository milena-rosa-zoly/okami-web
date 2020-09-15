import * as firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

interface UserCredentials {
  email: string;
  password: string;
}

class Firebase {
  private auth: firebase.auth.Auth;
  private googleProvider: firebase.auth.GoogleAuthProvider;

  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.googleProvider = new firebase.auth.GoogleAuthProvider();

    this.googleProvider.addScope(
      'https://www.googleapis.com/auth/cloud-platform',
    );
    this.googleProvider.addScope('profile');
  }

  // *** Auth API ***
  signUpWithEmailAndPassword = ({ email, password }: UserCredentials) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signInWithEmailAndPassword = ({ email, password }: UserCredentials) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signInWithGoogle = async () => {
    return await this.auth.signInWithPopup(this.googleProvider);
  };

  signInWithCustomToken = async (token: string) => {
    this.auth.signInWithCustomToken(token).catch(error => console.error(error));
  };

  signOut = async () => {
    return await this.auth.signOut();
  };
  passwordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  passwordUpdate = (password: string) =>
    this.auth.currentUser?.updatePassword(password);

  getAuth = () => {
    return this.auth;
  };
}

export default new Firebase();
