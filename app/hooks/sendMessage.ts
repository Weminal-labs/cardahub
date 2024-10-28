import { useWriteContract } from 'wagmi'
import { abi } from './contractABI';

const contractAddress = '0x358A65994eB09386023b3B116916Ec1678b23EC2';

export function SendMessage() {
    const {
        data: hash, // gán data trả về vào biến tên là hash
        error, // gán error object vào biến error
        isPending, // gán isPending object vào biến isPending
        writeContract // khởi tạo writeContract function để sử dụng
    } = useWriteContract()


    async function send(recipient: `0x${string}`, content: string) {
        await writeContract({
            address: contractAddress,
            abi,
            functionName: 'sendMessage',
            args: [recipient, content],
        });
        if (isPending) {
            console.log('Sending message...');
        }
        if (error) {
            console.error('Error sending message:', error);
        }
        if (hash) {
            console.log('Message sent!', recipient, "   hash:", hash);
        }
    }

    return { send };
};
