import useHook from "./hooks/useQueue";
import "./App.css";
import { concertData } from "./data/ticket";
import QueueList from "./components/QueueList";
import YourQueue from "./components/YourQueue";
import Submit from "./components/Submit";
import Header from "./components/Header";
import QueueCard from "./components/QueueCard";
import ProgressBar from "./components/ProgressBar";
import Ticket from "./components/Ticket";
import Summary from "./components/Summary";
import LandingPage from "./components/LandingPage";
import { TicketProvider } from "./context/TicketContext";

function App() {
  const {
    queue,
    target,
    started,
    reached,
    fetchTarget,
    leaveQueue,
    username,
    setUsername,
    handleFinish,
    landingPage,
    handleHome,
    loading,
    notifyReached,
  } = useHook();

  return (
    <div className="App">
      <Header target={target} username={username} />
      {reached && <h3 style={{ color: "white" }}>🎉 ถึงคิวของคุณแล้ว!</h3>}
      {target === null &&
        (!started ? (
          <>
            <p>The server may be asleep due to inactivity.</p>
            <p>If loading takes too long, please try again.</p>
          </>
        ) : (
          <p>
            It may take a moment to load. Please wait or try submitting again.
          </p>
        ))}
      {started ? (
        queue[9] > target + 9 && !reached ? (
          <div>
            <p>Server error. Click the button to try again.</p>
            <button onClick={() => notifyReached()}>To Ticket Page</button>
          </div>
        ) : (
          <>
            <YourQueue target={target} />
            <ProgressBar started={started} />
            <QueueList>
              {Array.isArray(queue) &&
                queue.map((person) => (
                  <QueueCard
                    key={person}
                    person={person}
                    target={target}
                    leaveQueue={leaveQueue}
                    className="queue-card"
                  />
                ))}
            </QueueList>
          </>
        )
      ) : (
        <>
          {!reached && !landingPage && (
            <Submit
              fetchTarget={fetchTarget}
              setUsername={setUsername}
              loading={loading}
            />
          )}
        </>
      )}
      {reached && (
        <div className="center-horizontal">
          <TicketProvider>
            <QueueList>
              {Array.isArray(concertData) &&
                concertData.map((ticketitem) => (
                  <Ticket
                    key={ticketitem.id}
                    ticketitem={ticketitem}
                    className="ticket-card"
                  />
                ))}
            </QueueList>
            <Summary />
          </TicketProvider>
          <button onClick={handleFinish}>Buy</button>
        </div>
      )}
      {landingPage && <LandingPage username={username} onFinish={handleHome} />}
    </div>
  );
}

export default App;
