import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useHistory } from 'react-router-dom';
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  Icon,
} from '@chakra-ui/react';
import { AiOutlineHome, BiArea } from 'react-icons/all';

import { getAccount } from '../utils/solana';
import CustomMap from '../components/CustomMap';

export default function Marketplace() {
  const wallet = useWallet();
  const history = useHistory();

  const [zoomCoord, setZoomCoord] = useState({
    lat: null,
    lng: null,
  });
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    (async () => {
      if (wallet.connected) {
        const account = await getAccount(wallet);
        const walletAddress = wallet.publicKey.toString();
        const currAccount = account.userList.filter(
          user => user.address === walletAddress
        );

        if (currAccount.length === 0) {
          history.push('/');
        }

        const properties = account.propertyList.filter(property => {
          return property.currentOwner !== walletAddress;
        });

        setProperties(properties);
      } else {
        history.push('/connect');
      }
    })();
  }, []);

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

  return (
    <Flex
      style={{
        marginTop: '20px',
        marginBottom: '40px',
        overflowX: 'hidden',
      }}
    >
      <Box width="30%" p={4} m={4} my={0} borderWidth="1px" borderRadius="lg">
        <Heading size="lg" mb="5">
          Marketplace:
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
          <Text fontSize="md">No Properties available in marketplace</Text>
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
