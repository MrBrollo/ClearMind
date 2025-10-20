import React, { useEffect, useCallback } from "react";
import useTimer from "../hooks/useTimer";
import useAudio from "../hooks/useAudio";
import TimerInput from "./TimerInput";
import TimerControls from "./TimerControls";
import bellSound from "../assets/sounds/meditationBell.mp3";

export default function MeditationTimer() {
    const {
        minutes,
        setMinutes,
        secondsLeft,
        setSecondsLeft,
        isRunning,
        start,
        pause,
        reset,
        formatTime,
    } = useTimer(5);

    const { play } = useAudio(bellSound, 5000);

    // Suona la campana quando il timer raggiunge zero
    useEffect(() => {
        if (secondsLeft === 0 && !isRunning) {
            play();
        }
    }, [secondsLeft, isRunning, play]);

    // Gestisce il cambio dei minuti con validazione
    // Aggiorna solo se il timer non è mai stato avviato o è stato resettato
    const handleMinutesChange = useCallback((newMinutes) => {
        setMinutes(newMinutes);
        // Aggiorna secondsLeft solo se corrisponde esattamente ai minuti attuali
        if (!isRunning && secondsLeft === minutes * 60) {
            setSecondsLeft(newMinutes * 60);
        }
    }, [isRunning, minutes, secondsLeft, setMinutes, setSecondsLeft]);

    return (
        <section id="timer">
            <div className="flex flex-col items-center text-center mt-10 space-y-4">
                <h2 className="text-2xl font-semibold text-emerald-700">
                    Timer di Meditazione
                </h2>

                <div className="flex flex-col items-center space-y-4">
                    <div className="text-5xl font-bold text-emerald-800">
                        {formatTime(secondsLeft)}
                    </div>

                    <TimerInput
                        minutes={minutes}
                        onMinutesChange={handleMinutesChange}
                        disabled={isRunning}
                    />

                    <TimerControls
                        secondsLeft={secondsLeft}
                        isRunning={isRunning}
                        onStart={start}
                        onPause={pause}
                        onReset={reset}
                    />
                </div>
            </div>
        </section>
    );
}