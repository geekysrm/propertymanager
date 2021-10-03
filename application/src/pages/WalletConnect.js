import React, { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';
require('@solana/wallet-adapter-react-ui/styles.css');

export default function WallectConnect() {
  const history = useHistory();
  const wallet = useWallet();

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '100px',
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
          onClick={() => { history.goBack() }}
          rightIcon={<ArrowForwardIcon />}
          colorScheme="purple"
          variant="outline">
          Continue
        </Button>
      </div>
    </div>
  );
}
