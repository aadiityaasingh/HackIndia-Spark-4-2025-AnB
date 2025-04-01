const { ethers } = require("hardhat");

async function main() {
    try {
        const [deployer] = await ethers.getSigners();
        console.log("🚀 Deploying contracts with the account:", deployer.address);

        
        const fakeINRAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"; 
        const verifierAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 

        console.log("🏗 Deploying ZKPPayment contract...");
        const ZKPPayment = await ethers.getContractFactory("ZKPPayment");
        const zkppayment = await ZKPPayment.deploy(fakeINRAddress, verifierAddress);
        await zkppayment.deployed();

        console.log("✅ ZKPPayment deployed at:", zkppayment.address);
    } catch (error) {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    }
}

main().then(() => process.exit(0));
