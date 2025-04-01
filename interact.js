const hre = require("hardhat");
const { ethers } = hre;

async function main() {
    try {
        const [owner, user1] = await ethers.getSigners();

        
        const fakeINRAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"; 
        const zkppaymentAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        if (fakeINRAddress === "FAKE_INR_DEPLOYED_ADDRESS" || zkppaymentAddress === "ZKP_PAYMENT_DEPLOYED_ADDRESS") {
            throw new Error("❌ Replace placeholder addresses before running the script!");
        }

        const FakeINR = await ethers.getContractFactory("FakeINR");
        const fakeINR = await FakeINR.attach(fakeINRAddress);

        const ZKPPayment = await ethers.getContractFactory("ZKPPayment");
        const zkppayment = await ZKPPayment.attach(zkppaymentAddress);

        console.log("🚀 Minting 1000 FakeINR to user...");
        await fakeINR.mint(user1.address, ethers.utils.parseEther("1000"));

        console.log("✅ Minting successful!");

        console.log("🔏 Approving ZKPPayment contract...");
        await fakeINR.connect(user1).approve(zkppayment.address, ethers.utils.parseEther("500"));

        console.log("✅ Approval successful!");

    
        const proof = "0x..."; 
        const publicInputs = [1, 2]; 

        console.log("💸 Making payment using ZKP...");
        await zkppayment.connect(user1).transferWithProof(
            owner.address, 
            ethers.utils.parseEther("500"),
            proof,
            publicInputs
        );

        console.log("✅ Transaction successful!");
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}

main().then(() => process.exit(0));
