import useMeditationTimer from "../hooks/useMeditationTimer";

export default function MeditationTimer({
    minutes,
    setMinutes,
    hasStarted,
    isRunning,
    start,
    pause,
    reset,
    formatTime,
    secondsLeft = 0,
}) {
    return (
        <div
            id="timer"
            className="mt-12 flex flex-col items-center justify-center bg-[#e6f2ed] p-6 rounded-2xl shadow-md"
        >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Timer di Meditazione
            </h2>

            {!hasStarted && (
                <div className="flex items-center gap-2 mb-4">
                    <label className="text-gray-600">Durata (minuti):</label>
                    <input
                        type="number"
                        min="1"
                        max="120"
                        value={minutes}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            if (val >= 1) setMinutes(val);
                        }}
                        className="w-20 p-2 border rounded-md text-center bg-gray-50 transition-all duration-300 ease-in-out"
                    />
                </div>
            )}

            <div className="text-4xl font-mono text-gray-700 mb-4">
                {formatTime()}
            </div>

            <div className="flex gap-4">
                {secondsLeft > 0 ? (
                    !isRunning ? (
                        <button
                            onClick={start}
                            className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
                        >
                            {hasStarted ? "Riprendi" : "Start"}
                        </button>
                    ) : (
                        <button
                            onClick={pause}
                            className="px-6 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
                        >
                            Pausa
                        </button>
                    )
                ) : null}

                <button
                    onClick={reset}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}