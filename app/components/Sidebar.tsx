import React from 'react';

interface SidebarProps {
  isActive: boolean;
  filterText: string;
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isActive, filterText, onFilterChange }) => {
  const matchUsers = ['User A', 'User B', 'User C', 'User D'];

  return (
    <div
      className={`left-side bg-gray-200 p-4 overflow-y-auto transition-width duration-200 ${isActive ? 'active' : ''}`}
      style={{ width: 250 }}
    >
      <h2 className="text-gray-700 mb-2">Matched Users</h2>
      <input
        type="text"
        className="search-input w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Search user..."
        value={filterText}
        onChange={onFilterChange}
      />
      {matchUsers.filter(user => user.toLowerCase().includes(filterText)).map(user => (
        <div key={user} className="match-user bg-gray-300 p-2 mb-2 rounded">{user}</div>
      ))}
    </div>
  );
};

export default Sidebar;
