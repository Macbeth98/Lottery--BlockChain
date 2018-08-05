const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
  'inject begin slice burger pen midnight calm never latin face left retire',
  'https://rinkeby.infura.io/v3/5e078cd5c68d438d946e587841d7866e'
);

const web3 = new Web3(provider);

const deploy = async () =>{
  const accounts = await web3.eth.getAccounts();

  console.log('Deploying from account',accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ data:'0x'+bytecode})
  .send( {gas: '1000000', from: accounts[0] });

  console.log(interface);
  console.log('Contract deployed to', result.options.address);
};

deploy();
