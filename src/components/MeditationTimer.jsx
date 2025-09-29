import React, { useState, useEffect, useRef } from "react";
import bellSound from "../assets/sounds/meditationBell.mp3";

export default function MeditationTimer() {
    const [minutes, setMinutes] = useState(5); // durata iniziale
    const [secondsLeft, setSecondsLeft] = useState(5 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    const intervalRef = useRef(null);
    const audioRef = useRef(null);

    // Funzione per formattare minuti/secondi
    const formatTime = () => {
        const m = Math.floor(secondsLeft / 60);
        const s = secondsLeft % 60;
        return `${m.toString().padStart(2, "0")}:${s
            .toString()
            .padStart(2, "0")}`;
    };

    // Avvia timer
    const startTimer = () => {
        if (isRunning) return;
        if (!hasStarted) setHasStarted(true);
        setIsRunning(true);
    };

    const pauseTimer = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
    };

    const resetTimer = () => {
        clearInterval(intervalRef.current);
        setSecondsLeft(minutes * 60);
        setIsRunning(false);
        setHasStarted(false);
    };

    useEffect(() => {
        if (isRunning && secondsLeft > 0) {
            intervalRef.current = setInterval(() => {
                setSecondsLeft((prev) => prev - 1);
            }, 1000);
        }

        if (isRunning && secondsLeft === 0) {
            pauseTimer();
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.volume = 1.0;
                audioRef.current.play();
            }

            setTimeout(() => {
                audioRef.current.pause();
                audioRef.current.currentTime = 0; //reset dell'audio
            }, 5000); //suona per 5 secondi
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning, secondsLeft]);

    return (
        <div
            id="timer"
            className="mt-12 flex flex-col items-center justify-center bg-[#e6f2ed] p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Timer di Meditazione
            </h2>

            {/* Input minuti */}
            {!hasStarted && (
                <div className="flex items-center gap-2 mb-4 ">
                    <label className="text-gray-600">Durata (minuti):</label>
                    <input
                        type="number"
                        min="1"
                        max="120"
                        value={minutes}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            setMinutes(val);
                            setSecondsLeft(val * 60);
                        }}
                        className="w-20 p-2 border rounded-md text-center bg-gray-50"
                    />
                </div>
            )}

            {/* Timer */}
            <div className="text-4xl font-mono text-gray-700 mb-4">
                {formatTime()}
            </div>

            {/* Pulsanti */}
            <div className="flex gap-4">
                {!isRunning ? (
                    <button
                        onClick={startTimer}
                        className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
                    >
                        {hasStarted ? "Riprendi" : "Start"}
                    </button>
                ) : (
                    <button
                        onClick={pauseTimer}
                        className="px-6 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
                    >
                        Pausa
                    </button>
                )}

                <button
                    onClick={resetTimer}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                >
                    Reset
                </button>
            </div>

            {/* Suono finale */}
            <audio ref={audioRef}>
                <source
                    src={bellSound}
                    type="audio/mpeg"
                />
            </audio>
        </div>
    );
}