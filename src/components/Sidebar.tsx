// Sidebar.tsx
const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/notifications">Notifications</a></li>
          <li><a href="/messages">Messages</a></li>
          <li><a href="/profile">Profile</a></li>
        </ul>
      </nav>
      <div className="followed">
        <h3>Who to Follow</h3>
        <ul>
          <li><a href="/profile/john_doe">John Doe</a></li>
          <li><a href="/profile/jane_doe">Jane Doe</a></li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
