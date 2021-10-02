import React, { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import { useHistory } from 'react-router-dom';

export default function Home() {
	const history = useHistory();
	const wallet = useWallet();

	useEffect(() => {
		if (wallet.connected) {
			history.goBack();
		}
	});
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				marginTop: '100px',
			}}
		>
			<WalletMultiButton />
		</div>
	);
}
