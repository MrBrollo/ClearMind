import { useState, useEffect, useRef } from "react";

export default function useMeditationTimer(initialMinutes = 5) {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    const intervalRef = useRef(null);

    // Avvia il timer
    const start = () => {
        if (isRunning) return;
        if (!hasStarted) setHasStarted(true);
        setIsRunning(true);
    };

    // Metti in pausa il timer
    const pause = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
    };

    // Reset completo
    const reset = () => {
        clearInterval(intervalRef.current);
        setSecondsLeft(minutes * 60);
        setIsRunning(false);
        setHasStarted(false);
    };

    // Gestione countdown
    useEffect(() => {
        if (isRunning && secondsLeft > 0) {
            intervalRef.current = setInterval(() => {
                setSecondsLeft((prev) => prev - 1);
            }, 1000);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    // Se il timer non è in esecuzione, aggiorna il tempo SOLO quando cambia minutes
    useEffect(() => {
        if (!isRunning && !hasStarted) {
            setSecondsLeft(minutes * 60);
        }
    }, [minutes, isRunning, hasStarted]);

    const formatTime = () => {
        const m = Math.floor(secondsLeft / 60);
        const s = secondsLeft % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    return {
        minutes,
        setMinutes,
        isRunning,
        hasStarted,
        start,
        pause,
        reset,
        formatTime,
        secondsLeft,
    };
}