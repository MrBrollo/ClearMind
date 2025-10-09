import Hero from "../components/Hero";
import Carousel from "../components/Carousel";
import MeditationTimer from "../components/TimerContainer";


export default function Home() {
    return (
        <div>
            <Hero />
            <Carousel />
            <MeditationTimer />
        </div>
    );
}