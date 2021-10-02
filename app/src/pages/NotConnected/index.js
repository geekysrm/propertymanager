import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Home() {
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
