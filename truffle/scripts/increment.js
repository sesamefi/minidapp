/*
  Try `truffle exec scripts/increment.js`, you should `truffle migrate` first.

  Learn more about Truffle external scripts: 
  https://trufflesuite.com/docs/truffle/getting-started/writing-external-scripts
*/

const Cashier = artifacts.require("Cashier");

module.exports = async function (callback) {
  const deployed = await Cashier.deployed();
  const networkID = deployed.constructor.network_id;
  console.log(`Deployer: ${deployed.constructor.class_defaults.from}`);
  console.log(`Deployment address: ${deployed.constructor._json.networks[networkID].address}`);

  /* Ca ne marche pas sur Milkomeda C1 Testnet
  const currentValue = (await deployed.getBalanceContract()).toNumber();
  console.log(`Current Cashier balance: ${currentValue}`); */

  /* const { tx } = await deployed.write(currentValue + 1);
  console.log(`Confirmed transaction ${tx}`);

  const updatedValue = (await deployed.read()).toNumber();
  console.log(`Updated Cashier value: ${updatedValue}`); */

  callback();
};
