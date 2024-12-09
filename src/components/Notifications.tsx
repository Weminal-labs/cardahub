// Notifications.tsx
interface Notification {
  id: number;
  message: string;
}

const Notifications= () => {
  const notifications: Notification[] = [
    { id: 1, message: "John liked your tweet." },
    { id: 2, message: "Jane retweeted your post." },
  ];

  return (
    <div className="notifications">
      <h3>Notifications</h3>
      <ul>
        {notifications.map((notif) => (
          <li key={notif.id}>{notif.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
