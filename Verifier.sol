
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Verifier {
    using ECDSA for bytes32;

    function verify(bytes32 hash, bytes memory signature, address signer) public pure returns (bool) {
        bytes32 ethSignedHash = hash.toEthSignedMessageHash(); 
        address recoveredSigner = ECDSA.recover(ethSignedHash, signature);
        return recoveredSigner == signer;
    }
}
