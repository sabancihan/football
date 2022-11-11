import { Box, Container, Input } from "@chakra-ui/react"
import { InferGetServerSidePropsType } from "next"
import { CtxOrReq } from "next-auth/client/_utils"
import { getCsrfToken, getSession, GetSessionParams } from "next-auth/react"
import Layout from "../../components/layout/Layout"
import * as React from "react";
import { Center, Image, Flex, Badge, Text } from "@chakra-ui/react";


export default function SignIn({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
 <div>
   
<Layout>
<Center h="100vh">
      <Box p="5" maxW="320px" borderWidth="1px">
        <Image borderRadius="md" src="https://bit.ly/2k1H1t6" />
        <Flex align="baseline" mt={2}>
          <Badge colorScheme="pink">Plus</Badge>
          <Text
            ml={2}
            textTransform="uppercase"
            fontSize="sm"
            fontWeight="bold"
            color="pink.800"
          >
            Verified &bull; Cape Town
          </Text>
        </Flex>
        <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
          Modern, Chic Penthouse with Mountain, City & Sea Views
        </Text>
        <Text mt={2}>$119/night</Text>
        <Flex mt={2} align="center">
          <Box as={"area"} color="orange.400" />
          <Text ml={1} fontSize="sm">
            <b>4.84</b> (190)
          </Text>
        </Flex>
      </Box>
    </Center>
</Layout>
      </div>
    )

    
}

export  const getServerSideProps = async (context : CtxOrReq  ) => {
    const session = await getSession(context)
    const csrfToken = await getCsrfToken(context)


    
    if (session) {
        return {
        redirect: {
            destination: '/profile',
            permanent: false,
        },
        }
    }
    
    return {
        props: { csrfToken },
    }
    }
