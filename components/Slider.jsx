import { useEffect, useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import PropTypes from "prop-types";

const Slider = ({ items, showControlBtns, autoSlideTimer }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const moveSlide = (direction = "right") => {
        setCurrentIndex(
            direction === "right" ? currentIndex + 1 : currentIndex - 1
        );
    };

    // temporarily store setInterval returned value
    let autoInterval = 0;

    // clear timer interval when next/prev button or the current item is hovered
    const stopInterval = () => clearInterval(autoInterval);

    useEffect(() => {
        let lastIndex = items.length - 1;

        if (currentIndex < 0) {
            setCurrentIndex(lastIndex);
        }
        if (currentIndex > lastIndex) {
            setCurrentIndex(0);
        }

        // auto slide
        autoInterval = setInterval(() => {
            moveSlide();
        }, autoSlideTimer);

        return () => clearInterval(autoInterval);
    }, [currentIndex]);

    return (
        <div className="sliders-cont">
            {showControlBtns && (
                <button
                    className="sliders__btn sliders__btn-prev"
                    onClick={() => {
                        moveSlide("left");
                        stopInterval();
                    }}
                >
                    <GrFormPrevious />
                </button>
            )}
            <ul className="sliders">
                {items.map((item, itemIndex) => {
                    let position = `nextSlide`;
                    if (currentIndex === itemIndex) {
                        position = "active";
                    }
                    if (
                        itemIndex === currentIndex - 1 ||
                        (currentIndex === 0 && itemIndex === items.length - 1)
                    )
                        position = "lastSlide";

                    return (
                        <li key={itemIndex} className={`${position} slider`}>
                            {item}
                        </li>
                    );
                })}
            </ul>
            {showControlBtns && (
                <button
                    className="sliders__btn sliders__btn-next"
                    onClick={() => {
                        moveSlide();
                        stopInterval();
                    }}
                >
                    <GrFormNext />
                </button>
            )}
        </div>
    );
};

Slider.propTypes = {
    autoSlideTimer: PropTypes.number,
    items: PropTypes.array.isRequired,
    showControlBtns: PropTypes.bool,
};

Slider.defaultProps = {
    autoSlideTimer: 5000,
    showControlBtns: false,
};

export default Slider;
