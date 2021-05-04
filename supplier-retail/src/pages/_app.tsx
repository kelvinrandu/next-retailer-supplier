import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from 'next-auth/client'




function MyApp({ Component, pageProps }) {
  const { session } = pageProps;
  return (
    <ChakraProvider>
    <Provider  session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
    </ChakraProvider>
    )
}

export default MyApp
