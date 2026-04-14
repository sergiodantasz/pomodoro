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
  return (
    <div className="flex gap-12 xs:gap-16">
      <button onClick={reset} aria-label="Reset timer">
        <RiResetLeftLine className="size-10 xs:size-12" />
      </button>
      <button
        onClick={isRunning ? pause : start}
        aria-label={isRunning ? "Pause timer" : "Start timer"}
      >
        {isRunning ? (
          <RiPauseFill className="size-10 scale-[140%] xs:size-12" />
        ) : (
          <RiPlayFill className="size-10 scale-[130%] xs:size-12" />
        )}
      </button>
      <button onClick={skip} aria-label="Skip to next period">
        <RiSkipForwardFill className="size-10 scale-125 xs:size-12" />
      </button>
    </div>
  );
};
