import { usePomodoroStore } from "../store/pomodoroStore";
import {
  RiResetLeftLine,
  RiPlayFill,
  RiPauseFill,
  RiSkipForwardFill
} from "react-icons/ri";

export const Controls = () => {
  const start = usePomodoroStore((state) => state.start);
  const pause = usePomodoroStore((state) => state.pause);
  const reset = usePomodoroStore((state) => state.reset);
  const skip = usePomodoroStore((state) => state.skip);
  const isRunning = usePomodoroStore((state) => state.isRunning);
  const iconSize = 50;
  return (
    <div className="flex gap-16">
      <button onClick={reset} aria-label="Reset timer">
        <RiResetLeftLine size={iconSize} />
      </button>
      <button
        onClick={isRunning ? pause : start}
        aria-label={isRunning ? "Pause timer" : "Start timer"}
      >
        {isRunning ? (
          <RiPauseFill size={iconSize} className="scale-[140%]" />
        ) : (
          <RiPlayFill size={iconSize} className="scale-[130%]" />
        )}
      </button>
      <button onClick={skip} aria-label="Skip to next period">
        <RiSkipForwardFill size={iconSize} className="scale-125" />
      </button>
    </div>
  );
};
