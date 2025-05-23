import "../App.css";

export default function Header({ target, username }) {
  return (
    <header>
      <h1>Queue App</h1>
      <p>Welcome: {target ? username : "guest"}</p>
    </header>
  );
}
