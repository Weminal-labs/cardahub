import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useLucid } from './context/LucidProvider'
import { useEffect } from 'react'
import TransferAda from './components/cardano/TransferAda'

function App() {
  const { lucid, address, getUTxOs } = useLucid()
  console.log(lucid)

  useEffect(() => {
    async function tmp() {
      const utxos = await getUTxOs()
      console.log("utxos", utxos)
    }
    tmp()
  }, [address, getUTxOs])

  return (
    <>
      <Navbar />
      <p>{address}</p>
      <TransferAda />
    </>
  )
}


export default App
