Array.from({ length: 10 }, (_, i) => i + 1);
const LoadingIndicator = ({ classSize }) => {
    return (
        <div className={`loading__cont ${classSize}`}>
            <div className="middle">
                {/* {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <div
                        key={num}
                        className={`bar bar${num} ${classSize}`}
                    ></div>
                ))} */}

                <div className="bar bar1"></div>
                <div className="bar bar2"></div>
                <div className="bar bar3"></div>
                <div className="bar bar4"></div>
                <div className="bar bar5"></div>
                <div className="bar bar6"></div>
                <div className="bar bar7"></div>
                <div className="bar bar8"></div>
            </div>
        </div>
    );
};

LoadingIndicator.defaultProps = {
    classSize: "loading__cont-big",
};

export default LoadingIndicator;
