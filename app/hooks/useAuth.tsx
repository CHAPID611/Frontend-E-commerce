import React, { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { LOGIN_MUTATION, REGISTER_MUTATION, ME_QUERY } from '../lib/graphql/mutations';
import { type User, type LoginInput, type RegisterInput } from '../lib/types';
import { apolloUnifiedClient } from '../lib/apollo-unified';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (input: LoginInput) => Promise<{ success: boolean; error?: string; user?: User }>;
  register: (input: RegisterInput) => Promise<{ success: boolean; error?: string; user?: User }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [loginMutation] = useMutation(LOGIN_MUTATION, { client: apolloUnifiedClient });
  const [registerMutation] = useMutation(REGISTER_MUTATION, { client: apolloUnifiedClient });
  const { data: meData, loading: meLoading } = useQuery(ME_QUERY, {
    skip: typeof window === 'undefined' || !localStorage?.getItem('auth-token'),
    errorPolicy: 'ignore',
    client: apolloUnifiedClient,
    fetchPolicy: 'cache-and-network'
  });

  useEffect(() => {
    if (meData?.me) {
      setUser(meData.me);
    }
    setIsLoading(meLoading);
  }, [meData, meLoading]);

  const login = async (input: LoginInput) => {
    try {
      const { data } = await loginMutation({
        variables: { input }
      });

      if (data?.login) {
        const { token, user } = data.login;
        localStorage.setItem('auth-token', token);
        setUser(user);
        return { success: true, user };
      }
      return { success: false, error: 'Error desconocido' };
    } catch (error: any) {
      console.error('Error en login:', error);
      return { 
        success: false, 
        error: error.message || 'Error al iniciar sesión' 
      };
    }
  };

  const register = async (input: RegisterInput) => {
    try {
      const { data } = await registerMutation({
        variables: { input }
      });

      if (data?.register) {
        const { token, user } = data.register;
        localStorage.setItem('auth-token', token);
        setUser(user);
        return { success: true, user };
      }
      return { success: false, error: 'Error desconocido' };
    } catch (error: any) {
      console.error('Error en registro:', error);
      return { 
        success: false, 
        error: error.message || 'Error al registrarse' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    setUser(null);
    // Limpiar cache de Apollo para evitar conflictos de estado
    apolloUnifiedClient.clearStore().catch(console.error);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    console.error('useAuth hook llamado fuera del AuthProvider');
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
} 