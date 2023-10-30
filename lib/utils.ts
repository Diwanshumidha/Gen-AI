import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const simulateProgress = (targetProgress: number, setProgress: React.Dispatch<React.SetStateAction<number>>) => {
  const interval = 300; // Adjust this value to control the speed of progress increase
  const increment = 1;
  let currentProgress = 10;

  const intervalId = setInterval(() => {
    currentProgress += increment;
    setProgress(currentProgress); // Update your UI with the current progress

    if (currentProgress >= targetProgress) {
      clearInterval(intervalId); // Cancel the interval when target progress is reached
    }
  }, interval);

  return intervalId; // Return the interval ID
};


