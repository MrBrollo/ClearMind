import React from "react";

export default function TimerControls({ secondsLeft, isRunning, onStart, onPause, onReset }) {
    return (
        <div className="flex space-x-3 mb-4">
            {secondsLeft === 0 ? (
                <button
                    onClick={onReset}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition"
                >
                    Reset
                </button>
            ) : !isRunning ? (
                <button
                    onClick={onStart}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition"
                >
                    Start
                </button>
            ) : (
                <button
                    onClick={onPause}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition"
                >
                    Pausa
                </button>
            )}

            <button
                onClick={onReset}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
            >
                Reset
            </button>
        </div>
    );
}