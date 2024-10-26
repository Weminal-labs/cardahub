import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contractABI = [
  // ABI of the contract
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "content",
        "type": "string"
      }
    ],
    "name": "sendMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "getMessages",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "content",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct MessageContract.Message[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export const useMessageContract = () => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(web3Provider);

        const messageContract = new ethers.Contract(contractAddress, contractABI, await web3Provider.getSigner());
        setContract(messageContract);
      } else {
        console.error('Please install MetaMask!');
      }
    };

    init();
  }, []);

  const sendMessage = async (recipient: string, content: string) => {
    if (contract) {
      try {
        const tx = await contract.sendMessage(recipient, content);
        await tx.wait();
        console.log('Message sent!');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const getMessages = async (recipient: string) => {
    if (contract) {
      try {
        const messages = await contract.getMessages(recipient);
        return messages;
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
    return [];
  };

  return { sendMessage, getMessages };
};
