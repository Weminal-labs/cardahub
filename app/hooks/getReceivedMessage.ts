// import BaseError và hook useReadContract
import { type BaseError, useAccount, useReadContract } from 'wagmi'
// import file abi của smart contract vào để có interface của function
import { abi } from './contractABI'

const contractAddress = '0x358A65994eB09386023b3B116916Ec1678b23EC2';

export const GetReceivedMessage = () => {
    const { address } = useAccount();
    const {
        data: messages, // gán dữ liệu trả về vào biến balance
        error, // khởi tạo biến error
        isPending // khởi tạo biến isPending
    } = useReadContract({
        address: contractAddress,
        abi, // abi của function
        functionName: 'getMessages', // function name muốn gọi
        args: [address || '0x0000000000000000000000000000000000000000'], // truyền biến vào cho function
    })
    console.log("messages", messages);
    // Nếu isPending là true thì hiển thị chữ "Loading ...", nếu không thì biến mất
    if (isPending) return 'Loading...';
    if (error) return `Error: ${(error as unknown as BaseError).shortMessage || error.message} `;
    return messages;
}