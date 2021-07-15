import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import { useSession, getSession } from "next-auth/client";
import prisma from "../../lib/prisma";
import { ItemProps } from "../components/ItemSingle";
import AddItem from "../components/AddItem";
import EditItem from "../components/EditItem";
import {
  HStack,
  Center,
  Box,

  Spinner,
  Flex,
  Text,
} from "@chakra-ui/react";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { orders: [] } };
  }

  const items = await prisma.item.findMany({
    where: {
      user: { email: session.user.email },
    },
    select: {
      id: true,
      name: true,
      quantity: true,
      price: true,
    },
  });
  return {
    props: { items },
  };
};

type Props = {
  items: ItemProps[];
};
const items: React.FC<Props> = (props) => {
  const [session, loading] = useSession();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const handleSubmit = () => {
    console.log('here');
  };

  if (!session)
    return (
      <div>
        <Layout>
          <Center h="100vh">not login in</Center>
        </Layout>
      </div>
    );
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
              <Text>items</Text>
            </Box>
          </Center>
        </>
      )}
      <Center mt={70}>
        <HStack>
          <Box
            as="div"
            alignItems="center"
            justifyContent="center"
            display="Flex"
            flexDirection="column"
          >
            {props.items.map((item) => (
              <>
                {" "}
                <Flex w={50}>
                  <EditItem item ={item}/>

                </Flex>
              </>
            ))}
          </Box>
          <AddItem />
        </HStack>
      </Center>
    </Layout>
  );
};

export default items;
