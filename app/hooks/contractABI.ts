export const abi = [
    {
        "name": "sendMessage",
        "type": "function",
        "stateMutability": "nonpayable",
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
        "outputs": []
    },
    {
        "name": "getMessages",
        "type": "function",
        "stateMutability": "view",
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            }
        ],
        "outputs": [
            {
                "internalType": "address[]",
                "name": "senders",
                "type": "address[]"
            },
            {
                "internalType": "string[]",
                "name": "contents",
                "type": "string[]"
            },
            {
                "internalType": "uint256[]",
                "name": "timestamps",
                "type": "uint256[]"
            }
        ]
    },
    {
        "name": "getSentMessages",
        "type": "function",
        "stateMutability": "view",
        "inputs": [],
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
        ]
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "content",
                "type": "string"
            }
        ],
        "name": "MessageSent",
        "type": "event"
    }
] as const;
