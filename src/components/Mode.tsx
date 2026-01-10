import { usePomodoroStore, type PomodoroMode } from "../store/pomodoroStore";

const MODE_CONFIG: Record<PomodoroMode, { color: string; text: string }> = {
  focus: {
    color: "badge-success",
    text: "FOCUS"
  },
  shortBreak: {
    color: "badge-warning",
    text: "SHORT BREAK"
  },
  longBreak: {
    color: "badge-warning",
    text: "LONG BREAK"
  }
};

export const Mode = () => {
  const mode = usePomodoroStore((state) => state.mode);
  const { color, text } = MODE_CONFIG[mode];
  return (
    <div
      className={`badge badge-soft text-xs font-bold tracking-widest ${color}`}
    >
      {text}
    </div>
  );
};
