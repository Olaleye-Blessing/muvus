import { getSession, useSession } from "next-auth/client";

const Index = () => {
    let [session, loading] = useSession();

    return <div>main profile page</div>;
};

export const getServersideProps = async (context) => {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
};

export default Index;
