export default function QueueCard({ target, person, leaveQueue, className }) {
  return (
    <li className={className}>
      <h2>{person}</h2>
      {person === target && <button onClick={leaveQueue}>Leave Queue</button>}
    </li>
  );
}
