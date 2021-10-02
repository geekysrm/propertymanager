const fs = require('fs');
const anchor = require('@project-serum/anchor');
const web3 = require('@solana/web3.js');
const account = anchor.web3.Keypair.generate();
const idl = require('../../target/idl/propertymanager.json');

fs.writeFileSync('../src/idl.json', JSON.stringify(idl));
fs.writeFileSync('../src/keypair.json', JSON.stringify(account));
