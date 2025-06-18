import { ethers } from "hardhat";

async function main() {
  // Deploy RewardToken
  const RewardToken = await ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy();
  await rewardToken.deployed();
  console.log("RewardToken deployed to:", rewardToken.address);

  // Deploy TaskManager
  const TaskManager = await ethers.getContractFactory("TaskManager");
  const taskManager = await TaskManager.deploy(rewardToken.address);
  await taskManager.deployed();
  console.log("TaskManager deployed to:", taskManager.address);

  // Transfer ownership of RewardToken to TaskManager
  const transferTx = await rewardToken.transferOwnership(taskManager.address);
  await transferTx.wait();
  console.log("RewardToken ownership transferred to TaskManager");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 