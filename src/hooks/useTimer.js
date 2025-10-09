import { useState, useEffect, useRef } from "react";

/**
 @param {number} initialTimeInSeconds - tempo iniziale in secondi
 @param {function} onComplete - callback opzionale al termine del timer
*/
export default function useTimer(initialTimeInSeconds = 0, onComplete = null) {
    const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    // Avvia il timer
    const start = () => {
        if (isRunning || timeLeft <= 0) return;
        setIsRunning(true);
    };

    // Metti in pausa
    const pause = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
    };

    // Resetta il timer
    const reset = (newTime = initialTimeInSeconds) => {
        clearInterval(intervalRef.current);
        setTimeLeft(newTime);
        setIsRunning(false);
    };

    // Effetto principale
    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (isRunning && timeLeft === 0) {
            setIsRunning(false);
            if (onComplete) onComplete();
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning, timeLeft, onComplete]);

    return {
        timeLeft,
        setTimeLeft,
        isRunning,
        start,
        pause,
        reset,
    };
}