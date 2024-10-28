// import BaseError và hook useReadContract
import { useAccount, useReadContract } from 'wagmi'
// import file abi của smart contract vào để có interface của function
import { abi } from './contractABI'
// import { zeroAddress } from 'viem'

const contractAddress = '0x358A65994eB09386023b3B116916Ec1678b23EC2';

/* interface Message {
    sender: `0x${string}`[];
    content: string[];
    timestamp: number[];
} */

export const GetReceivedMessage = () => {
    const { address } = useAccount();
    const {
        data,  // thay vì messages
        error,
        isPending
    } = useReadContract({
        address: contractAddress,
        abi,
        functionName: 'getMessages',
        args: [address || '0x0000000000000000000000000000000000000000'],
    })
    console.log("error:", error); // Thêm dòng này để xem có lỗi gì không
    console.log("isPending:", isPending);
    console.log("func1 address:", address, "contract: ", contractAddress, "data:", data);
    return { data, error, isPending };  // trả về data thay vì messages
}

/* export function useGetReceivedMessages(address: `0x${string}` | undefined) {
    const {
        data,
        error,
        isPending
    } = useReadContract({
        address: contractAddress,
        abi: [{
            inputs: [{ name: 'recipient', type: 'address' }],
            name: 'getMessages',
            outputs: [
                { name: 'senders', type: 'address[]' },
                { name: 'contents', type: 'string[]' },
                { name: 'timestamps', type: 'uint256[]' }
            ],
            stateMutability: 'view',
            type: 'function',
        }] as const,
        functionName: 'getMessages',
        args: [address ?? zeroAddress],
        // Thêm các options sau
        account: address,
        enabled: !!address,
    });

    console.log("error:", error);
    console.log("func2 data:", data);
    console.log("isPending:", isPending);

    return { data, error, isPending };
} */
