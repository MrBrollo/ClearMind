import useMeditationTimer from "../hooks/useMeditationTimer";
import MeditationTimer from "./MeditationTimer";
import bellSound from "../assets/sounds/meditationBell.mp3";
import { useEffect, useRef } from "react";

export default function TimerContainer() {
    const {
        minutes,
        setMinutes,
        isRunning,
        hasStarted,
        start,
        pause,
        reset,
        formatTime,
        secondsLeft,
    } = useMeditationTimer(5);

    const audioRef = useRef(null);

    useEffect(() => {
        if (secondsLeft === 0) {
            pause();
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();

                setTimeout(() => {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                }, 5000);
            }
        }
    }, [secondsLeft]);

    return (
        <>
            <MeditationTimer
                minutes={minutes}
                setMinutes={setMinutes}
                isRunning={isRunning}
                hasStarted={hasStarted}
                start={start}
                pause={pause}
                reset={reset}
                formatTime={formatTime}
                secondsLeft={secondsLeft}
            />

            <audio ref={audioRef}>
                <source src={bellSound} type="audio/mpeg" />
            </audio>
        </>
    );
}