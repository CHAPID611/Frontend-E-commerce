import { Box, Flex, HStack, Button, Image } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router";
import { ColorModeButton } from "./color-mode";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <Box 
            as="nav" 
            bg="white"
            _dark={{ bg: 'gray.800' }}
            px={4} 
            py={2}
            borderBottom="1px"
            borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
            position="sticky"
            top="0"
            zIndex="sticky"
        >
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <HStack gap={8} alignItems={'center'}>
                    <Link to="/">
                        <Box 
                            w="40px" 
                            h="40px" 
                            borderRadius="full" 
                            overflow="hidden"
                            border="2px"
                            borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
                            _hover={{ transform: 'scale(1.05)' }}
                            transition="transform 0.2s"
                        >
                            <Image 
                                src="/logo.png" 
                                alt="Logo E-Commerce"
                                w="full"
                                h="full"
                                objectFit="cover"
                            />
                        </Box>
                    </Link>
                </HStack>

                <HStack gap={4}>
                    {user && (user.role === 'ADMIN' || user.role === 'SELLER') ? (
                        // Navegación para ADMIN/SELLER
                        <>
                            <Link to="/admin/products">
                                <Button variant="ghost">Dashboard</Button>
                            </Link>
                            <Button variant="ghost" onClick={() => {
                                logout();
                                navigate("/auth/login");
                            }}>
                                Cerrar Sesión ({user.email})
                            </Button>
                        </>
                    ) : (
                        // Navegación para CUSTOMER o usuarios no autenticados
                        <>
                            <Link to="/">
                                <Button variant="ghost">Inicio</Button>
                            </Link>
                            {user && (
                                <Link to="/cart">
                                    <Button variant="ghost">Carrito</Button>
                                </Link>
                            )}
                            
                            {user ? (
                                <Button variant="ghost" onClick={() => {
                                    logout();
                                    navigate("/auth/login");
                                }}>
                                    Cerrar Sesión ({user.email})
                                </Button>
                            ) : (
                                <>
                                    <Link to="/auth/login">
                                        <Button variant="ghost">Iniciar Sesión</Button>
                                    </Link>
                                    <Link to="/auth/register">
                                        <Button colorScheme="blue">Registrarse</Button>
                                    </Link>
                                </>
                            )}
                        </>
                    )}
                    
                    <ColorModeButton />
                </HStack>
            </Flex>
        </Box>
    )
}