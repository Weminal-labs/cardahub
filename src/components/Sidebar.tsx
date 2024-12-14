// Sidebar.tsx
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 
                      bg-cyber-gradient from-cyber-bg-primary/90 to-cyber-bg-secondary/90 
                      border-r border-cyber-border 
                      backdrop-blur-sm">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/feed"
              className={`flex items-center p-3 rounded-lg transition-all duration-200
                         ${location.pathname === '/feed'
                  ? 'bg-cyber-accent-cyan/20 text-cyber-accent-cyan'
                  : 'hover:bg-cyber-bg-secondary/50'}`}
            >
              Feed
            </Link>
          </li>
          <li>
            <Link
              to="/nft-market"
              className={`flex items-center p-3 rounded-lg transition-all duration-200
                         ${location.pathname === '/nft-market'
                  ? 'bg-cyber-accent-cyan/20 text-cyber-accent-cyan'
                  : 'hover:bg-cyber-bg-secondary/50'}`}
            >
              NFT Market
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;