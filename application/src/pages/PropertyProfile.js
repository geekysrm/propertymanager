import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { NavLink as Link, useParams, useHistory } from 'react-router-dom';
import {
  Flex,
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Divider,
  UnorderedList,
  ListItem,
  Icon,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { ExternalLinkIcon, AddIcon, RepeatClockIcon } from '@chakra-ui/icons';
import { AiOutlineHome, AiOutlineUser, BiArea } from 'react-icons/all';
import { v4 as uuid } from 'uuid';

import { getProgram, getAccount, getPair } from '../utils/solana';
import CustomMap from '../components/CustomMap';
import CustomModal from '../components/Modal';

export default function PropertyProfile() {
  const wallet = useWallet();
  const history = useHistory();
  const { id } = useParams();

  const [property, setProperty] = useState({});
  const [mainAccount, setMainAccount] = useState(null);
  const [buyerAddress, setBuyerAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

          console.log('property: ', property);
          console.log('account: ', account);

          setProperty(property);
          setMainAccount(account);
        }
      } else {
        history.push('/connect');
      }
    })();
  }, []);

  function getDetailsFromAddress(address) {
    console.log(mainAccount);
    return mainAccount.userList.find(user => {
      return user.address === address;
    });
  }

  function renderPastOwners() {
    return property.pastOwnerList.map(owner => {
      return (
        <ListItem key={owner}>
          {mainAccount && getDetailsFromAddress(owner).name}
        </ListItem>
      );
    });
  }

  async function onTransferProperty() {
    const program = await getProgram(wallet);
    const pair = getPair();
    await program.rpc.transfer(
      wallet.publicKey.toString(),
      buyerAddress,
      property.id,
      {
        accounts: {
          baseAccount: pair.publicKey,
        },
      }
    );
    setIsModalOpen(false);
    setBuyerAddress(null);

    const account = await getAccount(wallet);
    const newProperty = account.propertyList.find(p => {
      return p.id === id;
    });

    setProperty(newProperty);
    setMainAccount(account);
  }

  async function buyRequest() {
    const program = await getProgram(wallet);
    const pair = getPair();
    await program.rpc.createbuyorder(
      uuid(),
      wallet.publicKey.toString(),
      property.currentOwner,
      id,
      {
        accounts: {
          baseAccount: pair.publicKey,
        },
      }
    );
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
            <Icon as={AiOutlineHome} mr={2} />
            {property.address}
          </Text>
          <Text fontSize="xl">
            <Icon as={BiArea} mr={2} />
            {property.dimensions}
          </Text>
          {mainAccount && (
            <Text
              color="purple.300"
              fontSize="xl"
              as={Link}
              to={`/user/${property.currentOwner}`}
            >
              <Icon as={AiOutlineUser} mr={2} />
              {getDetailsFromAddress(property.currentOwner).name}
            </Text>
          )}
        </Stack>
        {wallet &&
        wallet.publicKey &&
        wallet.publicKey.toString() === property.currentOwner ? (
          <Box mt={6} width="100%">
            <Button
              width="100%"
              leftIcon={<ExternalLinkIcon />}
              colorScheme="purple"
              variant="outline"
              onClick={() => setIsModalOpen(true)}
            >
              Transfer Property
            </Button>
          </Box>
        ) : (
          <Box mt={6} width="100%">
            <Button
              width="100%"
              leftIcon={<AddIcon />}
              colorScheme="purple"
              variant="outline"
              onClick={buyRequest}
            >
              Buy Request
            </Button>
          </Box>
        )}
        {property &&
          property.pastOwnerList &&
          property.pastOwnerList.length > 0 && (
            <>
              <Divider my={6} />
              <Text fontSize="xl" mb={4}>
                <RepeatClockIcon mr={2} />
                Past Owners
              </Text>
              <UnorderedList>{renderPastOwners()}</UnorderedList>
            </>
          )}
      </Box>
      <Box width="70%" pl={2} pr={4}>
        {Object.keys(property).length > 0 && (
          <CustomMap properties={[property]} />
        )}
      </Box>
      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Flex direction="column">
          <FormControl>
            <FormLabel>Transfer To Address</FormLabel>
            <Input
              mt="2"
              type="text"
              placeholder="Enter address"
              onChange={e => setBuyerAddress(e.target.value)}
              value={buyerAddress}
            />
          </FormControl>
          <Button
            type="button"
            bg="purple.500"
            mt="5"
            ml="auto"
            onClick={onTransferProperty}
          >
            Transfer
          </Button>
        </Flex>
      </CustomModal>
    </Flex>
  );
}
