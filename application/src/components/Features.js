import React from "react";

import {
  Box,
  Button,
  chakra,
  Flex,
  SimpleGrid,
  useColorModeValue,
  Image
} from "@chakra-ui/react";

export default function Features() {
  return (
    <>
      <Box textAlign={{ lg: 'center' }}>
        <chakra.p
          mt={2}
          fontSize={{ base: '3xl', sm: '4xl' }}
          lineHeight="10"
          fontWeight="extrabold"
          color={useColorModeValue('gray.900')}
        >
          Introducing a secure &amp; decentralized <br /> way of managing your property records
        </chakra.p>
      </Box>
      <Flex
        p={10}
        w="full"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          shadow="xl"
          bg={useColorModeValue("white", "gray.800")}
          px={8}
          py={20}
          mx="auto"
        >
          <SimpleGrid
            alignItems="center"
            columns={{ base: 1, md: 2 }}
            mb={24}
            spacingY={{ base: 10, md: 32 }}
            spacingX={{ base: 10, md: 24 }}
          >
            <Box>
              <chakra.h2
                mb={4}
                fontSize={{ base: "2xl", md: "4xl" }}
                fontWeight="extrabold"
                letterSpacing="tight"
                textAlign={{ base: "center", md: "left" }}
                color={useColorModeValue("gray.900", "gray.400")}
                lineHeight={{ md: "shorter" }}
              >
                Transperent &amp; Tamper Proof Property Records
              </chakra.h2>
            </Box>
            <Box border="1px" borderColor="gray.500" p={2} borderRadius={5} >
              <Image src="/images/feature1.jpeg" alt="feature1" height="100%" objectFit="contain" />
            </Box>
          </SimpleGrid>
          <SimpleGrid
            alignItems="center"
            columns={{ base: 1, md: 2 }}
            flexDirection="column-reverse"
            mb={24}
            spacingY={{ base: 10, md: 32 }}
            spacingX={{ base: 10, md: 24 }}
          >
            <Box order={{ base: "none", md: 2 }}>
              <chakra.h2
                mb={4}
                fontSize={{ base: "2xl", md: "4xl" }}
                fontWeight="extrabold"
                letterSpacing="tight"
                textAlign={{ base: "center", md: "left" }}
                color={useColorModeValue("gray.900", "gray.400")}
                lineHeight={{ md: "shorter" }}
              >
                High Integrity &amp; Zero Fraud Property Transfer.
              </chakra.h2>
            </Box>
            <Box border="1px" borderColor="gray.500" p={2} borderRadius={5} >
              <Image src="/images/feature2.jpeg" alt="feature1" height="100%" objectFit="contain" />
            </Box>
          </SimpleGrid>
          <SimpleGrid
            alignItems="center"
            columns={{ base: 1, md: 2 }}
            mb={24}
            spacingY={{ base: 10, md: 32 }}
            spacingX={{ base: 10, md: 24 }}
          >
            <Box>
              <chakra.h2
                mb={4}
                fontSize={{ base: "2xl", md: "4xl" }}
                fontWeight="extrabold"
                letterSpacing="tight"
                textAlign={{ base: "center", md: "left" }}
                color={useColorModeValue("gray.900", "gray.400")}
                lineHeight={{ md: "shorter" }}
              >
                Unified Property Marketplace that Eliminates Intermediaries.
              </chakra.h2>
            </Box>
            <Box border="1px" borderColor="gray.500" p={2} borderRadius={5} >
              <Image src="/images/feature3.jpeg" alt="feature1" height="100%" objectFit="contain" />
            </Box>
          </SimpleGrid>
          <SimpleGrid
            alignItems="center"
            columns={{ base: 1, md: 2 }}
            flexDirection="column-reverse"
            mb={24}
            spacingY={{ base: 10, md: 32 }}
            spacingX={{ base: 10, md: 24 }}
          >
            <Box order={{ base: "none", md: 2 }}>
              <chakra.h2
                mb={4}
                fontSize={{ base: "2xl", md: "4xl" }}
                fontWeight="extrabold"
                letterSpacing="tight"
                textAlign={{ base: "center", md: "left" }}
                color={useColorModeValue("gray.900", "gray.400")}
                lineHeight={{ md: "shorter" }}
              >
                Robust &amp; Fast property registration.
              </chakra.h2>
            </Box>
            <Box border="1px" borderColor="gray.500" p={2} borderRadius={5} >
              <Image src="/images/feature4.jpeg" alt="feature1" height="100%" objectFit="contain" />
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>
    </>
  );
}