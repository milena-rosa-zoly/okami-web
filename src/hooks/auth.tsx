import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Firebase from '../utils/firebase';
import api from '../services/api';
interface AuthContextData {
  currentUser: firebase.User | undefined;
  createUser(data: UserData): any;
  signInWithEmailAndPassword(credentials: UserCredentials): Promise<void>;
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
  passwordReset(email: string): Promise<void>;
  passwordUpdate(password: string): Promise<void>;
}

interface UserData {
  email: string;
  displayName: string;
  password: string;
  photoURL: string;
}
interface UserCredentials {
  email: string;
  password: string;
}

interface AuthenticationData {
  user: firebase.User;
  token: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthenticationData | null>(() => {
    const user = localStorage.getItem('@Okami:user');
    const token = localStorage.getItem('@Okami:token');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return null;
  });

  useEffect(() => {
    Firebase.getAuth().onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();

        localStorage.setItem('@Okami:user', JSON.stringify(firebaseUser));
        localStorage.setItem('@Okami:token', token);
        setData({ user: firebaseUser, token });
      }
    });
  }, []);

  const createUser = useCallback(async (data: UserData) => {
    const response = await api.post('users', {
      name: data.displayName,
      email: data.email,
      password: data.password,
      photoURL: data.photoURL,
    });
    return response.data as firebase.User;
  }, []);

  const signInWithEmailAndPassword = useCallback(
    async ({ email, password }: UserCredentials) => {
      const { user } = await Firebase.signInWithEmailAndPassword({
        email,
        password,
      });
      const token = await Firebase.getAuth().currentUser?.getIdToken();

      if (user && token) {
        localStorage.setItem('@Okami:user', JSON.stringify(user));
        localStorage.setItem('@Okami:token', token);
        setData({ user, token });

        api.defaults.headers.authorization = `Bearer ${token}`;
      } else {
        throw new Error(
          'algo de errado não está certo no login com email e senha',
        );
      }
    },
    [],
  );

  const signInWithGoogle = useCallback(async () => {
    try {
      const { user } = await Firebase.signInWithGoogle();
      const token = await Firebase.getAuth().currentUser?.getIdToken();

      if (user && token) {
        localStorage.setItem('@Okami:user', JSON.stringify(user));
        localStorage.setItem('@Okami:token', token);
        setData({ user, token });

        api.defaults.headers.authorization = `Bearer ${token}`;
      } else {
        throw new Error('algo de errado não está certo no login do google');
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem('@Okami:user');
    localStorage.removeItem('@Okami:token');
    setData(null);
    await Firebase.signOut();
  }, []);

  const passwordReset = useCallback(async (email: string) => {
    await Firebase.passwordReset(email);
  }, []);

  const passwordUpdate = useCallback(async (password: string) => {
    await Firebase.passwordUpdate(password);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser: data?.user,
        createUser,
        signInWithEmailAndPassword,
        signInWithGoogle,
        signOut,
        passwordReset,
        passwordUpdate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
