import React, { useEffect, useState, useRef } from "react";
import useTimer from "../hooks/useTimer";
import useAudio from "../hooks/useAudio";
import bellSound from "../assets/sounds/meditationBell.mp3";

export default function MeditationTimer() {
    const {
        minutes,
        setMinutes,
        secondsLeft,
        isRunning,
        start,
        pause,
        reset,
        formatTime,
    } = useTimer(5);

    const { play } = useAudio(bellSound, 5000);
    const [minutesInput, setMinutesInput] = useState(String(minutes));
    const inputRef = useRef(null);

    useEffect(() => {
        setMinutesInput(String(minutes));
    }, [minutes]);

    useEffect(() => {
        if (secondsLeft === 0 && isRunning) {
            pause();
            play();
        }
    }, [secondsLeft, isRunning, pause, play]);

    const isStarted = secondsLeft < minutes * 60;

    const handleMinutesInputChange = (e) => {
        setMinutesInput(e.target.value);
    };

    const handleMinutesInputBlur = () => {
        let num = Number(minutesInput);
        if (isNaN(num) || num < 1) num = 1;
        if (num > 120) num = 120;
        setMinutes(num);
        setMinutesInput(String(num));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            inputRef.current.blur();
        }
    };


    return (
        <div className="flex flex-col items-center text-center mt-10 space-y-4">
            <h2 className="text-2xl font-semibold text-emerald-700">Timer di Meditazione</h2>

            <div className="flex flex-col items-center space-y-4">
                <div className="text-5xl font-bold text-emerald-800">
                    {formatTime(secondsLeft)}
                </div>

                <div className="flex items-center space-x-2">
                    <label htmlFor="minutes" className="text-gray-700 text-sm">
                        Minuti:
                    </label>
                    <input
                        id="minutes"
                        ref={inputRef}
                        type="number"
                        min="1"
                        max="120"
                        value={minutesInput}
                        onChange={handleMinutesInputChange}
                        onBlur={handleMinutesInputBlur}
                        onKeyDown={handleKeyDown}
                        disabled={isRunning}
                        className="w-20 p-1 border border-emerald-400 rounded text-center focus:ring-2 focus:ring-emerald-400"
                    />
                </div>

                <div className="flex space-x-3">
                    {!isRunning && secondsLeft === 0 ? (
                        <button
                            onClick={reset}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition"
                        >
                            Reset
                        </button>
                    ) : (
                        <>
                            {!isRunning ? (
                                <button
                                    onClick={start}
                                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition"
                                >
                                    Start
                                </button>
                            ) : (
                                <button
                                    onClick={pause}
                                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition"
                                >
                                    Pausa
                                </button>
                            )}

                            <button
                                onClick={reset}
                                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition"
                            >
                                Reset
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}