import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from 'next-auth/client'
import theme from '../components/Theme'
import "../../style/style.css";
import { UserProvider } from "@auth0/nextjs-auth0";



function MyApp({ Component, pageProps }) {
  const { session } = pageProps;
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <Provider session={pageProps.session}>
          <Component {...pageProps} />
        </Provider>
      </UserProvider>
    </ChakraProvider>
  );
}

export default MyApp
