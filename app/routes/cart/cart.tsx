import { Box, VStack, HStack, Image, Text, Button, Flex} from "@chakra-ui/react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router";

// Datos de ejemplo del carrito
const initialCartItems = [
  {
    id: 1,
    name: "Camisa",
    price: 29990,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    name: "Zapatos",
    price: 59990,
    quantity: 5,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1526&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    name: "Pantalón",
    price: 49990,
    quantity: 6,
    image: "https://images.unsplash.com/photo-1624378441864-6eda7eac51cb?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

export function meta() {
  return [
    { title: "Carrito de Compras" },
    { name: "description", content: "Revisa tu carrito de compras" },
  ];
}

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  
  // Función para actualizar cantidad
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) return;
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  // Función para eliminar producto
  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  // Calcular total
  const totalCompra = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Formatear precio
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-CO')}`;
  };

  return (
    <Box p={6} minH="100vh" bg="gray.50" _dark={{ bg: 'gray.900' }}>
      <VStack gap={6} maxW="6xl" mx="auto">
        {/* Header */}
        <Flex justify="space-between" align="center" w="full">
          <Text fontSize="2xl" fontWeight="bold" color="gray.800" _dark={{ color: 'white' }}>
            Carrito de Compras
          </Text>
        </Flex>

        {/* Encabezados de la tabla */}
        <Box w="full" bg="white" _dark={{ bg: 'gray.800' }} borderRadius="lg" overflow="hidden" boxShadow="sm">
          <Box bg="gray.50" _dark={{ bg: 'gray.700' }} p={4}>
            <Flex justify="space-between" align="center" fontWeight="bold" color="gray.800" _dark={{ color: 'white' }}>
              <Box flex="2">
                <Text>Artículo</Text>
              </Box>
              <Box flex="1" textAlign="center">
                <Text>Cantidad</Text>
              </Box>
              <Box flex="1" textAlign="center">
                <Text>Precio Unitario</Text>
              </Box>
              <Box flex="1" textAlign="center">
                <Text>Total</Text>
              </Box>
              <Box w="60px" textAlign="center">
                <Text>Acciones</Text>
              </Box>
            </Flex>
          </Box>

          {/* Productos del carrito */}
          <VStack gap={0}>
            {cartItems.map((item, index) => (
              <Box key={item.id} w="full">
                {index > 0 && <Box h="1px" bg="gray.200" _dark={{ bg: 'white.600' }} w="full" />}
                <Box p={4}>
                  <Flex justify="space-between" align="center">
                    {/* Columna Artículo */}
                    <Box flex="2">
                      <HStack gap={4}>
                        <Box
                          w="60px"
                          h="60px"
                          borderRadius="md"
                          overflow="hidden"
                          border="1px"
                          borderColor="gray.200"
                          _dark={{ borderColor: 'gray.600' }}
                          bg="gray.100"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            w="full"
                            h="full"
                            objectFit="cover"
                          />
                        </Box>
                        <Text fontWeight="medium" color="gray.800" _dark={{ color: 'white' }}>
                          {item.name}
                        </Text>
                      </HStack>
                    </Box>
                    
                    {/* Columna Cantidad */}
                    <Box flex="1" textAlign="center">
                      <HStack gap={2} justify="center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          minW="32px"
                          h="32px"
                          p={0}
                        >
                          <FiMinus />
                        </Button>
                        <Text minW="20px" textAlign="center" fontWeight="medium">
                          {item.quantity}
                        </Text>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          minW="32px"
                          h="32px"
                          p={0}
                        >
                          <FiPlus />
                        </Button>
                      </HStack>
                    </Box>
                    
                    {/* Columna Precio Unitario */}
                    <Box flex="1" textAlign="center">
                      <Text fontWeight="medium" color="gray.800" _dark={{ color: 'white' }}>
                        {formatPrice(item.price)}
                      </Text>
                    </Box>
                    
                    {/* Columna Total */}
                    <Box flex="1" textAlign="center">
                      <Text fontWeight="bold" color="blue.500">
                        {formatPrice(item.price * item.quantity)}
                      </Text>
                    </Box>
                    
                    {/* Columna Acciones */}
                    <Box w="60px" textAlign="center">
                      <Button
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                        minW="32px"
                        h="32px"
                        p={0}
                      >
                        <FiTrash2 />
                      </Button>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* Resumen de compra */}
        <Box w="full" maxW="md" ml="auto">
          <VStack gap={4} bg="white" _dark={{ bg: 'gray.800' }} p={6} borderRadius="lg" boxShadow="sm">
            <HStack justify="space-between" w="full">
              <Text color="gray.800" _dark={{ color: 'white' }}>Total Compra</Text>
              <Text color="gray.800" _dark={{ color: 'white' }}>IVA</Text>
            </HStack>
            <Box h="1px" bg="gray.200" _dark={{ bg: 'gray.600' }} w="full" />
            <HStack justify="space-between" w="full">
              <Text fontSize="xl" fontWeight="bold" color="gray.800" _dark={{ color: 'white' }}>
                Total
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="blue.500">
                {formatPrice(totalCompra)}
              </Text>
            </HStack>
          </VStack>
        </Box>

        {/* Botones de acción */}
        <HStack gap={4} w="full" justify="space-between" maxW="6xl">
          <Link to="/">
          <Button
            variant="outline"
            colorScheme="gray"
            size="lg"
            px={8}
            >
            Continuar Comprando
          </Button>
            </Link>
          <Button
            colorScheme="blue"
            size="lg"
            px={8}
            disabled={cartItems.length === 0}
          >
            Realizar Pago
          </Button>
        </HStack>

        {/* Mensaje si el carrito está vacío */}
        {cartItems.length === 0 && (
          <Box textAlign="center" py={12}>
            <Text fontSize="xl" color="gray.500" mb={4}>
              Tu carrito está vacío
            </Text>
            <Link to="/">
              <Button colorScheme="blue" size="lg">
                Ir a Comprar
              </Button>
            </Link>
          </Box>
        )}
      </VStack>
    </Box>
  );
} 