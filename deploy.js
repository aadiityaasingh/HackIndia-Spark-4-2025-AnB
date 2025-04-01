const hre = require("hardhat");

async function main() {
  const FakeINR = await hre.ethers.getContractFactory("FakeINR");
  const fakeINR = await FakeINR.deploy();

  await fakeINR.waitForDeployment();

  console.log("FakeINR deployed to:", await fakeINR.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
