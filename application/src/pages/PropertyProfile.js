import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

import { NavLink as Link, useParams, useHistory } from 'react-router-dom';

import {
  Flex,
  Box,
  Badge,
  Heading,
  Text,
  Stack,
  Button,
  Divider,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import {
  AtSignIcon, InfoOutlineIcon,
  CheckCircleIcon, ExternalLinkIcon, AddIcon, RepeatClockIcon
} from '@chakra-ui/icons';

import { getProgram, getAccount, getPair } from '../utils/solana';
import CustomMap from '../components/CustomMap';

export default function PropertyProfile() {
  const wallet = useWallet();
  const history = useHistory();
  const { id } = useParams();

  const [property, setProperty] = useState({});
  const [mainAccount, setMainAccount] = useState(null);

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

          const property = account.propertyList.find(p => {
            return p.id === id;
          });

          console.log("property: ", property);

          setProperty(property);
          setMainAccount(account);
        }
      } else {
        history.push('/connect');
      }
    })();
  }, []);

  function getDetailsFromAddress(address) {
    return mainAccount.userList.find(user => {
      return user.address === address
    });
  }

  function renderBtn() {
    if (wallet && wallet.publicKey && wallet.publicKey.toString() === property.currentOwner) {
      return (
        <Box mt={6} width="100%">
          <Button
            width="100%"
            leftIcon={<ExternalLinkIcon />}
            colorScheme="purple"
            variant="outline"
          >
            Transfer Property
          </Button>
        </Box>
      );
    } else {
      return (
        <Box mt={6} width="100%">
          <Button
            width="100%"
            leftIcon={<AddIcon />}
            colorScheme="purple"
            variant="outline"
          >
            Buy Request
          </Button>
        </Box>
      );
    }
  }

  function renderPastOwners() {
    return property.pastOwnerList.map(owner => {
      return (
        <ListItem key={owner}>{getDetailsFromAddress(owner).name}</ListItem>
      );
    });
  }

  return (
    <Flex
      style={{
        marginTop: '20px',
        marginBottom: '40px',
        overflowX: 'hidden',
      }}
    >
      <Box width="30%" p={4} m={4} my={0} borderWidth="1px" borderRadius="lg">
        <Heading size="lg" fontSize="40px" mt={2}>
          {property.name}
        </Heading>
        <Text color="gray.500">{id}</Text>
        <Stack spacing={3} mt={6}>
          <Text fontSize="xl">
            <AtSignIcon mr={2} />
            {property.address}
          </Text>
          <Text fontSize="xl">
            <InfoOutlineIcon mr={2} />
            {property.dimensions}
          </Text>
          {mainAccount && <Text color="purple.300" fontSize="xl" as={Link} to={`/user/${property.currentOwner}`}>
            <CheckCircleIcon mr={2} />
            {getDetailsFromAddress(property.currentOwner).name}
          </Text>}
        </Stack>
        {renderBtn()}
        {property && property.pastOwnerList && property.pastOwnerList.length > 0 && <>
          <Divider my={6} />
          <Text fontSize="xl" mb={4}>
            <RepeatClockIcon mr={2} />
            Past Owners
          </Text>
          <UnorderedList>
            {renderPastOwners()}
          </UnorderedList>
        </>}
      </Box>
      <Box width="70%" pl={2} pr={4}>
        {Object.keys(property).length > 0 && <CustomMap properties={[property]} />}
      </Box>
    </Flex >
  )
}
