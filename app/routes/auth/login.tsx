import { VStack, Input, Button, Link as ChakraLink, Box, Heading, Container } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useColorModeValue } from "../../components/ui/color-mode";
import { Link as RouterLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { type LoginInput } from "../../lib/types";


export default function Login() {
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }
    } = useForm<LoginInput>();

    const onSubmit = async (data: LoginInput) => {
        setError("");
        const result = await login(data);
        
        if (result.success && result.user) {
            // Redirigir según el rol del usuario
            if (result.user.role === 'ADMIN' || result.user.role === 'SELLER') {
                navigate("/admin/products");
            } else {
                navigate("/");
            }
        } else {
            setError(result.error || "Error al iniciar sesión");
        }
    };

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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack gap={6} align="stretch">
                        <Heading textAlign="center" size="lg" color={{ base: 'gray.800', _dark: 'white' }}>
                            Iniciar Sesión
                        </Heading>
                        
                        {error && (
                            <Box color="red.500" textAlign="center" fontSize="sm">
                                {error}
                            </Box>
                        )}
                        
                        <FormControl isInvalid={!!errors.email}>
                            <FormLabel color={useColorModeValue('gray.700', 'white')}>Correo Electrónico</FormLabel>
                            <Input 
                                {...register("email", { 
                                    required: "El email es requerido",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Email inválido"
                                    }
                                })}
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
                            {errors.email && (
                                <Box color="red.500" fontSize="sm" mt={1}>
                                    {errors.email.message}
                                </Box>
                            )}
                        </FormControl>

                        <FormControl isInvalid={!!errors.password}>
                            <FormLabel color={useColorModeValue('gray.700', 'white')}>Contraseña</FormLabel>
                            <Input 
                                {...register("password", { 
                                    required: "La contraseña es requerida",
                                    minLength: {
                                        value: 6,
                                        message: "La contraseña debe tener al menos 6 caracteres"
                                    }
                                })}
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
                            {errors.password && (
                                <Box color="red.500" fontSize="sm" mt={1}>
                                    {errors.password.message}
                                </Box>
                            )}
                        </FormControl>

                        <Button 
                            type="submit"
                            colorScheme="blue" 
                            size="lg"
                            width="full"
                            loading={isSubmitting || isLoading}
                            _hover={{ bg: useColorModeValue('blue.600', 'blue.400') }}
                        >
                            {isSubmitting || isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                        </Button>

                        <ChakraLink 
                            asChild 
                            color={useColorModeValue('blue.500', 'blue.300')}
                            textAlign="center"
                            display="block"
                            width="100%"
                            _hover={{ color: useColorModeValue('blue.600', 'blue.200') }}
                        >
                            <RouterLink to="/auth/register">
                                ¿No tienes una cuenta? Regístrate
                            </RouterLink>
                        </ChakraLink>
                    </VStack>
                </form>
            </Box>
        </Container>
    );
}