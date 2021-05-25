import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from 'next-auth/client'
import theme from '../components/Theme'



function MyApp({ Component, pageProps }) {
  const { session } = pageProps;
  return (
    <ChakraProvider theme={theme}>
    <Provider  session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
    </ChakraProvider>
    )
}

export default MyApp
