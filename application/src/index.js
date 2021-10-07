import React, { StrictMode } from 'react';
import { ColorModeScript } from '@chakra-ui/react';
import ReactDOM from 'react-dom';
import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import {
  WalletProvider,
  ConnectionProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  clusterApiUrl
} from '@solana/web3.js';

import App from './App';

const wallets = [getPhantomWallet()];


const network = clusterApiUrl('devnet');


ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <ConnectionProvider endpoint={clusterApiUrl('devnet')}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <App />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </StrictMode>,
  document.getElementById('root')
);
