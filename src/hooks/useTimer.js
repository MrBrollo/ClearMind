import { useState, useEffect, useRef, useCallback } from "react";

export default function useTimer(initialMinutes = 5) {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    // Avvia il timer
    const start = useCallback(() => {
        if (!isRunning && secondsLeft > 0) {
            setIsRunning(true);
        }
    }, [isRunning, secondsLeft]);

    // Metti in pausa
    const pause = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsRunning(false);
    }, []);

    // Reset del timer
    const reset = useCallback(() => {
        pause();
        setSecondsLeft(minutes * 60);
    }, [minutes, pause]);

    // Gestione countdown
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
        }

        return () => {
            if (intervalRef.current)
                clearInterval(intervalRef.current);
            intervalRef.current = null;
        };
    }, [isRunning]);

    useEffect(() => {
        if (!isRunning) {
            setSecondsLeft(minutes * 60);
        }
    }, [minutes, isRunning]);

    // Formatta mm:ss
    const formatTime = useCallback(() => {
        const m = Math.floor(secondsLeft / 60);
        const s = secondsLeft % 60;
        return `${m.toString().padStart(2, "0")}:${s
            .toString()
            .padStart(2, "0")}`;
    }, [secondsLeft]);

    return {
        minutes,
        setMinutes,
        secondsLeft,
        setSecondsLeft,
        isRunning,
        start,
        pause,
        reset,
        formatTime,
    };
}