import { ChakraProvider } from "@chakra-ui/react"
import theme from '../components/Theme'
import { UserProvider } from "@auth0/nextjs-auth0";
import { ProvideSearch } from "../utils/search";



function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <ProvideSearch>
          <Component {...pageProps} />
        </ProvideSearch>
      </UserProvider>
    </ChakraProvider>
  );
}

export default MyApp
