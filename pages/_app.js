// import "./../styles/globals.css";
import "./../styles/index.scss";
import Layout from "../components/Layout/Index";
import { AppWrapper } from "../context/appContext";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
    return (
        <Provider session={pageProps.session}>
            <AppWrapper>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AppWrapper>
        </Provider>
    );
}

export default MyApp;
