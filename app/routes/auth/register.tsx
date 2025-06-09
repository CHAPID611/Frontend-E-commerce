import { VStack, Input, Button, Link as ChakraLink, Box, Heading, Container, SimpleGrid } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useColorModeValue } from "../../components/ui/color-mode";
import { Link as RouterLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { type RegisterInput } from "../../lib/types";

export default function Register() {
    const { register: registerUser, isLoading } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }
    } = useForm<RegisterInput>();

    const onSubmit = async (data: RegisterInput) => {
        setError("");
        setSuccess("");
        
        const result = await registerUser(data);
        
        if (result.success && result.user) {
            const user = result.user;
            setSuccess("¡Usuario registrado exitosamente! Redirigiendo...");
            setTimeout(() => {
                // Redirigir según el rol del usuario
                if (user.role === 'ADMIN' || user.role === 'SELLER') {
                    navigate("/admin/products");
                } else {
                    navigate("/");
                }
            }, 2000);
        } else {
            setError(result.error || "Error al registrarse");
        }
    };

    return (
        <Container maxW="container.sm" py={10} px={4}>
            <Box
                p={8}
                maxW="md"
                mx="auto"
                bg={useColorModeValue('white', 'gray.900')}
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
                        <Heading textAlign="center" size="lg" color={useColorModeValue('gray.800', 'white')}>
                            Crear Cuenta
                        </Heading>
                        
                        {error && (
                            <Box color="red.500" textAlign="center" fontSize="sm">
                                {error}
                            </Box>
                        )}
                        
                        {success && (
                            <Box color="green.500" textAlign="center" fontSize="sm">
                                {success}
                            </Box>
                        )}
                        
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                            <FormControl isInvalid={!!errors.firstName}>
                                <FormLabel color={useColorModeValue('gray.700', 'white')}>Nombre</FormLabel>
                                <Input 
                                    {...register("firstName", { 
                                        required: "El nombre es requerido",
                                        minLength: {
                                            value: 2,
                                            message: "El nombre debe tener al menos 2 caracteres"
                                        }
                                    })}
                                    type="text" 
                                    placeholder="Tu nombre"
                                    size="lg"
                                    bg={useColorModeValue('white', 'gray.800')}
                                    borderColor={useColorModeValue('gray.200', 'gray.600')}
                                    color={useColorModeValue('gray.800', 'white')}
                                    _placeholder={{ color: useColorModeValue('gray.500', 'gray.400') }}
                                    _hover={{ borderColor: useColorModeValue('blue.400', 'blue.300') }}
                                    _focus={{ borderColor: useColorModeValue('blue.500', 'blue.400') }}
                                />
                                {errors.firstName && (
                                    <Box color="red.500" fontSize="sm" mt={1}>
                                        {errors.firstName.message}
                                    </Box>
                                )}
                            </FormControl>

                            <FormControl isInvalid={!!errors.lastName}>
                                <FormLabel color={useColorModeValue('gray.700', 'white')}>Apellido</FormLabel>
                                <Input 
                                    {...register("lastName", { 
                                        required: "El apellido es requerido",
                                        minLength: {
                                            value: 2,
                                            message: "El apellido debe tener al menos 2 caracteres"
                                        }
                                    })}
                                    type="text" 
                                    placeholder="Tu apellido"
                                    size="lg"
                                    bg={useColorModeValue('white', 'gray.800')}
                                    borderColor={useColorModeValue('gray.200', 'gray.600')}
                                    color={useColorModeValue('gray.800', 'white')}
                                    _placeholder={{ color: useColorModeValue('gray.500', 'gray.400') }}
                                    _hover={{ borderColor: useColorModeValue('blue.400', 'blue.300') }}
                                    _focus={{ borderColor: useColorModeValue('blue.500', 'blue.400') }}
                                />
                                {errors.lastName && (
                                    <Box color="red.500" fontSize="sm" mt={1}>
                                        {errors.lastName.message}
                                    </Box>
                                )}
                            </FormControl>
                        </SimpleGrid>

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
                            {isSubmitting || isLoading ? "Registrando..." : "Registrarse"}
                        </Button>

                        <ChakraLink 
                            asChild 
                            color={useColorModeValue('blue.500', 'blue.300')}
                            textAlign="center"
                            display="block"
                            width="100%"
                            _hover={{ color: useColorModeValue('blue.600', 'blue.200') }}
                        >
                            <RouterLink to="/auth/login">
                                ¿Ya tienes una cuenta? Inicia sesión
                            </RouterLink>
                        </ChakraLink>
                    </VStack>
                </form>
            </Box>
        </Container>
    );
}