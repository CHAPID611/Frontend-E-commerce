import type { Route } from "./+types/home";
import { Box, SimpleGrid, Image, Text, VStack, Badge, Button } from "@chakra-ui/react";

const products = [
    {
        id: 1,
        name: "Camiseta Algodón Blanca",
        price: 54.999,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Camisetas"
    },
    {
        id: 2,
        name: "Sueter Algodón Negro",
        price: 69.999,
        image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Sueter"
    },
    {
        id: 3,
        name: "Camiseta Algodón Negra",
        price: 79.999,
        image: "https://images.unsplash.com/photo-1502389614483-e475fc34407e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Camisetas"
    },
    { 
        id: 4,
        name: "Vaquero Azul",
        price: 129.999,
        image: "https://images.unsplash.com/photo-1624378441864-6eda7eac51cb?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Pantalones"
    }
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Bienvenido a Ecommerce" },
  ];
}

export default function Home() {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
        {products.map((product) => (
          <Box
            key={product.id}
            bg="white"
            _dark={{ bg: 'gray.800' }}
            borderRadius="lg"
            overflow="hidden"
            borderWidth="1px"
            borderColor={{ base: 'gray.200', _dark: 'white' }}
            color={{ base: 'gray.800', _dark: 'white' }}
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.02)' }}
          >
            <Image
              src={product.image}
              alt={product.name}
              height="200px"
              width="100%"
              objectFit="cover"
            />
            <VStack p={4} align="start" gap={3}>
              <Badge colorScheme="blue">{product.category}</Badge>
              <Text fontSize="xl" fontWeight="bold">
                {product.name}
              </Text>
              <Text fontSize="2xl" color="blue.500" fontWeight="bold">
                ${product.price}
              </Text>
              <Button colorScheme="blue" width="full">
                Agregar al Carrito
              </Button>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}


