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

const wallets = [getPhantomWallet()];

ReactDOM.render(
	<React.StrictMode>
		<ConnectionProvider endpoint="http://127.0.0.1:8899">
			<WalletProvider wallets={wallets} autoConnect>
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
