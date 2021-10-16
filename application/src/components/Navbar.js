import React from 'react';
import {
  chakra,
  Flex,
  Icon,
  Link,
  useColorModeValue,
  Box,
  Image,
} from '@chakra-ui/react';
import { useViewportScroll } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const ref = React.useRef();
  const [y, setY] = React.useState(0);
  const { height = 0 } = ref.current ? ref.current.getBoundingClientRect() : {};

  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  const SponsorButton = (
    <Box
      display={{ base: 'none', md: 'flex' }}
      alignItems="center"
      as="a"
      aria-label="Vote for us"
      href="https://link.soumya.dev/solana-vote"
      target="_blank"
      bg="gray.50"
      borderWidth="1px"
      borderColor="gray.200"
      px="1em"
      minH="36px"
      rounded="md"
      fontSize="sm"
      color="gray.800"
      outline="0"
      transition="all 0.3s"
      _hover={{
        bg: 'gray.100',
        borderColor: 'gray.300',
      }}
      _active={{
        borderColor: 'gray.200',
      }}
      _focus={{
        boxShadow: 'outline',
      }}
      ml={5}
    >
      <Icon as={FaHeart} w="4" h="4" color="red.500" mr="2" />
      <Box as="strong" lineHeight="inherit" fontWeight="semibold">
        Vote Us!
      </Box>
    </Box>
  );

  return (
    <Box pos="relative">
      <chakra.header
        ref={ref}
        shadow={y > height ? 'sm' : undefined}
        transition="box-shadow 0.2s"
        bg={bg}
        w="full"
        overflowY="hidden"
        mt="20px"
        px="28"
      >
        <Flex h="4.5rem" mx="auto" alignItems="center">
          <Flex
            w="full"
            h="full"
            px="6"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex align="center">
              <Link as={RouterLink} to="/" _focus={false}>
                <Image w="75%" src="/images/solproperty-logo.png" />
              </Link>
            </Flex>

            <Flex alignItems="center">
              <Link
                isExternal
                aria-label="Go to Source"
                href="https://github.com/geekysrm/propertymanager"
              >
                <Icon
                  as={AiFillGithub}
                  display="block"
                  transition="color 0.2s"
                  w="5"
                  h="5"
                  _hover={{ color: 'gray.600' }}
                />
              </Link>
              {SponsorButton}
              <Box
                ml="4"
                display={{ base: 'flex', md: 'none' }}
                as="a"
                aria-label="Vote for us"
                href="https://link.soumya.dev/solana-vote"
                target="_blank"
              >
                <Icon as={FaHeart} w="4" h="4" color="red.500" mr="2" />
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </chakra.header>
    </Box>
  );
};

export default Navbar;
