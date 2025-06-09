import { ApolloClient, InMemoryCache, createHttpLink, from, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';

// Links para diferentes microservicios
const authLink = createHttpLink({
  uri: 'http://localhost:4001/graphql', // API de autenticación
});

const productsLink = createHttpLink({
  uri: 'http://localhost:4002/graphql', // API de productos
});

// Context link para agregar el token JWT
const authContextLink = setContext((_, { headers }) => {
  const token = typeof window !== 'undefined' 
    ? localStorage.getItem('auth-token') 
    : null;
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// Split link para dirigir queries a la API correcta
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    
    if (definition.kind === 'OperationDefinition') {
      // Determinar qué API usar basado en los nombres de las operaciones
      const operationName = definition.name?.value || '';
      const firstSelection = definition.selectionSet.selections[0];
      
      if (firstSelection && 'name' in firstSelection) {
        const fieldName = firstSelection.name.value;
        
        // Dirigir a API de productos si contiene estas operaciones
        const productOperations = [
          'products', 'product', 'categories', 'category',
          'createProduct', 'updateProduct', 'deleteProduct',
          'createCategory', 'updateCategory', 'deleteCategory'
        ];
        
        return productOperations.includes(fieldName);
      }
    }
    
    return false; // Por defecto, usar API de autenticación
  },
  from([authContextLink, productsLink]), // Para productos
  from([authContextLink, authLink])       // Para autenticación
);

export const apolloUnifiedClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all'
    },
    query: {
      errorPolicy: 'all'
    }
  }
}); 