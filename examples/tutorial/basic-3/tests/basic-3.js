const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

describe("basic-3", () => {
  const provider = anchor.Provider.local();

  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  it("Performs CPI from puppet master to puppet", async () => {
    const puppetMaster = anchor.workspace.PuppetMaster;
    const puppet = anchor.workspace.Puppet;

    // Initialize a new puppet account.
    const newPuppetAccount = anchor.web3.Keypair.generate();

    // Invoke the puppet master to perform a CPI to the puppet.
    await puppetMaster.rpc.pullStrings(new anchor.BN(111), {
      accounts: {
        puppet: newPuppetAccount.publicKey,
        puppetProgram: puppet.programId,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
    });
  });
});
