const anchor = require('@project-serum/anchor');
const assert = require("assert");

const { SystemProgram } = anchor.web3;

describe('propertymanager', () => {

  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Propertymanager;

  const baseAccount = anchor.web3.Keypair.generate();

  it("Init", async () => {

    const tx = await program.rpc.initialize(provider.wallet.publicKey, {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });
    console.log("Your transaction signature", tx);

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log("account", account);
  });

  it("Register", async () => {
    const tx = await program.rpc.register(provider.wallet.publicKey.toString(), "admin", 
    "admin@admin.com", "999999999", {
      accounts: {
        baseAccount: baseAccount.publicKey,
      }
    });
    console.log("Your transaction signature", tx);

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log("account", account);
    console.log("user", account.userList[0].toString());
  });
});
