import { useState } from "react";
import { useInterval } from "./useInterval";

type Mode = "focus" | "shortBreak" | "longBreak";

export function usePomodoro(
  focusDuration: number,
  shortBreakDuration: number,
  longBreakDuration: number,
  totalCycles: number
) {
  const [mode, setMode] = useState<Mode>("focus");
  const [timeLeft, setTimeLeft] = useState(focusDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);

  function start() {
    setIsRunning(true);
  }
  function pause() {
    setIsRunning(false);
  }
  function reset() {
    setMode("focus");
    setTimeLeft(focusDuration);
    setIsRunning(false);
    setCompletedCycles(0);
  }

  function finalizePeriod() {
    if (mode !== "focus") {
      setMode("focus");
      setTimeLeft(focusDuration);
      return;
    }
    const newCompletedCycles = completedCycles + 1;
    setCompletedCycles(newCompletedCycles);
    const shouldTakeLongBreak = newCompletedCycles % totalCycles === 0;
    const nextMode = shouldTakeLongBreak ? "longBreak" : "shortBreak";
    const nextTimeLeft = shouldTakeLongBreak
      ? longBreakDuration
      : shortBreakDuration;
    setMode(nextMode);
    setTimeLeft(nextTimeLeft);
  }

  useInterval(
    () => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0) {
          finalizePeriod();
          return 0;
        }
        return prevTimeLeft - 1000;
      });
    },
    isRunning ? 1000 : null
  );

  return {
    state: {
      mode,
      timeLeft,
      isRunning,
      completedCycles
    },
    actions: {
      start,
      pause,
      reset
    }
  };
}
