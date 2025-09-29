import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import img1 from "../assets/img/quietRoom.png";
import img2 from "../assets/img/meditation.jpg";
import img3 from "../assets/img/waterfall.jpg";

const slides = [
    { img: img1, text: "Il silenzio è lo spazio in cui la mente ritrova pace." },
    { img: img2, text: "Respira profondamente, lascia andare i pensieri e ritrova te stesso." },
    { img: img3, text: "Come l’acqua scorre libera, così la mente si apre alla serenità." },
];

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 5000); //cambia slide ogni 5 secondi
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full max-w-3xl mx-auto mt-12">
            <div className="overflow-hidden rounded-2xl shadow-lg">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={slides[currentIndex].img}
                        src={slides[currentIndex].img}
                        alt={`slide-${currentIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2 }} // durata dissolvenza
                        className="w-full h-64 object-cover"
                    />
                </AnimatePresence>
            </div>
            <p className="text-center mt-4 text-gray-700 italic">
                {slides[currentIndex].text}
            </p>
        </div>
    );
}