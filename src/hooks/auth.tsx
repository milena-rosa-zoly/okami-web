import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Firebase from "../utils/firebase";

interface AuthContextData {
  currentUser: firebase.User | null;
  signUpWithEmailAndPassword(credentials: UserCredentials): Promise<void>;
  signInWithEmailAndPassword(credentials: UserCredentials): Promise<void>;
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
  passwordReset(email: string): Promise<void>;
  passwordUpdate(password: string): Promise<void>;
}

interface UserCredentials {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(() => {
    const user = localStorage.getItem("@Okami:user");
    if (user) {
      return JSON.parse(user);
    }

    return null;
  });

  useEffect(() => {
    Firebase.getAuth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        localStorage.setItem("@Okami:user", JSON.stringify(firebaseUser));
        setCurrentUser(firebaseUser);
      }
    });
  }, []);

  const signUpWithEmailAndPassword = useCallback(
    async ({ email, password }: UserCredentials) => {
      await Firebase.signUpWithEmailAndPassword({ email, password });
    },
    []
  );

  const signInWithEmailAndPassword = useCallback(
    async ({ email, password }: UserCredentials) => {
      await Firebase.signInWithEmailAndPassword({ email, password });
    },
    []
  );

  const signInWithGoogle = useCallback(async () => {
    const { user } = await Firebase.signInWithGoogle();

    if (user) {
      localStorage.setItem("@Okami:user", JSON.stringify(user));
      setCurrentUser(user);
    } else {
      throw new Error("algo de errado não está certo no login");
    }
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem("@Okami:user");
    setCurrentUser(null);
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
        currentUser,
        signUpWithEmailAndPassword,
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
