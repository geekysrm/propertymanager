import React, { useEffect, useState } from 'react';

import { useWallet } from '@solana/wallet-adapter-react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { getProvider, getProgram, getAccount, getPair } from '../utils/solana';

import CustomMap from '../components/CustomMap';

import { Flex, Box, Badge, Heading, Text, Stack, Button } from "@chakra-ui/react";
import { PhoneIcon, EmailIcon, AddIcon } from '@chakra-ui/icons'

import { NavLink as Link } from 'react-router-dom';

export default function UserProfile() {
    const wallet = useWallet();
    const history = useHistory();
    const { address } = useParams();

    const [user, setUser] = useState({});

    useEffect(() => {
        (async () => {
            if (wallet.connected) {
                const account = await getAccount(wallet);
                const walletAddress = wallet.publicKey.toString();
                const currAccount = account.userList.filter(
                    user => user.address === walletAddress
                );

                if (currAccount.length === 0) {
                    history.push('/register');
                } else {
                    const program = await getProgram(wallet);
                    const pair = getPair();

                    const account = await program.account.baseAccount.fetch(pair.publicKey);

                    const currAccount = account.userList.filter(
                        (user) => user.address === address
                    );

                    console.log("currAccount", currAccount);

                    if (currAccount.length === 0) {
                        history.push("/");
                    }

                    setUser({
                        ...currAccount[0],
                        isAdmin: account.authority.toString() === address,
                    });
                }
            } else {
                history.push('/connect');
            }
        })();
    }, []);

    function renderAdminBadge() {
        if (user.isAdmin) {
            return <div>
                <Badge colorScheme="purple" >ADMIN</Badge>
            </div>
        }
    }

    function renderAddPropertyBtn() {
        if (user.isAdmin) {
            return <Box mt={6} width="100%">
                <Button
                    as={Link}
                    to="/add/property"
                    width="100%"
                    leftIcon={<AddIcon />}
                    colorScheme="purple"
                    variant="outline"
                >
                    Add Property
                </Button>
            </Box>
        }
    }

    return (
        <Flex
            style={{
                marginTop: "20px",
                overflowX: 'hidden'
            }}
        >
            <Box
                width="30%"
                p={4}
                m={4}
                my={0}
                borderWidth="1px"
                borderRadius="lg"
            >
                {renderAdminBadge()}
                <Heading size="lg" fontSize="50px" mt={2}>
                    {user.name}
                </Heading>
                <Text color="gray.500" >
                    {address}
                </Text>
                <Stack spacing={3} mt={6}>
                    <Text fontSize="xl"><EmailIcon mr={2} />{user.email}</Text>
                    <Text fontSize="xl"><PhoneIcon mr={2} />{user.phoneNumber}</Text>
                </Stack>
                {renderAddPropertyBtn()}
            </Box>
            <Box
                width="70%"
            >
                <CustomMap />
            </Box>
        </Flex>
    )
}
