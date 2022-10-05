const Cashier = artifacts.require("Cashier");
// Les adresses stockees devraient etre dans une liste JSON (cf. axelar-local-gmp-examples/info/testnet.json
// et axelar-local-gmp-examples/scripts/deploy.js)

contract('Cashier', () => {
  it('should read whitelist contract deployment address', async() => {
    const cashierInstance = await Cashier.deployed();
    const storedAddress = await cashierInstance.deployedWhitelist.call();
    const networkID = cashierInstance.constructor.network_id;
    var whitelistAddress;
    if (networkID == 200101)
      whitelistAddress = "0xb9c231AC974490eAea2933c7efbCD0C6D6533bDa";
    else if (networkID == 5777)
      whitelistAddress = "0xEe542aDF67bF32062d3444696629A981450E00e2";
    assert.equal(storedAddress, whitelistAddress, "the stored address wasn't the correct one");
  });
});
