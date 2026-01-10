import { toast } from "sonner";
import { create } from "zustand";
import { playNotificationSound, unlockAudio } from "../utils/audio";
import { minToMs } from "../utils/time";

export type PomodoroMode = "focus" | "shortBreak" | "longBreak";

interface PomodoroConfig {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  totalCycles: number;
}

interface PomodoroState {
  mode: PomodoroMode;
  timeLeft: number;
  isRunning: boolean;
  completedCycles: number;
  focusTime: number;
  breakTime: number;
  config: PomodoroConfig;
}

interface PomodoroActions {
  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
  getCurrentDuration: () => number;
  tick: () => void;
  setConfig: (config: PomodoroConfig) => void;
  finalizePeriod: () => void;
}

type PomodoroStore = PomodoroState & PomodoroActions;

const defaultConfig: PomodoroConfig = {
  focusDuration: minToMs(25),
  shortBreakDuration: minToMs(5),
  longBreakDuration: minToMs(15),
  totalCycles: 4
};

export const usePomodoroStore = create<PomodoroStore>()((set, get) => ({
  mode: "focus",
  timeLeft: defaultConfig.focusDuration,
  isRunning: false,
  completedCycles: 0,
  focusTime: 0,
  breakTime: 0,
  config: defaultConfig,

  start: () => {
    unlockAudio();
    set({ isRunning: true });
  },
  pause: () => {
    unlockAudio();
    set({ isRunning: false });
  },
  reset: () => {
    unlockAudio();
    set((state) => ({
      mode: "focus",
      timeLeft: state.config.focusDuration,
      isRunning: false,
      completedCycles: 0,
      focusTime: 0,
      breakTime: 0
    }));
  },
  skip: () => {
    unlockAudio();
    get().finalizePeriod();
  },

  getCurrentDuration: () => {
    const state = get();
    switch (state.mode) {
      case "focus": {
        return state.config.focusDuration;
      }
      case "shortBreak": {
        return state.config.shortBreakDuration;
      }
      case "longBreak": {
        return state.config.longBreakDuration;
      }
    }
  },

  tick: () => {
    const state = get();
    if (state.timeLeft <= 0) {
      set({ timeLeft: 0 });
      state.finalizePeriod();
    } else {
      if (state.mode === "focus") {
        set({
          timeLeft: state.timeLeft - 1000,
          focusTime: state.focusTime + 1000
        });
      } else {
        set({
          timeLeft: state.timeLeft - 1000,
          breakTime: state.breakTime + 1000
        });
      }
    }
  },

  finalizePeriod: () => {
    const state = get();
    if (state.mode !== "focus") {
      set({
        mode: "focus",
        timeLeft: state.config.focusDuration
      });
      state.pause();
      playNotificationSound();
      toast("Your break is over, time to get back on track.", {
        duration: 10000
      });
      return;
    }
    const newCompletedCycles = state.completedCycles + 1;
    const isLongBreakDue = newCompletedCycles % state.config.totalCycles === 0;
    set({
      completedCycles: newCompletedCycles,
      mode: isLongBreakDue ? "longBreak" : "shortBreak",
      timeLeft: isLongBreakDue
        ? state.config.longBreakDuration
        : state.config.shortBreakDuration
    });
    state.pause();
    playNotificationSound();
    toast("Good job, you've completed a focus cycle.", { duration: 10000 });
  },

  setConfig: (config: PomodoroConfig) => {
    set((state) => {
      let newTimeLeft = state.timeLeft;
      if (state.mode === "focus") {
        newTimeLeft = config.focusDuration;
      } else if (state.mode === "shortBreak") {
        newTimeLeft = config.shortBreakDuration;
      } else if (state.mode === "longBreak") {
        newTimeLeft = config.longBreakDuration;
      }
      return {
        config,
        timeLeft: newTimeLeft
      };
    });
  }
}));
