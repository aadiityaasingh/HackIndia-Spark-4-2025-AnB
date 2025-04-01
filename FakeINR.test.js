const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FakeINR Token", function () {
    let fakeINR, owner, addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        const FakeINR = await ethers.getContractFactory("FakeINR");
        fakeINR = await FakeINR.deploy();
        await fakeINR.deployed();
    });

    it("Should mint tokens to the owner", async function () {
        const ownerBalance = await fakeINR.balanceOf(owner.address);
        expect(ownerBalance).to.equal(ethers.utils.parseEther("100000000"));
    });
});
