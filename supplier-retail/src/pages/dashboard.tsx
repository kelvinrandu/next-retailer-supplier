import React,{useEffect} from "react";
import Layout from "../components/Layout";
import ItemList from "../components/ItemList";
import { ItemProps } from "../components/ItemSingle";
import { useSession } from "next-auth/client";
import { Center, Text, Spinner, Box } from "@chakra-ui/react";
import Fade from "react-reveal/Fade";
import Router from "next/router";



export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/items`);
  if (res.status !== 200) {
    // throw new Error("Failed to fetch")
    const items = [];
  }

  const items = await res.json();

  return {
    props: { items },
  };
}
type Props = {
  items: ItemProps[];
};

const Dashboard: React.FC<Props> = (props) => {
  const [session, loading] = useSession();
  const { items } = props;


  if (loading)
    return (
      <div>
        <Center h="100vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      </div>
    );

  return (
    <Layout>
      {!session && (
        <>
          <Center h="100vh">
            <Box
              borderWidth="6px"
              borderRadius="lg"
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              <Text>dashboard</Text>
            </Box>
          </Center>
        </>
      )}
      {session &&  <Fade bottom><ItemList items={items} /></Fade>}
    </Layout>
  );
};
export default Dashboard;
