import Link from "next/link";
import { useAppContext } from "../context/appContext";

const HomeLogo = () => {
    let { handleRemoveSearchPage } = useAppContext();

    return (
        <figure className="">
            <Link href="/">
                <a
                    className="block text-2xl"
                    onClick={() => {
                        handleRemoveSearchPage();
                    }}
                >
                    MUVUS
                </a>
            </Link>
        </figure>
    );
};

export default HomeLogo;
