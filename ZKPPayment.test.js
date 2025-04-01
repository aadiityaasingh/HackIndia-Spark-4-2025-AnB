const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ZKPPayment Contract", function () {
    let owner, user1, user2;
    let FakeINR, fakeINR;
    let ZKPPayment, zkpPayment;
    let Verifier, verifier;

    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();

        // Deploy FakeINR contract
        FakeINR = await ethers.getContractFactory("FakeINR");
        fakeINR = await FakeINR.deploy();
        await fakeINR.deployed();

        // Deploy Verifier contract (Mock)
        Verifier = await ethers.getContractFactory("MockVerifier");
        verifier = await Verifier.deploy();
        await verifier.deployed();

        // Deploy ZKPPayment contract
        ZKPPayment = await ethers.getContractFactory("ZKPPayment");
        zkpPayment = await ZKPPayment.deploy(fakeINR.address, verifier.address);
        await zkpPayment.deployed();

        // Mint tokens to user1
        await fakeINR.mint(user1.address, ethers.utils.parseEther("100"));

        // Approve ZKPPayment contract to spend user1's tokens
        await fakeINR.connect(user1).approve(zkpPayment.address, ethers.utils.parseEther("50"));
    });

    it("Should process multiple transactions using ZKPPayment", async function () {
        // Fake proof data (Replace with actual proof data)
        const validProof1 = { a: ["0x1"], b: [["0x2", "0x3"], ["0x4", "0x5"]], c: ["0x6"], publicSignals: ["0x7"] };
        const validProof2 = { a: ["0x8"], b: [["0x9", "0xA"], ["0xB", "0xC"]], c: ["0xD"], publicSignals: ["0xE"] };

        // Transaction 1: user1 → user2 (valid proof)
        await expect(
            zkpPayment.connect(user1).transferWithProof(user2.address, ethers.utils.parseEther("50"), validProof1)
        ).to.emit(zkpPayment, "TransferCompleted");

        // Approve ZKPPayment contract to spend user2's tokens
        await fakeINR.connect(user2).approve(zkpPayment.address, ethers.utils.parseEther("50"));

        // Transaction 2: user2 → owner (valid proof)
        await expect(
            zkpPayment.connect(user2).transferWithProof(owner.address, ethers.utils.parseEther("50"), validProof2)
        ).to.emit(zkpPayment, "TransferCompleted");
    });
});
