const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Deploy RewardToken
  const RewardToken = await hre.ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy();
  await rewardToken.waitForDeployment();
  console.log("RewardToken deployed to:", await rewardToken.getAddress());

  // Deploy TaskManager with the reward token address
  const TaskManager = await hre.ethers.getContractFactory("TaskManager");
  const taskManager = await TaskManager.deploy(await rewardToken.getAddress());
  await taskManager.waitForDeployment();
  console.log("TaskManager deployed to:", await taskManager.getAddress());

  // Transfer minting rights to TaskManager
  const tx = await rewardToken.transferOwnership(await taskManager.getAddress());
  await tx.wait();
  console.log("Minting rights transferred to TaskManager.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
