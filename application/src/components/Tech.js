import React from 'react';
import { Flex, Heading, Box, Image } from '@chakra-ui/react';

export default function Tech() {
  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <Heading fontWeight="extrabold" letterSpacing="tight" size="lg" mb={5}>
        Tech Used
      </Heading>
      <Flex justifyContent="center" alignItems="center">
        <Box mx={10}>
          <Image
            src="/images/anchor-logo.png"
            alt="Anchor"
            boxSize="80px"
            objectFit="contain"
          />
        </Box>
        <Box mx={10}>
          <Image
            src="/images/solana-logo.png"
            alt="Solana"
            boxSize="80px"
            objectFit="contain"
          />
        </Box>
        <Box mx={6}>
          <Image
            src="/images/react-logo.png"
            alt="React"
            boxSize="120px"
            objectFit="contain"
          />
        </Box>
        <Box mx={6}>
          <Image
            src="/images/chakraui-logo.png"
            alt="ChakraUI"
            boxSize="70px"
            objectFit="contain"
          />
        </Box>
      </Flex>
    </Flex>
  );
}
