import { useEffect } from "react";
import { Layout } from "./components/Layout";
import { Timer } from "./components/Timer";
import { usePomodoroStore } from "./store/pomodoroStore";
import { useInterval } from "./hooks/useInterval";
import { minToMs } from "./utils/time";
import { Controls } from "./components/Controls";
import { ProgressBar } from "./components/ProgressBar";
import { Mode } from "./components/Mode";
import { Cycles } from "./components/Cycles";
import { Stats } from "./components/Stats";
import { AboutDrawer } from "./components/AboutDrawer";

export default function App() {
  const isRunning = usePomodoroStore((state) => state.isRunning);
  const timeLeft = usePomodoroStore((state) => state.timeLeft);
  const tick = usePomodoroStore((state) => state.tick);
  const setConfig = usePomodoroStore((state) => state.setConfig);
  const getCurrentDuration = usePomodoroStore(
    (state) => state.getCurrentDuration
  );

  useEffect(() => {
    setConfig({
      focusDuration: minToMs(25),
      shortBreakDuration: minToMs(5),
      longBreakDuration: minToMs(15),
      totalCycles: 4
    });
  }, [setConfig]);

  useInterval(tick, isRunning ? 1000 : null);

  return (
    <Layout>
      <AboutDrawer />
      <div className="flex flex-col items-center gap-4">
        <Mode />
        <Timer />
        <ProgressBar value={timeLeft} max={getCurrentDuration()} />
      </div>
      <Controls />
      <Cycles />
      <Stats />
    </Layout>
  );
}
