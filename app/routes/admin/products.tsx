import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Heading, 
  IconButton,
  Badge,
  Image,
  Text,
  Input,
  Flex,
  Grid
} from '@chakra-ui/react';
import { FiEdit, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import { useQuery, useMutation, ApolloProvider } from '@apollo/client';
import { useNavigate } from 'react-router';

import { useAuth } from '../../hooks/useAuth';
import { apolloUnifiedClient } from '../../lib/apollo-unified';
import { GET_PRODUCTS, DELETE_PRODUCT } from '../../lib/graphql/products';
import { type Product } from '../../lib/types';
import { useColorModeValue } from '../../components/ui/color-mode';
import { ProtectedRoute } from '../../components/ProtectedRoute';

function ProductsAdmin() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Verificar si el usuario es admin o seller
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login');
      return;
    }
    
    if (user?.role !== 'ADMIN' && user?.role !== 'SELLER') {
      navigate('/home');
      return;
    }
  }, [isAuthenticated, user, navigate]);

  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS, {
    variables: {
      searchName: searchTerm || undefined,
      limit: 50,
      sortBy: 'name',
      sortOrder: 'ASC'
    },
    client: apolloUnifiedClient,
    errorPolicy: 'all'
  });

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    client: apolloUnifiedClient,
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Error al eliminar producto:', error);
    }
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteProduct({ variables: { id } });
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    }
  };

  if (!isAuthenticated || (user?.role !== 'ADMIN' && user?.role !== 'SELLER')) {
    return null;
  }

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text textAlign="center">Cargando productos...</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Box>
        {/* Header */}
        <Box mb={6}>
          <Heading size="lg" mb={2}>
            Gestión de Productos
          </Heading>
          <Text color="gray.600">
            Administra el inventario de productos de tu tienda
          </Text>
        </Box>

        {/* Error Alert */}
        {error && (
          <Box 
            bg="red.50" 
            border="1px" 
            borderColor="red.200" 
            borderRadius="md" 
            p={4} 
            mb={6}
            color="red.800"
          >
            Error al cargar productos: {error.message}
          </Box>
        )}

        {/* Actions Bar */}
        <Flex gap={4} justify="space-between" mb={6} flexWrap="wrap">
          <Flex gap={2} flex={1} maxW="400px">
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IconButton
              aria-label="Buscar"
              onClick={() => refetch()}
            >
              <FiSearch />
            </IconButton>
          </Flex>
          
          <Button colorScheme="blue">
            <FiPlus style={{ marginRight: '8px' }} />
            Nuevo Producto
          </Button>
        </Flex>

        {/* Products Grid */}
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
          {data?.products?.map((product: Product) => (
            <Box 
              key={product.id} 
              p={4}
              bg={bg}
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="lg"
              shadow="sm"
            >
              <Box>
                <Image
                  src={product.mainImageUrl || "https://via.placeholder.com/300x200"}
                  alt={product.name}
                  height="200px"
                  width="100%"
                  objectFit="cover"
                  borderRadius="md"
                  mb={4}
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/300x200";
                  }}
                />
                
                <Heading size="md" mb={2} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                  {product.name}
                </Heading>
                
                <Text 
                  fontSize="sm" 
                  color="gray.600" 
                  mb={3}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  display="-webkit-box"
                  style={{
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical"
                  }}
                >
                  {product.description}
                </Text>
                
                <Flex justify="space-between" align="center" mb={3}>
                  <Text fontSize="xl" fontWeight="bold" color="blue.600">
                    ${product.price.toFixed(2)}
                  </Text>
                  <Badge
                    colorScheme={product.stock > 10 ? 'green' : product.stock > 0 ? 'yellow' : 'red'}
                  >
                    {product.stock} unidades
                  </Badge>
                </Flex>
                
                <Flex justify="space-between" align="center" mb={4}>
                  <Text fontSize="sm" color="gray.500">
                    {product.category.name}
                  </Text>
                  <Badge
                    colorScheme={product.stock > 0 ? 'green' : 'red'}
                  >
                    {product.stock > 0 ? 'Disponible' : 'Agotado'}
                  </Badge>
                </Flex>
                
                <Flex gap={2}>
                  <Button 
                    size="sm" 
                    colorScheme="blue" 
                    variant="outline" 
                    flex={1}
                  >
                    <FiEdit style={{ marginRight: '4px' }} />
                    Editar
                  </Button>
                  <IconButton
                    aria-label="Eliminar producto"
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                    onClick={() => handleDelete(product.id)}
                  >
                    <FiTrash2 />
                  </IconButton>
                </Flex>
              </Box>
            </Box>
          ))}
        </Grid>

        {data?.products?.length === 0 && (
          <Box textAlign="center" py={8}>
            <Text color="gray.500" fontSize="lg">
              No se encontraron productos
            </Text>
            <Text color="gray.400" fontSize="sm">
              {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Comienza creando tu primer producto'}
            </Text>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default function ProductsAdminWithProvider() {
  return <ProductsAdmin />;
} 