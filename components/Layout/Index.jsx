import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Navbar from "../Navbar/Index";

const Layout = ({ children }) => {
    let { route } = useRouter();
    let pageClassNameLayout = "";

    // pages to use genral layout of 2 colums(nav and main content) grid
    let generalLayoutGridPages = ["/mediaDetail/[...media]"];

    if (route === "/") pageClassNameLayout = "home__layout";

    if (generalLayoutGridPages.includes(route)) {
        pageClassNameLayout = "general__layout";
    }

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

                <title>
                    MUVUS - All about movies, tv series, people and community
                    groups.
                </title>
                <meta
                    name="keywords"
                    content="browse movies, tv series, people, popular movies, trending movie, popular series, trending series, active communities"
                />
                <meta
                    name="description"
                    content="browse muvus series, movies, people, community of people and more"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <link
                    rel="shortcut icon"
                    href="/favicon.ico"
                    type="image/x-icon"
                />
            </Head>
            {/* // <div className={`${pageClassNameLayout}`}> */}
            <div className={`layout`}>
                <Navbar />
                {children}
            </div>
        </>
    );
};

export default Layout;
