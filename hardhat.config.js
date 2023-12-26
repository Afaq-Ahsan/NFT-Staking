require('@nomicfoundation/hardhat-toolbox');

require('@nomicfoundation/hardhat-verify');

require('dotenv').config();

const { PRIVATE_KEY, URL, APIKEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.20',
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  },

  defaultNetwork: 'polygon_mumbai',
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      blockGasLimit: 600000000,
    },

    polygon_mumbai: {
      url: URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },

  etherscan: {
    apiKey: APIKEY,
  },
};
