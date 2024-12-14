import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import { NFTMarket } from './components/NFTMarket/NFTMarket';
import Navbar from './components/Navbar';
import UserProfileComponent from './components/Profile';

function App() {
  return (
    <div className="min-h-screen bg-cyber-bg-primary text-cyber-text-primary">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-6">
          <Routes>
            <Route path="/profile" element={<UserProfileComponent />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/nft-market" element={<NFTMarket />} />
            <Route path="/" element={<Feed />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
