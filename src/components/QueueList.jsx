import "../App.css";

export default function QueueList({ children }) {
  return (
    <div>
      <ul className="queue-list">{children}</ul>
    </div>
  );
}
