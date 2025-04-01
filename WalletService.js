import { ethers } from 'ethers';

// Simple ERC20 ABI for token transfers
const TOKEN_ABI = [
  "function transfer(address to, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

export class WalletService {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.SENDER_ADDRESS = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
    this.RECEIVER_ADDRESS = "0x6bc1e883503c54d26b999471A5c1e94a177A977A";
    this.TOKEN_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
  }

  async initializeProvider() {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please unlock MetaMask');
      }

      // Initialize provider and signer
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.signer = this.provider.getSigner();

      // Verify connected account
      const address = await this.signer.getAddress();
      console.log('Connected address:', address);
      console.log('Expected address:', this.SENDER_ADDRESS);

      if (address.toLowerCase() !== this.SENDER_ADDRESS.toLowerCase()) {
        throw new Error(`Please connect with the correct wallet address. Connected: ${address}`);
      }

      // Verify network
      const network = await this.provider.getNetwork();
      console.log('Connected to network:', network.name);

      return address;
    } catch (error) {
      console.error('Initialization error:', error);
      throw new Error(`Failed to initialize provider: ${error.message}`);
    }
  }

  async getBalance(address) {
    try {
      const tokenContract = new ethers.Contract(
        this.TOKEN_ADDRESS,
        TOKEN_ABI,
        this.provider
      );
      const decimals = await tokenContract.decimals();
      const balance = await tokenContract.balanceOf(address);
      return ethers.utils.formatUnits(balance, decimals);
    } catch (error) {
      throw new Error('Failed to get balance: ' + error.message);
    }
  }

  async sendTransaction(amount) {
    try {
      // Ensure provider is initialized
      if (!this.provider || !this.signer) {
        await this.initializeProvider();
      }

      console.log('Creating contract instance...');
      const tokenContract = new ethers.Contract(
        this.TOKEN_ADDRESS,
        TOKEN_ABI,
        this.signer
      );
      
      console.log('Getting token decimals...');
      const decimals = await tokenContract.decimals();
      console.log('Token decimals:', decimals);

      console.log('Getting token symbol...');
      const symbol = await tokenContract.symbol();
      console.log('Token symbol:', symbol);
      
      console.log('Converting amount to token units...');
      const tokenAmount = ethers.utils.parseUnits(amount.toString(), decimals);
      console.log('Token amount:', tokenAmount.toString());

      // Check balance before transfer
      const balance = await tokenContract.balanceOf(this.SENDER_ADDRESS);
      console.log('Current balance:', ethers.utils.formatUnits(balance, decimals));

      if (balance.lt(tokenAmount)) {
        throw new Error('Insufficient token balance');
      }
      
      console.log('Sending transaction...');
      const tx = await tokenContract.transfer(this.RECEIVER_ADDRESS, tokenAmount, {
        gasLimit: 100000
      });
      
      console.log('Transaction sent:', tx.hash);
      console.log('Waiting for confirmation...');
      
      const receipt = await tx.wait();
      console.log('Transaction confirmed:', receipt);
      
      return receipt;
    } catch (error) {
      console.error('Detailed transaction error:', {
        message: error.message,
        code: error.code,
        data: error.data,
        stack: error.stack
      });

      if (error.message.includes('user rejected')) {
        throw new Error('Transaction was rejected by user');
      } else if (error.message.includes('insufficient funds')) {
        throw new Error('Insufficient funds for gas');
      } else if (error.message.includes('nonce')) {
        throw new Error('Transaction nonce error. Please reset your MetaMask account');
      } else {
        throw new Error(`Transaction failed: ${error.message}`);
      }
    }
  }
}

export const walletService = new WalletService(); 