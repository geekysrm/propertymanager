import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { useHistory, Link } from 'react-router-dom';

import Input from '../../components/Input/Input';

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

export default function UserProfile() {
	const [user, setUser] = useState({});
	const { id } = useParams();
	const wallet = useWallet();

	useEffect(() => {
		(async () => {
			const program = await getProgram();
			const account = await program.account.baseAccount.fetch(pair.publicKey);

			const currAccount = account.userList.filter(
				(user) => user.address === id
			);

			setUser({
				...currAccount[0],
				isAdmin: account.authority.toString() === id,
			});
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

	return (
		<Container className="home-container h-100">
			<Row className="h-100">
				<Col className="h-100 d-flex flex-column justify-content-center align-items-center">
					<p>{user.address}</p>
					<p>{user.name}</p>
					<p>{user.email}</p>
					<p>{user.phoneNumber}</p>
					<p>{JSON.stringify(user.propertyList)}</p>
					<p>{JSON.stringify(user.buyOrders)}</p>
					{user.isAdmin && (
						<Button as={Link} color="primary" to="/property/add">
							Add Property
						</Button>
					)}
				</Col>
			</Row>
		</Container>
	);
}
