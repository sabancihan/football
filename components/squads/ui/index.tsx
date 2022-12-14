import React from "react";
import SquadsUI from "./SquadsUI";
import { Text, Flex, VStack, HStack, Button } from "@chakra-ui/react";

const SquadsCompIndex = () => {
  return (
    <div>
        <Flex  margin='100px' marginLeft='200px' marginTop='20px'>
          <VStack>
            <HStack marginBottom='50px'>
              <VStack marginRight='140px'>
                <Text fontSize='20px'>First Expert</Text>
                <SquadsUI></SquadsUI>  
                <HStack>
                  <Button>Edit</Button>
                  <Button>Like</Button>
                </HStack>
              </VStack>

              <VStack >
                <Text fontSize='20px'>Second Expert</Text>
                <SquadsUI></SquadsUI>  
                <HStack>
                  <Button>Edit</Button>
                  <Button>Like</Button>
                </HStack>
              </VStack>
            </HStack>

            <HStack marginBottom='50px'>
              <VStack marginRight='140px'>
                <Text fontSize='20px'>Third Expert</Text>
                <SquadsUI></SquadsUI>  
                <HStack>
                  <Button>Edit</Button>
                  <Button>Like</Button>
                </HStack>
              </VStack>

              <VStack >
                <Text fontSize='20px'>Fourth Expert</Text>
                <SquadsUI></SquadsUI>  
                <HStack>
                  <Button>Edit</Button>
                  <Button>Like</Button>
                </HStack>
              </VStack>
            </HStack>
          </VStack>

          


        </Flex>
    </div>
  );
};

export default SquadsCompIndex;