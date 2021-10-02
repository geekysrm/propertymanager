import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { useHistory } from 'react-router-dom';

import Input from '../../components/Input/Input';

import './Register.scss';

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

export default function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [mobileNo, setMobileNo] = useState('');
	const wallet = useWallet();
	const history = useHistory();

	async function onHandleSubmit(e) {
		e.preventDefault();

		const walletAddress = wallet.publicKey.toString();
		const program = await getProgram();
		await program.rpc.register(walletAddress, name, email, mobileNo, {
			accounts: {
				baseAccount: pair.publicKey,
			},
		});

		history.push(`/user/${walletAddress}`);

		const account = await program.account.baseAccount.fetch(pair.publicKey);

		console.log('account', account);
	}

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

	if (!wallet.connected) {
		history.push('/not-connected');
	}

	return (
		<Form
			className="registration-form h-100 d-flex flex-column justify-content-center align-items-center"
			onSubmit={onHandleSubmit}
		>
			<Row>
				<Col xs="12">
					<h2 className="yellow-accent">Enter Your Details:</h2>
				</Col>
				<Col xs="12">
					<Input
						name="name"
						label="Name"
						placeholder="Enter Name"
						type="text"
						value={name}
						onHandleChange={setName}
						className="mb-3"
					></Input>
					<Input
						name="email"
						label="Email"
						placeholder="Enter Email"
						type="email"
						value={email}
						onHandleChange={setEmail}
						className="mb-3"
					></Input>
					<Input
						name="mobile-no"
						label="Mobile No"
						placeholder="Enter Mobile Number"
						type="tel"
						value={mobileNo}
						onHandleChange={setMobileNo}
						className="mb-3"
					></Input>
					<Button type="submit" color="primary">
						Submit
					</Button>
				</Col>
			</Row>
		</Form>
	);
}
