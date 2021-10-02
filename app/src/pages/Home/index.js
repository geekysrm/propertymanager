import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { useHistory } from 'react-router-dom';

import './Home.scss';

import idl from '../../idl.json';
import kp from '../../keypair.json';

const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const pair = web3.Keypair.fromSecretKey(secret);

const opts = {
	preflightCommitment: 'processed',
};
const { SystemProgram } = web3;
const programID = new PublicKey(idl.metadata.address);

export default function Home() {
	const wallet = useWallet();
	const history = useHistory();

	useEffect(() => {
		(async () => {
			const account = await getAccount();
			const walletAddress = wallet.publicKey.toString();
			console.log('account', account);
			console.log('>>>> wallet addr', walletAddress);
			const currAccount = account.userList.filter(
				(user) => user.address === walletAddress
			);

			if (currAccount.length > 0) {
				history.push(`/user/${walletAddress}`);
			} else {
				history.push('/register');
			}
		})();
	}, []);

	async function getProvider() {
		const network = 'http://127.0.0.1:8899';
		const connection = new Connection(network, opts.preflightCommitment);

		const provider = new Provider(connection, wallet, opts.preflightCommitment);
		return provider;
	}

	async function getProgram() {
		const provider = await getProvider();
		return new Program(idl, programID, provider);
	}

	async function getAccount() {
		const program = await getProgram();
		const provider = await getProvider();
		try {
			const account = await program.account.baseAccount.fetch(pair.publicKey);
			return account;
		} catch (err) {
			console.error(err);
			await program.rpc.initialize(provider.wallet.publicKey, {
				accounts: {
					baseAccount: pair.publicKey,
					user: provider.wallet.publicKey,
					systemProgram: SystemProgram.programId,
				},
				signers: [pair],
			});
		}
	}

	if (!wallet.connected) {
		history.push('/not-connected');
	}

	return (
		<Container className="home-container h-100">
			<Row className="h-100">
				<Col className="h-100 d-flex flex-column justify-content-center align-items-center">
					Home
				</Col>
			</Row>
		</Container>
	);
}
