import { usePomodoroStore } from "../store/pomodoroStore";

export const Cycles = () => {
  const totalCycles = usePomodoroStore((state) => state.config.totalCycles);
  const completedCycles = usePomodoroStore((state) => state.completedCycles);
  const mode = usePomodoroStore((state) => state.mode);
  const currentCompletedCycles =
    mode === "longBreak" ? totalCycles : completedCycles % totalCycles;
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalCycles }, (_, index) => {
        const isCompleted = index < currentCompletedCycles;
        return (
          <span
            key={index}
            className={`status ${isCompleted ? "status-success" : ""}`}
          ></span>
        );
      })}
    </div>
  );
};
