import { useRouter } from "next/dist/client/router";
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
        <div className={`${pageClassNameLayout}`}>
            <Navbar />
            {children}
        </div>
    );
};

export default Layout;
