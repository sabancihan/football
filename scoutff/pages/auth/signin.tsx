import { Box, Button, Container, Heading, Input } from "@chakra-ui/react"
import { InferGetServerSidePropsType } from "next"
import { CtxOrReq } from "next-auth/client/_utils"
import { getCsrfToken, getSession, GetSessionParams } from "next-auth/react"
import Layout from "../../components/layout/Layout"
import * as React from "react";
import { Center, Image, Flex, Badge, Text, Stack, FormControl, FormLabel, Checkbox, Link, useColorModeValue } from "@chakra-ui/react";


export default function SignIn(/*{ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>*/) {

    return (
 <div>
   
<Layout>
  
<Flex height="100vh" alignItems="center" justifyContent="center">

  <Flex direction="column" background="gray.100" p={12} rounded={6}>

  <Heading mb={6}>Log in</Heading>
  <Input placeholder= "Enter the email adress" variant="filled" type="email" />
  <Input placeholder= "Enter the password" variant="filled" type="password" />
<Button mb={6} colorScheme="facebook"> Log in </Button>
  </Flex>

</Flex>
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
/*
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
*/