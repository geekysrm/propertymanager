import React from 'react';
import {
  chakra,
  Box,
  useColorModeValue,
  Stack,
  Image,
  Flex,
} from '@chakra-ui/react';
import ReactPlayer from 'react-player';

import { NavLink as Link } from 'react-router-dom';

const Hero = () => {
  return (
    <Flex
      alignItems="end"
      direction={{ base: 'column', md: 'row' }}
      bg={useColorModeValue('purple.500')}
      px={24}
      py={20}
      mx="50"
    >
      <Flex
        direction="column"
        justifyContent="center"
        w={{ base: 'full', md: 11 / 12, xl: 9 / 12 }}
        mx="auto"
        pr={{ md: 20 }}
      >
        <chakra.h2
          fontSize={{ base: '3xl', sm: '4xl' }}
          fontWeight="extrabold"
          lineHeight="shorter"
          color={useColorModeValue('white', 'gray.100')}
          mb={6}
        >
          <chakra.span display="block">Ready to dive in?</chakra.span>
          <chakra.span
            display="block"
            color={useColorModeValue('white', 'gray.500')}
          >
            Start by connecting your Solana wallet
          </chakra.span>
        </chakra.h2>
        <chakra.p
          mb={6}
          fontSize={{ base: 'lg', md: 'xl' }}
          color={useColorModeValue('gray.100', 'gray.300')}
        >
          Hellonext is a feature voting software where you can allow your users
          to vote on features, publish roadmap, and complete your customer
          feedback loop.
        </chakra.p>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          mb={{ base: 4, md: 8 }}
          spacing={2}
        >
          <Box display="inline-flex" rounded="md" shadow="md">
            <chakra.a
              cursor="pointer"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              px={5}
              py={3}
              border="solid transparent"
              fontWeight="bold"
              w="full"
              rounded="md"
              color={useColorModeValue('white')}
              bg={useColorModeValue('purple.600', 'purple.500')}
              _hover={{
                bg: useColorModeValue('purple.700', 'purple.600'),
              }}
              as={Link}
              to="/connect"
            >
              Connect now
            </chakra.a>
          </Box>
        </Stack>
      </Flex>
      <Flex
        justifyContent="center"
        w={{ base: 'full', md: 10 / 12 }}
        mx="auto"
        textAlign="center"
      >
        <ReactPlayer url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
      </Flex>
    </Flex>
  );
};

export default Hero;
