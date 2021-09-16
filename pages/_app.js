// import "./../styles/globals.css";
import "./../styles/index.scss";
import Layout from "../components/Layout/Index";
import { AppWrapper } from "../context/appContext";

function MyApp({ Component, pageProps }) {
    return (
        <AppWrapper>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AppWrapper>
    );
}

export default MyApp;
