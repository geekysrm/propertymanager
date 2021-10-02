import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import {
  WalletProvider,
  ConnectionProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

const wallets = [getPhantomWallet()];

ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <ConnectionProvider endpoint="http://127.0.0.1:8899">
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <App />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </StrictMode>,
  document.getElementById('root')
);
