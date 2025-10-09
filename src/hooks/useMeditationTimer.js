import { useState, useRef, useEffect } from "react";

export default function useMeditationTimer(initialMinutes = 5) {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    const intervalRef = useRef(null);
    const audioRef = useRef(null);

    // Aggiorna automaticamente i secondi quando cambiano i minuti
    useEffect(() => {
        if (!hasStarted) {
            setSecondsLeft(minutes * 60);
        }
    }, [minutes, hasStarted]);

    // Formatta i minuti e secondi come mm:ss
    const formatTime = () => {
        const m = Math.floor(secondsLeft / 60);
        const s = secondsLeft % 60;
        return `${m.toString().padStart(2, "0")}:${s
            .toString()
            .padStart(2, "0")}`;
    };

    // Avvia il timer
    const start = () => {
        if (isRunning) return;
        if (!hasStarted) setHasStarted(true);
        setIsRunning(true);
    };

    // Metti in pausa
    const pause = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
    };

    // Reset del timer
    const reset = () => {
        clearInterval(intervalRef.current);
        setSecondsLeft(minutes * 60);
        setIsRunning(false);
        setHasStarted(false);
    };

    // Gestione logica del countdown
    useEffect(() => {
        if (isRunning && secondsLeft > 0) {
            intervalRef.current = setInterval(() => {
                setSecondsLeft((prev) => prev - 1);
            }, 1000);
        }

        if (isRunning && secondsLeft === 0) {
            pause();

            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.volume = 1.0;
                audioRef.current.play();

                setTimeout(() => {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                }, 5000); // riproduce solo i primi 5 secondi
            }
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning, secondsLeft]);

    return {
        minutes,
        setMinutes,
        secondsLeft,
        isRunning,
        hasStarted,
        start,
        pause,
        reset,
        formatTime,
        audioRef,
    };
}