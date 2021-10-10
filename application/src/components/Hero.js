import React from 'react';
import { chakra, Box, useColorModeValue, Stack, Flex, Image } from '@chakra-ui/react';
import YouTube from 'react-youtube';
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
					<chakra.span display="block">Ready to make your property safe ?</chakra.span>
					<chakra.span
						display="block"
						color={useColorModeValue('white', 'gray.500')}
					>
						Start by connecting your Solana wallet
					</chakra.span>
				</chakra.h2>
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
			{/* <Flex
				justifyContent="center"
				w={{ base: 'full', md: 10 / 12 }}
				mx="auto"
				textAlign="center"
			>
				<YouTube videoId="dQw4w9WgXcQ" loading="lazy" />
			</Flex> */}
			<Box border="1px" borderColor="gray.500" p={2} borderRadius={5} >
				<Image src="/images/feature2.jpeg" alt="feature1" height="100%" objectFit="contain" />
			</Box>
		</Flex>
	);
};

export default Hero;
