import Navbar from './components/Navbar'
import TransferAda from './components/NFTMarket/TransferAda'
import { MintTokenValidator } from './components/NFTMarket/MintTokenValidator'
import { MyNFTs } from './components/NFTMarket/MyNFTs'
import { SellNFT } from './components/NFTMarket/SellNFT'
import { NFTMarket } from './components/NFTMarket/NFTMarket'

function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-cyber-bg-primary">
      <div className="fixed inset-0 bg-cyber-gradient from-cyber-bg-primary to-cyber-bg-secondary -z-10" />
      <Navbar />
      <div className="mx-auto w-4/5">
        <TransferAda />
        <MintTokenValidator />
        <MyNFTs />
        <SellNFT />
        <NFTMarket />
      </div>
    </div>
  )
}

export default App
