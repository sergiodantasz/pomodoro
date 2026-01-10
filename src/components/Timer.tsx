import { usePomodoroStore } from "../store/pomodoroStore";
import { formatTime } from "../utils/time";

export const Timer = () => {
  const timeLeft = usePomodoroStore((state) => state.timeLeft);
  return (
    <h1 className="text-9xl font-light" role="timer" aria-live="polite">
      {formatTime(timeLeft)}
    </h1>
  );
};
