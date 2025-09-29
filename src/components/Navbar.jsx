import React, { useState, useEffect } from "react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTimer = () => {
        const timerSection = document.getElementById("timer");
        if (timerSection) {
            timerSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"
            }`}>
            {/*Logo / Nome */}
            <div className="flex items-center justify-between px-6 py-4">
                <h1 className="text-emerald-300 text-xl font-bold">ClearMind</h1>

                {/* Pulsante */}
                <button
                    onClick={scrollToTimer}
                    className="hidden md:block px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition">
                    Inizia ora la tua meditazione
                </button>
            </div>
        </nav>
    );
}