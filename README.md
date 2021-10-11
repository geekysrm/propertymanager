## SolProperty
SolProperty is a decentralized application that manages people's property records. 

It stores all the property records along with it's ownership & other details on blockchain for transparency, immutability & safety. It enables zero fraud property transfers between two parties maintaining high integrity & trust. Property transfers on this application are simple, fast & secure. The application also has a unified property marketplace where people can come and check the details of a particular property and raise a buy request hence eliminating intermediaries.

### Testing Instructions
**Testing on solproperty.tech :**
- Visit https://solproperty.tech
- Click on "Connect Now" button on the homepage.
- Ensure you are connected to Solana Devnet using Phantom wallet and have some SOL balance in the wallet.
- Click on "Connect" and then "Continue"
- Create your user account by entering the required details.
- Then you can see your user profile page, along with the properties you have owned.
- You can browse the marketplace for available properties, see the property details and raise a "Buy Request" to the owner of that property.
- If you are the owner of a property, you can approve/reject a "Buy Request"
- If you are the owner of a property, you can also transfer the property directly to someone else.
- Once transferred/the buy request is approved, the property will then be transferred to the new user.

**Testing on local :**
 - Clone the Git Repo
 - Run `anchor build`
 - Run `solana address -k target/deploy/propertymanager-keypair.json` and the update the address you get in response in `Anchor.toml` & `lib.rs`
 - Run `anchor deploy`
 - cd into `/application/scripts` and then run `node init.js`
 - cd into `/application`  and then run `npm start`
 - Now access the Dapp on http://localhost:3000/
 - Use the Dapp on solana devnet similarly as mentioned above.

### Built with
- Solana Blockchain Network
- Anchor Framework
- Rust
- React.js
- Chakra UI

### Authors
- Soumya Ranjan Mohanty
- K Sai Kishan
- Amiya Kumar Tripathy
