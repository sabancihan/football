import { Icon, Input, Flex, Text, Spinner, LinkBox, MenuList, Menu, LinkOverlay, Box, Avatar, InputGroup, InputLeftAddon, InputLeftElement, HStack, Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useDebounce from  "../hook/useDebounce";
import { ApolloClient, gql, HttpLink, InMemoryCache, NormalizedCacheObject, useApolloClient, useQuery } from "@apollo/client";

import InterfacePlayer from "../models/Player";
import { string } from "yup";
import { SearchIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";
interface PlayerInterface {
    name: string;
    slug: string;
    photo: string;
    team:{
        name: string;
        logo: string;
    };
}



const convertToQuery = (graphqlQuery: string) => gql`query {playerSearch(input : {limit:5,path:"name",query:"${graphqlQuery}"}) { name slug photo team{name logo} }}`;

const SearchBar = () => {
  const [players, setPlayer] = useState<PlayerInterface[]>([]);
  const [search, setSearch] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();

  const router = useRouter();

  
  const debouncedSearch = useDebounce(search, 500);

  const [focusedSearch, setFocusedSearch] = useState(false);


  useEffect(() => {
    // search the api

    async function fetchData() {
      setLoading(true);
      
      setPlayer([]);

      const data = await client.query({
        query: convertToQuery(debouncedSearch),



      })
        



        


        
      

      console.log(data);

      setPlayer(data.data.playerSearch);
      setLoading(false);
    }

    if (debouncedSearch) fetchData();
  }, [debouncedSearch,client]);

  return (
  <div onFocus={ () => setFocusedSearch(true)} onBlur={() => setFocusedSearch(false)}>
    <HStack zIndex={200}  >
      <InputGroup>
      <InputLeftElement>
      <SearchIcon/>
      </InputLeftElement>
      <Input placeholder="Search"
      value={search || ""}
    type= "search"
    colorScheme="teal" 
    onChange={(e) => setSearch(e.target.value)}
    />
      </InputGroup>

  {loading && <Spinner />}
  </HStack>


  {focusedSearch &&  
    <div style={{position: "absolute", zIndex: 998}}>
    {players.map((player) => {
          return (
      
            <LinkBox key={player.slug}
  backgroundColor="Background"
  position={"relative"}
  width= "250px"
  maxHeight={70}
  z-index= "999"
  rounded="lg"
  _hover={{
    color: "gray",
    transform: 'scale(1.05)',
    transition: 'all 0.5s ease',
    opacity: 0.8,
  }}                  
  as="article" borderWidth='1px' >

               
            <Flex key={player.slug} p={4} >
              
                <Avatar
                  src={player.photo}
                  width="40px"
                  height="40px"
                />
              
              <Flex direction="column" ml={4}>

         
                
              <Box style={{cursor:"pointer"}} onMouseDown={(e) => e.preventDefault()}  onClick={()=> {
                       router.push(`/player_profile/${player.slug}`).then(() => {
                        setSearch("");
                        setPlayer([]);
                       });
                        
                      }}
                      >

                        {player.name}
                        
                  </Box>
      
                <Text fontSize={"x-small"}
                >{player.team.name}</Text>
              </Flex>
            </Flex>
            </LinkBox>
          );

    })}
  
  </div>
    

  }
  
  </div>



  );
};

export default SearchBar;