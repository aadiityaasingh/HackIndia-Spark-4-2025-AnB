const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { generateProof, verifyProof } = require("../zkp/proofGen");

// User verification using ZKP
router.post("/verify", async (req, res) => {
  const { phoneNumber } = req.body;

  const user = await User.findOne({ phoneNumber });
  if (!user) return res.status(404).json({ error: "User not found" });

  const proof = await generateProof(phoneNumber, user.accountActive);
  res.json({ proof });
});

module.exports = router;
