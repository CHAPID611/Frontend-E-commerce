import { VStack, Input, Button, Link as ChakraLink, Box, Heading, Container } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useColorModeValue } from "../../components/ui/color-mode";
import { Link as RouterLink } from "react-router";

export default function Login() {
    return (
        <Container maxW="container.sm" py={10} px={4}>
            <Box
                p={8}
                maxW="md"
                mx="auto"
                bg="white"
                _dark={{ bg: 'gray.800' }}
                borderRadius="lg"
                boxShadow="lg"
                borderWidth="1px"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                display="flex"
                flexDirection="column"
            >
                <VStack gap={6} align="stretch">
                    <Heading textAlign="center" size="lg" color={{ base: 'gray.800', _dark: 'white' }}>Iniciar Sesión</Heading>
                    
                    <FormControl>
                        <FormLabel color={useColorModeValue('gray.700', 'white')}>Correo Electrónico</FormLabel>
                        <Input 
                            type="email" 
                            placeholder="tu@email.com"
                            size="lg"
                            bg={useColorModeValue('white', 'gray.800')}
                            borderColor={useColorModeValue('gray.200', 'gray.600')}
                            color={useColorModeValue('gray.800', 'white')}
                            _placeholder={{ color: useColorModeValue('gray.500', 'gray.400') }}
                            _hover={{ borderColor: useColorModeValue('blue.400', 'blue.300') }}
                            _focus={{ borderColor: useColorModeValue('blue.500', 'blue.400') }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel color={useColorModeValue('gray.700', 'white')}>Contraseña</FormLabel>
                        <Input 
                            type="password" 
                            placeholder="Tu contraseña"
                            size="lg"
                            bg={useColorModeValue('white', 'gray.800')}
                            borderColor={useColorModeValue('gray.200', 'gray.600')}
                            color={useColorModeValue('gray.800', 'white')}
                            _placeholder={{ color: useColorModeValue('gray.500', 'gray.400') }}
                            _hover={{ borderColor: useColorModeValue('blue.400', 'blue.300') }}
                            _focus={{ borderColor: useColorModeValue('blue.500', 'blue.400') }}
                        />
                    </FormControl>

                    <Button 
                        colorScheme="blue" 
                        size="lg"
                        width="full"
                        _hover={{ bg: useColorModeValue('blue.600', 'blue.400') }}
                    >
                        Iniciar Sesión
                    </Button>

                    <ChakraLink 
                        asChild 
                        color={useColorModeValue('blue.500', 'blue.300')}
                        textAlign="center"
                        display="block"
                        width="100%"
                        _hover={{ color: useColorModeValue('blue.600', 'blue.200') }}
                    >
                        <RouterLink to="/register">
                            ¿No tienes una cuenta? Regístrate
                        </RouterLink>
                    </ChakraLink>
                </VStack>
            </Box>
        </Container>
    );
}