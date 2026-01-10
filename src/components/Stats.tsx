import { usePomodoroStore } from "../store/pomodoroStore";
import { formatTime } from "../utils/time";

export const Stats = () => {
  const completedCycles = usePomodoroStore((state) => state.completedCycles);
  const focusTime = usePomodoroStore((state) => state.focusTime);
  const breakTime = usePomodoroStore((state) => state.breakTime);
  return (
    <div className="stats border border-base-200">
      <div className="stat place-items-center">
        <div className="stat-title">Completed cycles</div>
        <div className="stat-value">{completedCycles}</div>
      </div>
      <div className="stat place-items-center">
        <div className="stat-title">Focus time</div>
        <div className="stat-value">{formatTime(focusTime)}</div>
      </div>
      <div className="stat place-items-center">
        <div className="stat-title">Break time</div>
        <div className="stat-value">{formatTime(breakTime)}</div>
      </div>
    </div>
  );
};
