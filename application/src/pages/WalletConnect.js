import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';
import {
  Flex, Box, Heading, Text, Alert, Link,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react"
require('@solana/wallet-adapter-react-ui/styles.css');

export default function WallectConnect() {
  const history = useHistory();
  const wallet = useWallet();

  return (
    <div>
      <Flex
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        py={10}
      >
        <Box>
          <Alert status="info">
            <AlertIcon />
            Please make sure that you wallet is connected to Solana Devnet and has some
            <Link isExternal ml={1} color="purple.300" href="https://solfaucet.com/">balance</Link>.
          </Alert>
        </Box>
      </Flex>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '10px',
        }}
      >
        <WalletMultiButton />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '100px',
        }}
      >
        <Button
          isDisabled={!wallet.connected}
          onClick={() => {
            history.goBack();
          }}
          rightIcon={<ArrowForwardIcon />}
          colorScheme="purple"
          variant="outline"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
