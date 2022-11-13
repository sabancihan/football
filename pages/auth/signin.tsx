import { Box, Button, Container, Heading, Input } from "@chakra-ui/react"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { CtxOrReq } from "next-auth/client/_utils"
import { getCsrfToken, getSession, GetSessionParams } from "next-auth/react"
import Layout from "../../components/layout/Layout"
import * as React from "react";
import { Center, Image, Flex, Badge, Text, Stack, FormControl, FormLabel, Checkbox, Link, useColorModeValue } from "@chakra-ui/react";
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]"


export default function SignIn(/*{ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>*/) {

    return (
 <div>
   
<Layout>
  

<Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>

</Layout>
      </div>
    )

    
}

export  const getServerSideProps : GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res,authOptions)


  
  if (session) {
      return {
      redirect: {
          destination: '/profile',
          permanent: false,
      },
      }
  }
  
  return {
      props: {  },
  }
  }
