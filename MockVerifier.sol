
pragma solidity ^0.8.20;

contract MockVerifier {
    function verify(bytes memory proof, uint256[2] memory publicInputs) public pure returns (bool) {
        return true; // Always returns true for testing purposes
    }
}
