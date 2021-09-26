import { useSession } from "next-auth/client";
import { useEffect } from "react";
import LoadingIndicator from "./../../components/LoadingIndicator";

const Index = () => {
    let [session, loading] = useSession();

    if (loading) return <LoadingIndicator />;

    if (!session) return <div>Redirect to Log In page</div>;
    return <div>all communities page</div>;
};

export default Index;
