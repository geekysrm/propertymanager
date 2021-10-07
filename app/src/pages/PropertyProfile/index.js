import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { useHistory, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Input from '../../components/Input/Input';

import idl from '../../idl.json';
import kp from '../../keypair.json';

import {
	clusterApiUrl
  } from '@solana/web3.js';
  
  const network = clusterApiUrl('devnet');
  

const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const pair = web3.Keypair.fromSecretKey(secret);

const opts = {
	preflightCommitment: 'processed',
};
const { SystemProgram } = web3;
const programID = new PublicKey(idl.metadata.address);

export default function PropertyProfile() {
	const [property, setProperty] = useState(null);
	const { id } = useParams();
	const wallet = useWallet();
	const history = useHistory();

	useEffect(() => {
		(async () => {
			const provider = await getProvider();
			const program = await getProgram();
			const account = await program.account.baseAccount.fetch(pair.publicKey);

			const currProperty = account.propertyList.filter(
				(property) => property.id === id
			);

			if (currProperty.length > 0) {
				setProperty({
					...currProperty[0],
				});
			}
		})();
	}, []);

	async function getProvider() {
		const network = clusterApiUrl('devnet');
		const connection = new Connection(network, opts.preflightCommitment);

		const provider = new Provider(connection, wallet, opts.preflightCommitment);
		return provider;
	}

	async function getProgram() {
		const provider = await getProvider();
		return new Program(idl, programID, provider);
	}

	if (!wallet.connected) {
		history.push('/not-connected');
	}

	async function onBuyRequest() {
		const requestId = uuidv4();
		const program = await getProgram();
		await program.rpc.createbuyorder(
			requestId,
			wallet.publicKey.toString(),
			property.currentOwner,
			property.id,
			{
				accounts: {
					baseAccount: pair.publicKey,
				},
			}
		);
		console.log('request id', requestId);
		alert(`created with order id ${requestId}`);
	}

	if (property) {
		return (
			<Container className="home-container h-100">
				<Row className="h-100">
					<Col className="h-100 d-flex flex-column justify-content-center align-items-center">
						<p>{property?.id}</p>
						<p>{property?.address}</p>
						<p>{property?.name}</p>
						<p>{property?.dimensions}</p>
						<p>{property?.zipCode}</p>
						<p>{property?.lat}</p>
						<p>{property?.lng}</p>
						<p>{property?.currentOwner}</p>
						<p>{JSON.stringify(property?.pastOwnerList)}</p>
						{property?.currentOwner !== wallet.publicKey.toString() ? (
							<Button color="primary" onClick={onBuyRequest}>
								Buy Request
							</Button>
						) : null}
					</Col>
				</Row>
			</Container>
		);
	}

	return (
		<Container className="home-container h-100">
			<Row className="h-100">
				<Col className="h-100 d-flex flex-column justify-content-center align-items-center">
					<p>Property with {id} doesn't exist!</p>
				</Col>
			</Row>
		</Container>
	);
}
