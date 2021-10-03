import { Connection, PublicKey } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';

import idl from '../idl.json';
import kp from '../keypair.json';

const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const pair = web3.Keypair.fromSecretKey(secret);

const opts = {
    preflightCommitment: 'processed',
};
const { SystemProgram } = web3;
const programID = new PublicKey(idl.metadata.address);

async function getProvider(wallet) {
    const network = 'http://127.0.0.1:8899';
    const connection = new Connection(network, opts.preflightCommitment);

    const provider = new Provider(connection, wallet, opts.preflightCommitment);
    return provider;
}

async function getProgram(wallet) {
    const provider = await getProvider(wallet);
    return new Program(idl, programID, provider);
}

async function getAccount(wallet) {
    const program = await getProgram(wallet);
    const provider = await getProvider(wallet);

    try {
        const account = await program.account.baseAccount.fetch(pair.publicKey);
        console.log("account", account);
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

function getPair() {
    return pair;
}

export { getProvider, getProgram, getAccount, getPair };