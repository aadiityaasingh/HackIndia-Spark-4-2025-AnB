const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");
const FakeINR_ABI = require("../contracts/FakeINR.json");
const ZKPPayment_ABI = require("../contracts/ZKPPayment.json");

// Smart Contract Addresses
const FakeINR_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"; // FakeINR contract address
const ZKPPayment_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // ZKPPayment contract address

// Ethereum Provider & Signer
const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/YOUR_INFURA_ID");
const wallet = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);

// FakeINR Contract Instance
const FakeINR = new ethers.Contract(FakeINR_ADDRESS, FakeINR_ABI, wallet);

// ZKPPayment Contract Instance
const ZKPPayment = new ethers.Contract(ZKPPayment_ADDRESS, ZKPPayment_ABI, wallet);

// ✅ 1. Generate ZKP Proof
router.post("/generateProof", async (req, res) => {
    const { phoneNumber, accountNumber } = req.body;

    // 🔹 ZKP Generate logic yaha call karni hai (Circom + SnarkJS)
    const proof = await generateZKPProof(phoneNumber, accountNumber);

    res.json({ proof });
});

// ✅ 2. Verify Proof & Approve FakeINR
router.post("/approve", async (req, res) => {
    const { proof, amount } = req.body;

    // 🔹 Proof Verification
    const isValid = await verifyZKPProof(proof);

    if (!isValid) return res.status(400).json({ error: "Invalid Proof" });

    // 🔹 FakeINR Approve karo
    const tx = await FakeINR.approve(ZKPPayment_ADDRESS, amount);
    await tx.wait();

    res.json({ success: true, message: "Approved FakeINR for ZKP Payment" });
});

// ✅ 3. Execute ZKP Payment
router.post("/pay", async (req, res) => {
    const { receiver, amount } = req.body;

    // 🔹 ZKP-based Payment Execute karo
    const tx = await ZKPPayment.makePayment(receiver, amount);
    await tx.wait();

    res.json({ success: true, message: "Payment Successful" });
});

module.exports = router;
