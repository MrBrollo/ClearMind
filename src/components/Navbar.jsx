import React, { useState, useEffect, useCallback } from "react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    // Funzione ottimizzata per scroll al timer
    const scrollToTimer = useCallback(() => {
        const timerSection = document.getElementById("timer");
        if (timerSection) {
            timerSection.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    // Aggiunge un listener per cambiare lo sfondo durante lo scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`
        fixed top-0 left-0 w-full z-50 
        flex items-center justify-between 
        px-6 py-4 
        transition-all duration-500 
        ${isScrolled
                    ? "bg-white-500 shadow-md"
                    : "bg-transparent"
                }
      `}
        >
            {/* Logo */}
            <h1
                className={`text-2xl font-bold select-none transition-colors duration-500 ${isScrolled ? "text-white" : "text-emerald-300"
                    }`}
            >
                ClearMind
            </h1>

            {/* Pulsante */}
            <button
                onClick={scrollToTimer}
                className={`
          font-semibold rounded-full shadow-md transition-all duration-300
          ${isScrolled
                        ? "bg-white text-green-600 hover:bg-gray-100"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }
          active:scale-95
          px-6 py-2
          sm:px-5 sm:py-2
          md:px-6 md:py-2
          lg:px-8 lg:py-3
          text-sm sm:text-sm md:text-base
        `}
            >
                Inizia ora la tua meditazione
            </button>
        </nav>
    );
}