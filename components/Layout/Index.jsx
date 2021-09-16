import { useRouter } from "next/dist/client/router";
import Navbar from "../Navbar/Index";

const Layout = ({ children }) => {
    let { route } = useRouter();
    let pageClassNameLayout = "";

    if (route === "/") pageClassNameLayout = "home__layout";
    // home__layout

    return (
        <div className={`${pageClassNameLayout}`}>
            <Navbar />
            {children}
        </div>
    );
};

export default Layout;
