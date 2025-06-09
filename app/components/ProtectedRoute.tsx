import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { Box, Spinner, Text, VStack } from '@chakra-ui/react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  // Verificar si el contexto está disponible
  let authContext;
  try {
    authContext = useAuth();
  } catch (error) {
    console.error('Error accediendo al contexto de auth:', error);
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <VStack gap={4}>
          <Text color="red.500">Error de autenticación</Text>
          <Text fontSize="sm">El sistema de autenticación no está disponible</Text>
        </VStack>
      </Box>
    );
  }
  
  const { user, isLoading } = authContext;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // No hay usuario autenticado
        navigate('/auth/login');
        return;
      }

      if (requireAdmin && user.role !== 'ADMIN' && user.role !== 'SELLER') {
        // Usuario autenticado pero sin permisos de admin
        navigate('/home');
        return;
      }
    }
  }, [user, isLoading, navigate, requireAdmin]);

  if (isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100vh"
      >
        <VStack gap={4}>
          <Spinner size="xl" color="blue.500" />
          <Text>Verificando autenticación...</Text>
        </VStack>
      </Box>
    );
  }

  if (!user) {
    return null; // Se redirigirá al login
  }

  if (requireAdmin && user.role !== 'ADMIN' && user.role !== 'SELLER') {
    return null; // Se redirigirá al home
  }

  return <>{children}</>;
} 