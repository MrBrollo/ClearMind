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
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsRunning(false);
        setSecondsLeft(minutes * 60);
    }, [minutes]);

    // Formatta mm:ss
    const formatTime = useCallback((seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }, []);

    // Gestione countdown - crea intervallo solo quando isRunning cambia
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setSecondsLeft((prev) => {
                    if (prev <= 1) {
                        // Quando arriva a zero, ferma il timer
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                        setIsRunning(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isRunning]);

    // Aggiorna secondsLeft quando minutes cambia (ma solo se il timer non è mai stato avviato)
    useEffect(() => {
        if (!isRunning && secondsLeft === minutes * 60) {
            setSecondsLeft(minutes * 60);
        }
    }, [minutes, isRunning, secondsLeft]);

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