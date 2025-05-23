🎟️ Concert Ticket Queue App

A simulated ticket queue SPA built with React to mimic the real-life experience of purchasing concert tickets.

Features
	•	Simulates a full user journey: joining a queue, waiting, and reaching the front of the line.
	•	Built entirely with React using a component-based structure and local state.
	•	Communicates with a mock backend server hosted on Glitch using fetch().
	•	Implements asynchronous logic:
	•	The backend updates queue status every 12 seconds.
	•	The frontend fetches the queue status every 10 seconds to simulate real-world delay and race conditions.
	•	Uses useEffect for managing intervals and conditional UI updates.
	•	Provides a form-based interaction and responsive feedback to simulate real ticket booking pressure.

Note: The backend server was not developed by me. It was used as part of this project to simulate a realistic full-stack experience and test frontend behavior under asynchronous conditions.
