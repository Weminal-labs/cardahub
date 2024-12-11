import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useLucid } from './context/LucidProvider'
import { useEffect } from 'react'

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
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Thêm các routes khác ở đây */}
      </Routes>
    </>
  )
}

// Tạm thời tạo component Home đơn giản
const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1>Vite + React</h1>
    </div>
  )
}

export default App
