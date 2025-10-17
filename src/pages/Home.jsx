import Hero from "../components/Hero";
import Carousel from "../components/Carousel";
import MeditationTimer from "../components/MeditationTimer";


export default function Home() {
    return (
        <div>
            <Hero />
            <Carousel />
            <MeditationTimer />
        </div>
    );
}