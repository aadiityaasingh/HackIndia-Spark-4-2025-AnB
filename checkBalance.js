const { ethers } = require("hardhat");

async function main() {
  try {

    const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"; 


    const walletAddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"; 


    const FakeINR = await ethers.getContractFactory("FakeINR");
    const fakeINR = await FakeINR.attach(contractAddress);


    const balance = await fakeINR.balanceOf(walletAddress);

   
    console.log(`💰 Balance of ${walletAddress}:`, ethers.utils.formatUnits(balance, 18), "FakeINR");
  } catch (error) {
    console.error("❌ Error fetching balance:", error);
  }
}

main();
