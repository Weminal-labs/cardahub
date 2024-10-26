import React, { useState, useRef, useEffect } from 'react';
import '../styles/Sidebar.css';

interface SidebarProps {
  isActive: boolean;
  filterText: string;
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isActive, filterText, onFilterChange }) => {
  const [width, setWidth] = useState(300);
  const [isResizing, setIsResizing] = useState(false);
  
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Hàm bắt đầu kéo
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  // Hàm xử lý khi đang kéo
  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing && sidebarRef.current) {
      const newWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left;
      // Giới hạn chiều rộng
      if (newWidth > 150 && newWidth < window.innerWidth - 150) {
        setWidth(newWidth); // Cập nhật chiều rộng
      }
    }
  };

  // Hàm dừng kéo
  const handleMouseUp = () => {
    setIsResizing(false); // Kết thúc quá trình kéo
  };

  const matchUsers = ['User A', 'User B', 'User C', 'User D'];

  // Thêm sự kiện mousemove và mouseup
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove); // Đăng ký sự kiện mousemove
      document.addEventListener('mouseup', handleMouseUp); // Đăng ký sự kiện mouseup
    }

    // Dọn dẹp sự kiện khi không còn đang kéo
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]); // Chạy khi isResizing thay đổi

  return (
    <div
      ref={sidebarRef}
      className={`left-side bg-gray-200 p-4 overflow-y-auto transition-width duration-200 ${isActive ? 'active' : ''}`}
      style={{ width }}
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
      <div
        className="resizer w-2 bg-gray-400 cursor-col-resize"
        onMouseDown={handleMouseDown}
        style={{ position: 'absolute', top: 0, right: 0, bottom: 0 }}
      />
    </div>
  );
};

export default Sidebar;
