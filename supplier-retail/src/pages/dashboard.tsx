import React,{useEffect,useState} from "react";
import Layout from "../components/Layout";
import ItemList from "../components/ItemList";
import { ItemProps } from "../components/ItemSingle";
import { useSession } from "next-auth/client";
import { Center, Link, Spinner, Box ,Flex} from "@chakra-ui/react";
import Fade from "react-reveal/Fade";
import SearchBar from "../components/SearchBar";




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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

    const updateInput = async (input) => {
      const filtered = items.filter((item) => {
        return item.name.toLowerCase().includes(input.toLowerCase());
      });
      setSearchQuery(input);
      setFilteredItems(filtered);
    };


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
              <Link href="/signin">signin</Link>
            </Box>
          </Center>
        </>
      )}
      {session && (
        <>
          {" "}
          <Fade bottom>
            <Flex direction="column" justify="center" align="center" pt={20}>
              <Box as={"div"}>
                {/* <input
              key="random1"
              value={searchQuery}
              placeholder={"search country"}
              onChange={(e) => updateInput(e.target.value)}
            /> */}
                <SearchBar
                  searchQuery={searchQuery}
                  updateInput={updateInput}
                />
              </Box>
              <ItemList items={filteredItems} />
            </Flex>
          </Fade>
        </>
      )}
    </Layout>
  );
};
export default Dashboard;
