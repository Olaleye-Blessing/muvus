import Slider from "./Slider";
import SliderMedia from "./SliderMedia";

const HomeSlider = ({ trending, category: media_type }) => {
    let items = [...trending].map((trend) => (
        <SliderMedia key={trend.id} {...trend} />
    ));

    return (
        <section className="home__slider">
            <Slider items={items} autoSlideTimer={10_000} />
        </section>
    );
};

export default HomeSlider;
