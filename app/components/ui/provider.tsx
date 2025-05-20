"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode"
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider"
import { ApolloClient } from "@apollo/client/core/ApolloClient"
import { InMemoryCache } from "@apollo/client/cache/inmemory/inMemoryCache"
import { HttpLink } from "@apollo/client/link/http"

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export function Provider({ children, ...props }: ColorModeProviderProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider {...props}>
          {children}
        </ColorModeProvider>
      </ChakraProvider>
    </ApolloProvider>
  )
}
