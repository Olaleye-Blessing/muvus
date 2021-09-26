import { useEffect, useState } from "react";
import LoadingIndicator from "./../../components/LoadingIndicator";
import { db } from "../../firebase";
import MediaLists from "../../modules/MediaLists";

const Index = () => {
    let communitiesRef = db.collection("communities");
    const [loadingCommunities, setLoadingCommunities] = useState(true);
    const [communities, setCommunities] = useState(null);
    const [error, setError] = useState(null);

    const getCommunities = () => {
        setLoadingCommunities(true);
        communitiesRef
            .get()
            .then((snapshot) => {
                let items = [];
                snapshot.forEach((doc) => {
                    let [media_type, id] = doc.id.split("-");
                    let { coverPhoto: poster_path, name } = doc.data();
                    items.push({ media_type, id, poster_path, name });
                });
                setCommunities(items);
                setLoadingCommunities(false);
            })
            .catch((e) => {
                console.warn("there is an error");
                console.warn(e);
                setLoadingCommunities(false);
                setError(
                    "there is an error loading communities. Please try again later"
                );
            });
    };
    useEffect(() => {
        let cancelRequest = false;
        getCommunities();

        return () => {
            cancelRequest = true;
        };
    }, []);

    if (loadingCommunities) {
        return (
            <main className="pt-10">
                <LoadingIndicator />
            </main>
        );
    }

    if (error) {
        return (
            <main className="pt-10">
                <p>there is an error</p>
            </main>
        );
    }

    return (
        <main className="pt-2">
            <header className="">
                <h1>Available communities</h1>
            </header>
            <section className="mt-10">
                {communities.length > 0 ? (
                    <MediaLists media={communities} />
                ) : (
                    <p className="mt-[-30px]">
                        There is no community at the moment
                    </p>
                )}
            </section>
        </main>
    );
};

export default Index;
