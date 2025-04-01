const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("🚀 Deploying FakeINR contract from:", deployer.address);

  const FakeINR = await hre.ethers.getContractFactory("FakeINR");
  const fakeINR = await FakeINR.deploy();
  await fakeINR.deployed();

  console.log("✅ FakeINR deployed at:", fakeINR.address);

  const mintAmount = hre.ethers.utils.parseUnits("100000000", 18);
  await fakeINR.mint(deployer.address, mintAmount);
  console.log(`💰 Minted 100000000 FakeINR to ${deployer.address}`);

  console.log("🎉 Deployment Successful!");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
