let audio: HTMLAudioElement | null = null;
let isAudioUnlocked = false;
let unlockPromise: Promise<void> | null = null;

const getAudio = (): HTMLAudioElement => {
  if (!audio) {
    audio = new Audio("/sounds/notification.mp3");
    audio.preload = "auto";
  }
  return audio;
};

const attemptPlay = async (shouldPause = false): Promise<void> => {
  const audioElement = getAudio();
  audioElement.currentTime = 0;
  try {
    await audioElement.play();
    if (shouldPause) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
    isAudioUnlocked = true;
  } catch (e) {
    console.warn(e);
  }
};

export function unlockAudio(): Promise<void> {
  if (isAudioUnlocked) {
    return Promise.resolve();
  }
  if (unlockPromise) {
    return unlockPromise;
  }
  unlockPromise = attemptPlay(true).finally(() => {
    unlockPromise = null;
  });
  return unlockPromise;
}

export async function playNotificationSound(): Promise<void> {
  if (!isAudioUnlocked) {
    await unlockAudio();
  }
  await attemptPlay();
}
