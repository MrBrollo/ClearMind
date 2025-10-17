import { useRef, useEffect, useCallback } from "react";

export default function useAudio(src, duration = 5000) {
    const audioRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const audio = new Audio(src);
        audioRef.current = audio;
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            audio.pause();
            audio.currentTime = 0;
        };
    }, [src]);

    const play = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();

            timeoutRef.current = setTimeout(() => {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }, duration);
        }
    }, [duration]);

    return { play };
}