import React, { useState, useEffect, useRef } from "react";

export default function TimerInput({ minutes, onMinutesChange, disabled }) {
    const [minutesInput, setMinutesInput] = useState(String(minutes));
    const inputRef = useRef(null);

    useEffect(() => {
        setMinutesInput(String(minutes));
    }, [minutes]);

    const validateMinutes = (value) => {
        let num = Number(value);

        // Controlla se è un numero valido
        if (!isFinite(num) || isNaN(num)) {
            return 5; // fallback default
        }

        num = Math.floor(num);

        // Applica i limiti min/max
        if (num < 1) num = 1;
        if (num > 120) num = 120;

        return num;
    };

    const handleMinutesInputChange = (e) => {
        const raw = e.target.value;
        setMinutesInput(raw);

        const maybeNum = Number(raw);
        if (!isNaN(maybeNum) && isFinite(maybeNum) && maybeNum >= 1 && !disabled) {
            const intVal = validateMinutes(maybeNum);
            onMinutesChange(intVal);
        }
    };

    const applyMinutesInput = () => {
        const validatedMinutes = validateMinutes(minutesInput);
        setMinutesInput(String(validatedMinutes));
        onMinutesChange(validatedMinutes);
    };

    const handleBlur = () => applyMinutesInput();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (inputRef.current) inputRef.current.blur();
        }
    };

    return (
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
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                className="w-20 p-1 border border-emerald-400 rounded text-center focus:ring-2 focus:ring-emerald-400"
            />
        </div>
    );
}