// pragma circom 2.0;  // For Circom 2.0 version
include "circomlib/circuits/poseidon.circom";  // Correct path for Poseidon hash

template OTPVerifier() {
    // Inputs
    signal input otp;      // User ka OTP (private input)
    signal input otpHash;  // OTP ka hashed value (public input)
    
    // Output
    signal output isValid;

    // Compute the hash of the input OTP
    signal computedHash;
    computedHash <== Poseidon([otp]);

    // Compare computed hash with stored hash
    isValid <== computedHash == otpHash;  // Correct comparison operator
}

component main = OTPVerifier();
