import Link from "next/link";
import bgImage from "./../assests/images/twinkle-bg.jpg";

const Notfound = () => {
    return (
        <main className="notFound">
            <section className="notFound__section">
                <h2 className="notFound__header">PAGE NOT FOUND</h2>
                <p className="notFound__text">
                    The resource your'e looking for does not exist.
                </p>
            </section>
            <div className="notFound__link-cont">
                <Link href="/">
                    <a className="btn__outline notFound__link">Go back home</a>
                </Link>
            </div>
        </main>
    );
};

export default Notfound;
