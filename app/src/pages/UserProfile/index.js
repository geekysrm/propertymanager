import React, { useEffect, useState } from 'react';
import {
	Container,
	Row,
	Col,
	Button,
	ListGroupItem,
	ListGroup,
	Form,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { useHistory, Link } from 'react-router-dom';

import Modal from '../../components/Modal';
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

export default function UserProfile() {
	const [user, setUser] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [transferAddr, setTransferAddr] = useState('');
	const [selectedProperty, setSelectedProperty] = useState(null);
	const { id } = useParams();
	const wallet = useWallet();
	const history = useHistory();

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
		const network = clusterApiUrl('devnet');
		const connection = new Connection(network, opts.preflightCommitment);

		const provider = new Provider(connection, wallet, opts.preflightCommitment);
		return provider;
	}

	async function getProgram() {
		const provider = await getProvider();
		return new Program(idl, programID, provider);
	}

	function onPropertyTransfer(property) {
		setSelectedProperty(property);
		setShowModal(true);
	}

	function getPropertyListItem(properties) {
		return properties.map((property) => (
			<ListGroupItem key={property}>
				<Button variant="link" as={Link} to={`/property/${property}`}>
					{property}
				</Button>
				<Button
					variant="secondary"
					onClick={() => onPropertyTransfer(property)}
				>
					Transfer
				</Button>
			</ListGroupItem>
		));
	}

	async function onHandleSubmit(e) {
		e.preventDefault();
		const program = await getProgram();
		await program.rpc.transfer(user.address, transferAddr, selectedProperty, {
			accounts: {
				baseAccount: pair.publicKey,
			},
		});

		const account = await program.account.baseAccount.fetch(pair.publicKey);

		const currAccount = account.userList.filter((user) => user.address === id);

		setUser({
			...currAccount[0],
			isAdmin: account.authority.toString() === id,
		});

		setSelectedProperty(null);
		setShowModal(false);
	}

	if (!wallet.connected) {
		history.push('/not-connected');
	}

	return (
		<>
			<Container className="home-container h-100">
				<Row className="h-100">
					<Col className="h-100 d-flex flex-column justify-content-center align-items-center">
						<p>{user.address}</p>
						<p>{user.name}</p>
						<p>{user.email}</p>
						<p>{user.phoneNumber}</p>
						<p>{JSON.stringify(user.propertyList)}</p>
						{user && user.propertyList && (
							<ListGroup>{getPropertyListItem(user.propertyList)}</ListGroup>
						)}
						<p>{JSON.stringify(user.buyOrders)}</p>
						{user.isAdmin && (
							<Button as={Link} color="primary" to="/property/add">
								Add Property
							</Button>
						)}
					</Col>
				</Row>
			</Container>
			<Modal show={showModal} header="Transfer Property" onHide={setShowModal}>
				<Form onSubmit={onHandleSubmit}>
					<Input
						name="transfer-to-address"
						label="Transfer To Address"
						placeholder="Enter Address To Transfer"
						type="text"
						value={transferAddr}
						onHandleChange={setTransferAddr}
						className="mb-3"
					></Input>
					<Button type="submit" variant="primary">
						Transfer
					</Button>
				</Form>
			</Modal>
		</>
	);
}
