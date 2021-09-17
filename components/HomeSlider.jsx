import Image from "next/image";
import { imageLoader } from "../utils/imageLoader";
import Slider from "./Slider";

const HomeSlider = ({ trending }) => {
    let items = [...trending].map(
        (
            {
                backdrop_path,
                poster_path,
                name,
                title,
                first_air_date,
                overview,
            },
            index
        ) => (
            <div key={index} className="scroll__media">
                <figure className="scroll__media-img">
                    <Image
                        loader={imageLoader}
                        layout="fill"
                        src={backdrop_path || poster_path}
                    />
                </figure>
                <div className="scroll__media-detail scroll__media-overlay">
                    <h2>{name || title}</h2>
                    <p className="">{first_air_date}</p>
                    <p>{overview.slice(0, 145)}</p>
                </div>
            </div>
        )
    );

    return (
        <section className="home__slider">
            <Slider items={items} autoSlideTimer={10_000} />
        </section>
    );
};

export default HomeSlider;
