import Navbar from './components/Navbar'
import TransferAda from './components/cardano/TransferAda'
import { Mint } from './components/cardano/Mint'
import { MyNFTs } from './components/cardano/MyNFTs'

function App() {
  return (
    <>
      <Navbar />
      <TransferAda />
      <Mint />
      <MyNFTs />
    </>
  )
}


export default App
