// Sidebar.tsx
const Sidebar = () => {
  return (
    <aside className="fixed left-0 h-screen w-64 bg-gray-800 text-white p-4">
      <nav>
        <ul className="space-y-4">
          <li>
            <a
              href="/feed"
              className="flex items-center p-2 hover:bg-gray-700 rounded-lg"
            >
              <span className="material-icons mr-2">rss_feed</span>
              Feed
            </a>
          </li>
          <li>
            <a
              href="/nft-market"
              className="flex items-center p-2 hover:bg-gray-700 rounded-lg"
            >
              <span className="material-icons mr-2">store</span>
              NFT Market
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;