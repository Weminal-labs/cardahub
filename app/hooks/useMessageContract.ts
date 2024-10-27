import { useWriteContract, useReadContract, useAccount } from 'wagmi';
import { contractABI } from './contractABI';

export const useMessageContract = () => {
    /* const provider = usePublicClient();
    const { data: signer } = useWalletClient(); */
    

    const { refetch: getMessages } = useReadContract({
        address: `0x924071a0e0d822e020b5405784f1aaaa1b9b4810715ef27cc3f6d0887dfd8f3a`,
        abi: contractABI,
        functionName: 'getMessages',
        args: [useAccount().address], // Default args, can be overridden
    });

    const { writeContract } = useWriteContract();

    const send = async (recipient: string, content: string) => {
        try {
            await writeContract({
                address: `0x924071a0e0d822e020b5405784f1aaaa1b9b4810715ef27cc3f6d0887dfd8f3a`,
                abi: contractABI,
                functionName: 'sendMessage',
                args: [recipient, content]   
            });
            console.log('Message sent!');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const fetchMessages = async () => {
        try {
            const { data } = await getMessages();
            return data;
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
        return [];
    };

    return { send, fetchMessages };
};
