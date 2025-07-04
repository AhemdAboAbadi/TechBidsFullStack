import {
  useState, useEffect, useContext, createContext, ReactElement, ReactChild,
} from 'react';
import axios from 'axios';
import { User, AuthContext } from '../types';

const authContext = createContext<AuthContext | null>(null);

export const useAuth = () : any => useContext(authContext);

const useProvideAuth = () : AuthContext => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (
    email: string,
    password: string,
    callback: any = null,
  ) : Promise<any> => {
    try {
      const res = await axios.post('/api/signIn', {
        email,
        password,
      });

      setUser(res.data.user);
      if (callback) callback(null);
    } catch (err) {
      if (callback) callback(err);
    }
  };

  const signup = async (
    name : string,
    email : string,
    password : string,
    confirmPassword : string,
    callback : any = null,
  ) : Promise<any> => {
    try {
      const res = await axios.post('/api/signup', {
        name,
        email,
        password,
        confirmPassword,
      });

      setUser(res.data.user);
      if (callback) callback(null);
    } catch (err) {
      if (callback) callback(err);
    }
  };

  const logout = async (callback: any = null) : Promise<any> => {
    try {
      await axios.post('/api/logout');

      setUser(null);
      if (callback) callback(null);
    } catch (err) {
      if (callback) callback(err);
    }
  };

  const authUser = async (signal: AbortSignal) : Promise<any> => {
    try {
      const res = await axios.get('/api/auth/user', { signal });

      setUser(res.data);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    authUser(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, []);

  return {
    user,
    login,
    signup,
    logout,
  };
};

interface ProvideAuthProps {
  children: ReactChild
}

export const ProvideAuth = ({ children } : ProvideAuthProps) : ReactElement => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
