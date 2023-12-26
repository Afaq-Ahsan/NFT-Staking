# NFT Staking and Reward Distribution Contract
## Overview
This smart contract serves as an NFT staking platform with built-in reward distribution functionality. Designed to work with ERC721 tokens, users can stake their NFTs and receive rewards in an ERC20 token over time. The contract offers a range of features, including NFT minting, staking, unstaking, reward claiming, and more.

## Key Features
ERC721 Compatibility: The contract is compliant with the ERC721 standard, enabling users to stake their NFTs.

Staking and Unstaking: Users can stake and unstake their NFTs, and the contract calculates rewards based on staking duration.

Reward Distribution: Rewards are distributed in an ERC20 token, providing an incentive for users to stake their NFTs.

Blacklisting: The owner has the ability to blacklist specific addresses, restricting their actions within the contract.

Pause and Unpause: The contract can be paused and unpaused by the owner, controlling certain functionalities during maintenance or emergencies.

NFT Minting: The contract supports the minting of new NFTs, allowing users to purchase and own them.

Contract Functions
The contract offers various functions, including staking, unstaking, claiming rewards, starting/stopping staking, buying NFTs, reselling NFTs, withdrawing Ether, and more. These functions provide flexibility and control over the contract's operation.

## Additional Information
Token URI Base: The contract uses a specific IPFS gateway as the base URI for token metadata. Users can customize this by updating the _baseURI function.

NFT Minting at Deployment: The contract automatically mints a predetermined number of NFTs during deployment. Users can modify this behavior by adjusting the mintNFTatDeployement function.

Price and Cap Adjustments: The owner can set the NFT price, retrieve the current price, and set the maximum cap for NFTs to be minted.

Pause and Unpause: The owner can temporarily pause and later unpause the contract, controlling contract functionalities.

ERC20 Reward Token: The contract requires an ERC20 token (rewardToken) for reward distribution. Users must ensure the correct setup of the ERC20 token during contract deployment.

Contract Destruction: The owner can destroy the contract, transferring any remaining balance to themselves.

## Testing
The contract includes a suite of tests to validate its proper functionality under various scenarios. Users are advised to thoroughly review and test the contract before deployment and consider professional audit services for added security.

## Disclaimer
This contract is provided "as-is." Users deploy and use it at their own risk. A comprehensive review and testing process are recommended before deploying it in a production environment. Seeking professional audit services is advisable for enhanced security.
