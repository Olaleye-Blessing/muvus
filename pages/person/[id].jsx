import Image from "next/image";
import { fetchData } from "../../utils/fetchData";
import { imageLoader } from "../../utils/imageLoader";

const TMDB_KEY = process.env.TMDB_KEY;

const person = ({ data }) => {
    console.log(data);
    let { profile_path: src, biography, name, birthday } = data;

    return (
        <main className="mediaPage">
            <figure className="mediaPage__img">
                {src && (
                    <Image
                        loader={imageLoader}
                        layout="fill"
                        src={src}
                        objectFit="cover"
                    />
                )}
            </figure>
            <section className="mediaPage__detail">
                <header className="mediaPage__header">
                    <h1 className="mediaPage__head">
                        <span className="mediaPage__title">{name}</span>
                        <span className="mediaPage__dot">.</span>
                        <span className="mediaPage__date">{birthday}</span>
                    </h1>
                </header>
                <p className="mediaPage__overview">{biography}</p>
            </section>
        </main>
    );
};

export const getServerSideProps = async (context) => {
    let { id } = context.query;

    let url = new URL(`https://api.themoviedb.org/3/person/${id}`);
    url.searchParams.set("api_key", TMDB_KEY);
    url.searchParams.set("language", "en-US");
    url.searchParams.set("append_to_response", "credits");

    try {
        let result = await fetchData(url);
        return {
            props: {
                data: result,
            },
        };
    } catch (error) {
        return {
            props: {
                error,
            },
        };
    }
};

export default person;
