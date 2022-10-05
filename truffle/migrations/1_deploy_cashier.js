const Cashier = artifacts.require("Cashier");

module.exports = async (deployer, network) => {
  var network_id, contractAddress;
  if (network == "moonbase")
    network_id = 1287;
  else if (network == "fuji")
    network_id = 43113;
  else if (network == "milkomedatestnet") {
    contractAddress = "0xb9c231AC974490eAea2933c7efbCD0C6D6533bDa";
    network_id = 200101;
  }
  else if (network == "development") {
    contractAddress = "0xEe542aDF67bF32062d3444696629A981450E00e2";
    network_id = 5777;
  }
  await deployer.deploy(Cashier, network_id);
  const banana = await Cashier.deployed();
  await banana.setWhitelistAddress(contractAddress);
};