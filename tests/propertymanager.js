const anchor = require("@project-serum/anchor");

const { SystemProgram } = anchor.web3;

describe("propertymanager", () => {
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

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log("account", account);
  });

  it("Register", async () => {
    const tx = await program.rpc.register(
      provider.wallet.publicKey.toString(),
      "admin",
      "admin@admin.com",
      "999999999",
      {
        accounts: {
          baseAccount: baseAccount.publicKey,
        },
      }
    );
    console.log("Your transaction signature", tx);

    await program.rpc.register(
      "fake-address",
      "fake",
      "fake@fake.com",
      "999999999",
      {
        accounts: {
          baseAccount: baseAccount.publicKey,
        },
      }
    );

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log("account", account);
    console.log("user", account.userList[0].toString());
  });

  it("Add Property", async () => {
    const tx = await program.rpc.addproperty(
      "property-id",
      "property1",
      "address...",
      "dimenstions",
      "zip",
      "lat",
      "lng",
      {
        accounts: {
          baseAccount: baseAccount.publicKey,
          authority: provider.wallet.publicKey,
        },
      }
    );
    console.log("Your transaction signature", tx);

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log("account", account);
    console.log("user", account.userList[0].toString());
    console.log("property list", account.userList[0].propertyList.toString());
    console.log("property", account.propertyList[0].toString());
  });

  it("Transfer Property", async () => {

    let account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log("Before....");
    console.log("account", account);
    console.log("user0", account.userList[0]);
    console.log("user1", account.userList[1]);
    console.log("property list0", account.userList[0].propertyList);
    console.log("property list1", account.userList[1].propertyList);
    console.log("property", account.propertyList[0]);

    const tx = await program.rpc.transfer(
      provider.wallet.publicKey.toString(),
      "fake-address",
      "property-id", 
      {
        accounts: {
          baseAccount: baseAccount.publicKey,
        },
      }
    );
    console.log("Your transaction signature", tx);

    account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log("After....");
    console.log("account", account);
    console.log("user0", account.userList[0]);
    console.log("user1", account.userList[1]);
    console.log("property list0", account.userList[0].propertyList);
    console.log("property list1", account.userList[1].propertyList);
    console.log("property", account.propertyList[0]);
  });

  it("Create Buy order", async () => {

    const tx = await program.rpc.createbuyorder(
      "random-order-id",
      provider.wallet.publicKey.toString(),
      "fake-address",
      "property-id", 
      {
        accounts: {
          baseAccount: baseAccount.publicKey,
        },
      }
    );
    console.log("Your transaction signature", tx);

    await program.rpc.createbuyorder(
      "to_be_rejected-order-id",
      provider.wallet.publicKey.toString(),
      "fake-address",
      "property-id", 
      {
        accounts: {
          baseAccount: baseAccount.publicKey,
        },
      }
    );

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log("account", account);
    console.log("buy order list", account.buyOrderList);
  });

  it("Approve buy request", async () => {

    let account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log("Before....");
    console.log("account", account);
    console.log("user0", account.userList[0]);
    console.log("user1", account.userList[1]);
    console.log("property list0", account.userList[0].propertyList);
    console.log("property list1", account.userList[1].propertyList);
    console.log("property", account.propertyList[0]);

    const tx = await program.rpc.approve(
      "random-order-id",
      {
        accounts: {
          baseAccount: baseAccount.publicKey,
        },
      }
    );
    console.log("Your transaction signature", tx);
    
    account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log("After....");
    console.log("account", account);
    console.log("user0", account.userList[0]);
    console.log("user1", account.userList[1]);
    console.log("property list0", account.userList[0].propertyList);
    console.log("property list1", account.userList[1].propertyList);
    console.log("property", account.propertyList[0]);
  });

  it("Reject buy request", async () => {

    const tx = await program.rpc.reject(
      "to_be_rejected-order-id",
      {
        accounts: {
          baseAccount: baseAccount.publicKey,
        },
      }
    );
    console.log("Your transaction signature", tx);

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log("account", account);
    console.log("buy order list", account.buyOrderList);
  })
});
