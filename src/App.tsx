import { usePomodoro } from "./hooks/usePomodoro";
import { formatTime, minToMs } from "./utils/time";

export default function App() {
  const {
    state: { mode, timeLeft, completedCycles },
    actions: { start, pause, reset, skip }
    // } = usePomodoro(minToMs(25), minToMs(5), minToMs(15), 4);
  } = usePomodoro(2000, 2000, 2000, 4); // just for testing purposes
  return (
    <>
      <h1>Mode: {mode}</h1>
      <h2>Completed cycles: {completedCycles}</h2>
      <div>{formatTime(timeLeft)}</div>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
      <button onClick={skip}>Skip</button>
    </>
  );
}
