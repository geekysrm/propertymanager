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
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  Icon,
} from '@chakra-ui/react';
import { PhoneIcon, EmailIcon, AddIcon } from '@chakra-ui/icons';
import { AiOutlineHome, BiArea, FaUserTie } from 'react-icons/all';

import { getProgram, getAccount, getPair } from '../utils/solana';
import CustomMap from '../components/CustomMap';

export default function UserProfile() {
  const wallet = useWallet();
  const history = useHistory();
  const { address } = useParams();

  const [user, setUser] = useState({});
  const [properties, setProperties] = useState([]);
  const [zoomCoord, setZoomCoord] = useState({
    lat: null,
    lng: null,
  });
  const [requests, setRequests] = useState([]);
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
          const program = await getProgram(wallet);
          const pair = getPair();

          const account = await program.account.baseAccount.fetch(
            pair.publicKey
          );

          const currAccount = account.userList.filter(
            user => user.address === address
          );

          if (currAccount.length === 0) {
            history.push('/');
          }

          setUser({
            ...currAccount[0],
            isAdmin: account.authority.toString() === address,
          });

          const properties = currAccount[0].propertyList.map(property => {
            return account.propertyList.find(p => {
              return p.id === property;
            });
          });

          setProperties(properties);

          const yourRequests = currAccount[0].buyOrders
            .map(order => {
              return account.buyOrderList.find(o => {
                return o.orderId === order;
              });
            })
            .filter(order => order.status === 'REQUESTED');

          console.log(yourRequests);

          setRequests(yourRequests);

          setMainAccount(account);
        }
      } else {
        history.push('/connect');
      }
    })();
  }, []);

  function renderAdminBadge() {
    if (user.isAdmin) {
      return (
        <div>
          <Badge colorScheme="purple">ADMIN</Badge>
        </div>
      );
    }
  }

  function onHandleAccordionChange(index) {
    if (index === -1) {
      setZoomCoord({
        lat: null,
        lng: null,
      });
    } else {
      const { lat, lng } = properties[index];
      setZoomCoord({
        lat,
        lng,
      });
    }
  }

  function showPropertyDetails(propertyId) {
    history.push(`/property/${propertyId}`);
  }

  function getDetailsFromAddress(address) {
    console.log(mainAccount);
    return mainAccount.userList.find(user => {
      return user.address === address;
    });
  }

  function getPropertyDetailsFromId(id) {
    console.log(mainAccount);
    return mainAccount.propertyList.find(property => {
      return property.id === id;
    });
  }

  async function approveBuyRequest(buyRequestId) {
    const program = await getProgram(wallet);
    const pair = getPair();

    await program.rpc.approve(buyRequestId, {
      accounts: {
        baseAccount: pair.publicKey,
      },
    });

    const account = await program.account.baseAccount.fetch(pair.publicKey);

    const currAccount = account.userList.filter(
      user => user.address === address
    );
    setUser({
      ...currAccount[0],
      isAdmin: account.authority.toString() === address,
    });

    const properties = currAccount[0].propertyList.map(property => {
      return account.propertyList.find(p => {
        return p.id === property;
      });
    });
    setProperties(properties);

    const yourRequests = currAccount[0].buyOrders
      .map(order => {
        return account.buyOrderList.find(o => {
          return o.orderId === order;
        });
      })
      .filter(order => order.status === 'REQUESTED');
    setRequests(yourRequests);

    setMainAccount(account);
  }

  async function rejectBuyRequest(buyRequestId) {
    const program = await getProgram(wallet);
    const pair = getPair();

    await program.rpc.reject(buyRequestId, {
      accounts: {
        baseAccount: pair.publicKey,
      },
    });

    const account = await program.account.baseAccount.fetch(pair.publicKey);

    const currAccount = account.userList.filter(
      user => user.address === address
    );
    setUser({
      ...currAccount[0],
      isAdmin: account.authority.toString() === address,
    });

    const properties = currAccount[0].propertyList.map(property => {
      return account.propertyList.find(p => {
        return p.id === property;
      });
    });
    setProperties(properties);

    const yourRequests = currAccount[0].buyOrders
      .map(order => {
        return account.buyOrderList.find(o => {
          return o.orderId === order;
        });
      })
      .filter(order => order.status === 'REQUESTED');
    setRequests(yourRequests);

    setMainAccount(account);
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
        {renderAdminBadge()}
        <Heading size="lg" fontSize="50px" mt={2}>
          {user.name}
        </Heading>
        <Text color="gray.500">{address}</Text>
        <Stack spacing={3} mt={6}>
          <Text fontSize="xl">
            <EmailIcon mr={2} />
            {user.email}
          </Text>
          <Text fontSize="xl">
            <PhoneIcon mr={2} />
            {user.phoneNumber}
          </Text>
        </Stack>
        {user.isAdmin && (
          <Box mt={6} width="100%">
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
        )}
        <Heading size="lg" mt="10" mb="5">
          Your Properties:
        </Heading>
        {properties.length > 0 ? (
          <Accordion
            allowToggle
            defaultIndex={[0]}
            onChange={onHandleAccordionChange}
          >
            {properties.map(property => (
              <AccordionItem>
                <Text>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Heading size="md">{property.name}</Heading>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </Text>
                <AccordionPanel pb={4}>
                  <Text fontSize="lg" display="flex" alignItems="center">
                    <Icon mr="2" as={AiOutlineHome}></Icon>
                    {`${property.address}, ${property.zipCode}`}
                  </Text>
                  <Text fontSize="lg">
                    <Icon mr="2" as={BiArea}></Icon>
                    {property.dimensions}
                  </Text>
                  <Button
                    size="sm"
                    variant="outline"
                    mt="5"
                    colorScheme="purple"
                    onClick={() => showPropertyDetails(property.id)}
                  >
                    Show Property
                  </Button>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <Text fontSize="md">No Properties available</Text>
        )}
        <Box mt={6} width="100%">
          <Button
            as={Link}
            to="/marketplace"
            width="100%"
            colorScheme="purple"
            variant="outline"
          >
            Browse Other Properties
          </Button>
        </Box>
        <Heading size="lg" mt="10" mb="5">
          Buy Requests:
        </Heading>
        {requests.length > 0 ? (
          <Accordion allowToggle>
            {requests.map(req => (
              <AccordionItem>
                <Text>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Heading size="md">{req.orderId}</Heading>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </Text>
                <AccordionPanel pb={4}>
                  <Text fontSize="xl" display="flex" alignItems="center">
                    <Icon mr="2" as={AiOutlineHome}></Icon>
                    {mainAccount &&
                      getPropertyDetailsFromId(req.propertyId).name}
                  </Text>
                  <Text fontSize="xl">
                    <Icon mr="2" as={FaUserTie}></Icon>
                    {mainAccount &&
                      getDetailsFromAddress(req.buyerAddress).name}
                  </Text>
                  <Box width="100%" display="flex">
                    <Button
                      mt="5"
                      ml="2"
                      variant="outline"
                      colorScheme="green"
                      width="100%"
                      onClick={() => {
                        approveBuyRequest(req.orderId);
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      mt="5"
                      ml="2"
                      variant="outline"
                      colorScheme="red"
                      width="100%"
                      onClick={() => {
                        rejectBuyRequest(req.orderId);
                      }}
                    >
                      Reject
                    </Button>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <Text fontSize="md">No Buy Requests available</Text>
        )}
      </Box>
      <Box width="70%" pl={2} pr={4}>
        <CustomMap
          properties={properties}
          zoomLat={zoomCoord.lat}
          zoomLng={zoomCoord.lng}
        />
      </Box>
    </Flex>
  );
}
