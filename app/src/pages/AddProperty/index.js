import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Connection, PublicKey } from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { useHistory, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Input from "../../components/Input/Input";

import idl from "../../idl.json";
import kp from "../../keypair.json";

import {
  clusterApiUrl
} from '@solana/web3.js';

const network = clusterApiUrl('devnet');


const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const pair = web3.Keypair.fromSecretKey(secret);

const opts = {
  preflightCommitment: "processed",
};
const programID = new PublicKey(idl.metadata.address);

export default function AddProperty() {
  const wallet = useWallet();
  const history = useHistory();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [zip, setZip] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  useEffect(() => {
    (async () => {
      const program = await getProgram();
      const account = await program.account.baseAccount.fetch(pair.publicKey);
      if (account.authority.toString() !== wallet.publicKey.toString()) {
        history.push("/");
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

  async function onHandleSubmit(e) {
    e.preventDefault();

    const walletAddress = wallet.publicKey.toString();
    const program = await getProgram();
    await program.rpc.addproperty(
      uuidv4(),
      name,
      address,
      dimensions,
      zip,
      lat,
      lng,
      {
        accounts: {
          baseAccount: pair.publicKey,
          authority: wallet.publicKey,
        },
      }
    );

    history.push(`/user/${walletAddress}`);

    const account = await program.account.baseAccount.fetch(pair.publicKey);

    console.log("account", account);
  }

  if (!wallet.connected) {
    history.push("/not-connected");
  }

  return (
    <Form
      className="registration-form h-100 d-flex flex-column justify-content-center align-items-center"
      onSubmit={onHandleSubmit}
    >
      <Row>
        <Col xs="12">
          <h2 className="yellow-accent">Enter Your Property Details:</h2>
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
            name="address"
            label="Address"
            placeholder="Enter Address"
            type="text"
            value={address}
            onHandleChange={setAddress}
            className="mb-3"
          ></Input>
          <Input
            name="dimensions"
            label="Dimensions"
            placeholder="Enter Dimensions"
            type="text"
            value={dimensions}
            onHandleChange={setDimensions}
            className="mb-3"
          ></Input>
          <Input
            name="zip"
            label="Zipcode"
            placeholder="Enter Zipcode"
            type="text"
            value={zip}
            onHandleChange={setZip}
            className="mb-3"
          ></Input>
          <Input
            name="lat"
            label="Latitude"
            placeholder="Enter Latitude"
            type="text"
            value={lat}
            onHandleChange={setLat}
            className="mb-3"
          ></Input>
          <Input
            name="lng"
            label="Longitude"
            placeholder="Enter Longitude"
            type="text"
            value={lng}
            onHandleChange={setLng}
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
