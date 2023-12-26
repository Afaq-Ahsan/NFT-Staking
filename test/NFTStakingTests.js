const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('ERC20 and ERC721 Contract', function () {
  let Owner;
  let user1;
  let user2;
  let user3;
  let erc20Contract;
  let nft_staking;
  let counter;

  beforeEach(async function () {
    [Owner, user1, user2, user3] = await ethers.getSigners();

    // Deploy ERC20 Contract
    const ERC20_Contract = await ethers.getContractFactory('MyToken');
    erc20Contract = await ERC20_Contract.deploy();

    // Deploy Counters Library
    const Counters = await ethers.getContractFactory('Counters');
    counter = await Counters.deploy();

    // Deploy NFT_Staking Contract with Counters Library linked
    const NFT_Staking = await ethers.getContractFactory('NFT_Staking', {
      libraries: {
        Counters: counter.target, // Use .address to get the deployed address of the library
      },
    });

    nft_staking = await NFT_Staking.deploy(erc20Contract.target);

    await erc20Contract
      .connect(Owner)
      .approve(nft_staking, ethers.parseEther('100000'));
  });

  it('Should get ERC20 Contract name', async function () {
    expect(await erc20Contract.name()).to.equal('Phoenix');
  });

  it('Should get ERC721 Contract name', async function () {
    expect(await nft_staking.name()).to.equal('Phoenix-NFT');
  });

  it('In the ERC721 Contract The owner have 10 MInted NFTs', async function () {
    const nftsAmount = Number(await nft_staking.balanceOf(Owner.address));

    expect(nftsAmount).to.equal(10);
  });

  it('Owner should start the staking', async function () {
    await nft_staking.connect(Owner).startStaking();

    expect(await nft_staking.stakingStarted()).to.equal(true);
  });

  it('The contract should allow anyone to stake nfts', async function () {
    await nft_staking.connect(user1).buyNFTs(2, { value: 2 });

    await nft_staking.connect(Owner).startStaking();
    await nft_staking.connect(Owner).stakeNFTs(1);
    await nft_staking.connect(user1).stakeNFTs(12);

    let stakerIndex = await nft_staking.getStakerIndex(Owner.address);
    let stakerIndex2 = await nft_staking.getStakerIndex(user1.address);

    const stakeInfo = await nft_staking.stakes(
      Owner.address,
      Number(stakerIndex) - 1
    );
    const stakeInfo2 = await nft_staking.stakes(
      user1.address,
      Number(stakerIndex2) - 1
    );

    expect(stakeInfo.NFtStake).to.equal(true);

    expect(stakeInfo.nftIDToStake).to.equal(1);

    expect(stakeInfo2.NFtStake).to.equal(true);

    expect(stakeInfo2.nftIDToStake).to.equal(12);
  });

  it('user stake NFT and get the reward which is .5 for the staking of per day', async function () {
    await nft_staking.connect(user1).buyNFTs(5, { value: 10 });

    await nft_staking.connect(Owner).startStaking();

    await nft_staking.connect(user1).stakeNFTs(12);

    await ethers.provider.send('evm_increaseTime', [1728000]); // 20 days
    await ethers.provider.send('evm_mine');

    let stakerIndex = await nft_staking.getStakerIndex(user1.address);

    await nft_staking.connect(user1).unStakeNFT(Number(stakerIndex) - 1);

    expect(await erc20Contract.balanceOf(user1)).to.equal(10);
    expect(await nft_staking.ownerOf(12)).to.equal(user1.address);
  });

  it('should calculate the exact rewards', async function () {
    await nft_staking.connect(user1).buyNFTs(5, { value: 5 });

    await nft_staking.connect(Owner).startStaking();

    await nft_staking.connect(user1).stakeNFTs(13);

    await ethers.provider.send('evm_increaseTime', [8640000]); // 100 days
    await ethers.provider.send('evm_mine');

    let stakerIndex = await nft_staking.getStakerIndex(user1.address);

    await nft_staking.connect(user1).unStakeNFT(Number(stakerIndex) - 1);

    expect(await erc20Contract.balanceOf(user1)).to.equal(50);
    expect(await nft_staking.ownerOf(13)).to.equal(user1.address);
  });

  it('user stake NFT and claim rewards', async function () {
    await nft_staking.connect(user1).buyNFTs(5, { value: 10 });

    await nft_staking.connect(Owner).startStaking();

    await nft_staking.connect(user1).stakeNFTs(12);

    await ethers.provider.send('evm_increaseTime', [1728000]); // 20 days
    await ethers.provider.send('evm_mine');

    let stakerIndex = await nft_staking.getStakerIndex(user1.address);

    await nft_staking.connect(user1).claimRewards(Number(stakerIndex) - 1);

    expect(await erc20Contract.balanceOf(user1)).to.equal(10);
    expect(await nft_staking.ownerOf(12)).to.equal(nft_staking.target);
  });

  it('Should allow anyone to buy nft by giving its price', async function () {
    await nft_staking.connect(user1).buyNFTs(5, { value: 5 });
    const amount = await nft_staking.walletOfOwner(user1.address);
    expect(amount.length).to.equal(5);
  });

  it('Should mint 10 Nfts to the owners address', async function () {
    expect(await nft_staking.balanceOf(Owner)).to.equal(10);
  });
});
