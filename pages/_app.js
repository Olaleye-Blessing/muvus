// import "./../styles/globals.css";
import "./../styles/index.scss";
import Layout from "../components/Layout/Index";

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
