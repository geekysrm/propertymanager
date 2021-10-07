import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'easy-peasy';

import App from './App';
import { rootStore } from './store';

import './index.scss';

import idl from './idl.json';

import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import {
	WalletProvider,
	ConnectionProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

import {
	clusterApiUrl
  } from '@solana/web3.js';
  
  const network = clusterApiUrl('devnet');
  
  
const wallets = [getPhantomWallet()];

ReactDOM.render(
	<React.StrictMode>
<ConnectionProvider endpoint={clusterApiUrl('devnet')}>			<WalletProvider wallets={wallets} autoConnect>
				<WalletModalProvider>
					<StoreProvider store={rootStore}>
						<App />
					</StoreProvider>
				</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	</React.StrictMode>,
	document.getElementById('property-management-app')
);
