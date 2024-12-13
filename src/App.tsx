import Navbar from './components/Navbar'
import TransferAda from './components/cardano/TransferAda'
import { MintTokenValidator } from './components/cardano/MintTokenValidator'
import { MyNFTs } from './components/cardano/MyNFTs'

function App() {
  return (
    <div>
      <Navbar />
      <TransferAda />
      <MintTokenValidator />
      <MyNFTs />
    </div>
  )
}


export default App
