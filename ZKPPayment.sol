
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ZKPPayment {
    address public token; 
    address public verifier; 

    event Payment(address indexed sender, address indexed receiver, uint256 amount);

    constructor(address _token, address _verifier) {
        require(_token != address(0), "Invalid token address");
        require(_verifier != address(0), "Invalid verifier address");

        token = _token;
        verifier = _verifier;
    }

    function verifyProof(bytes memory proof, uint256[2] memory publicInputs) public view returns (bool) {
        (bool success, bytes memory data) = verifier.staticcall(
            abi.encodeWithSignature("verify(bytes,uint256[2])", proof, publicInputs)
        );
        return success && (data.length == 32 ? abi.decode(data, (bool)) : false);
    }

    function transferWithProof(address receiver, uint256 amount, bytes memory proof, uint256[2] memory publicInputs) public {
        require(receiver != address(0), "Invalid receiver address");
        require(amount > 0, "Amount must be greater than zero");
        require(verifyProof(proof, publicInputs), "Invalid ZKP Proof");

        IERC20 tokenContract = IERC20(token);
        require(tokenContract.allowance(msg.sender, address(this)) >= amount, "Insufficient allowance");

        tokenContract.transferFrom(msg.sender, receiver, amount);

        emit Payment(msg.sender, receiver, amount);
    }
}
