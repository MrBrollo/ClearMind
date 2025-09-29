import heroImg from "../assets/img/heroImg.jpg";

export default function Hero() {
    return (
        <section
            className="relative flex flex-col items-center justify-center text-center h-screen text-white px-6 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImg})` }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold">
                    Ritrova la tua calma interiore con ClearMind
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
                    La meditazione quotidiana ti aiuta a ridurre lo stress, migliorare la
                    concentrazione e trovare armonia interiore.
                </p>
            </div>
        </section>
    );
}