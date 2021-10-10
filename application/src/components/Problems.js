import React from 'react';
import {
    chakra,
    Box,
    Flex,
    useColorModeValue,
    Icon,
    Stack,
} from '@chakra-ui/react';
import { BiError, RiFileDamageLine } from 'react-icons/all';
import { SearchIcon } from '@chakra-ui/icons'


export default function Problems() {
    const Feature = props => {
        return (
            <Flex>
                <Flex shrink={0}>
                    <Flex
                        alignItems="center"
                        justifyContent="center"
                        h={12}
                        w={12}
                        rounded="md"
                        bg={useColorModeValue('brand.500')}
                        color="white"
                    >
                        {props.icon}
                    </Flex>
                </Flex>
                <Box ml={4}>
                    <chakra.dt
                        fontSize="lg"
                        fontWeight="medium"
                        lineHeight="6"
                        color={useColorModeValue('gray.900')}
                    >
                        {props.title}
                    </chakra.dt>
                    <chakra.dd mt={2} color={useColorModeValue('gray.500', 'gray.400')}>
                        {props.children}
                    </chakra.dd>
                </Box>
            </Flex>
        );
    };
    return (
        <Flex
            py={10}
            w="auto"
            justifyContent="center"
            alignItems="center"
        >
            <Box py={12} bg={useColorModeValue('white', 'gray.800')} rounded="xl">
                <Box maxW="7xl" mx="auto" px={{ base: 4, lg: 8 }}>
                    <Box textAlign={{ lg: 'center' }}>
                        <chakra.p
                            mt={2}
                            fontSize={{ base: '3xl', sm: '4xl' }}
                            lineHeight="8"
                            fontWeight="extrabold"
                            letterSpacing="tight"
                            color={useColorModeValue('gray.900')}
                        >
                            Challenges in current property management system
                        </chakra.p>
                    </Box>

                    <Box mt={10}>
                        <Stack
                            spacing={{ base: 10, md: 0 }}
                            display={{ md: 'grid' }}
                            gridTemplateColumns={{ md: 'repeat(2,1fr)' }}
                            gridColumnGap={{ md: 8 }}
                            gridRowGap={{ md: 10 }}
                        >
                            <Feature
                                title="Forgery"
                                icon={
                                    <Icon
                                        boxSize={6}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                                        />
                                    </Icon>

                                }
                            >
                                The paper document used in property registration might be counterfeited,
                                posing a serious danger to the proprietor.
                                The property owner is at risk of losing his or her property.
                            </Feature>

                            <Feature
                                title="Human error"
                                icon={
                                    <Icon w={6} h={6} as={BiError}></Icon>
                                }
                            >
                                During the property registration procedure, there is a lot of human involvement. Eventually, this results in a huge number of human errors.
                            </Feature>

                            <Feature
                                title="Wear and tear of documents"
                                icon={
                                    <Icon w={6} h={6} as={RiFileDamageLine}></Icon>
                                }
                            >
                                Printed property papers, as we all know, do not endure more than a decade if not properly kept.
                                Most traditional papers are unrecognisable as a result of this wear and tear.
                            </Feature>

                            <Feature
                                title="Traceability"
                                icon={
                                    <SearchIcon w={5} h={5}></SearchIcon>
                                }
                            >
                                In certain nations, you can only find out who the current owner is by looking at paper records. It prevents us from discovering who else owned the property previously.
                            </Feature>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
}
