// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require('hardhat');

async function main() {

// <<<<< ERC20

  const ERC20 = await hre.ethers.deployContract('MyToken');
  await ERC20.waitForDeployment();
  console.log(`ERC20 contract is deployed to :: ${ERC20.target}`);

//<<<<< Counters Library

  const Counters = await hre.ethers.deployContract('Counters');
  await Counters.waitForDeployment();
  console.log(`Counters Library is deployed to :: ${Counters.target}`);

// <<<<< NFT Contract

  const NFT_Staking = await hre.ethers.deployContract(
    'NFT_Staking',
    [ERC20.target],
    {
      libraries: {
        Counters: Counters.target,
      },
    }
  );
  await NFT_Staking.waitForDeployment();
  console.log(`NFT Contract deployed to :: ${NFT_Staking.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
