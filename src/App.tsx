import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useEffect } from 'react'
import { Blockfrost, Lucid } from 'lucid-cardano'

function App() {
  useEffect(() => {
    async function initLucid() {
      const lucid = await Lucid.new(
        new Blockfrost('https://cardano-preview.blockfrost.io/api/v0/metadata/txs/labels', 'previewrODzYCwJBCR6dBtGFGdfPbBYAkN0XgLT'),
        'Preview'
      )
      console.log(lucid)
    }
    initLucid()
  }, [])
  return (
    <>
      <Navbar />
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
