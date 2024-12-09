import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
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
