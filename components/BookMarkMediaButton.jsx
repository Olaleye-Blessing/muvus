import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { signIn, useSession } from "next-auth/client";

const BookMarkMediaButton = () => {
    let [session, loading] = useSession();

    if (loading) return null;

    return (
        <div className="w-max ml-auto mt-auto">
            <button
                className="bg-red p-3"
                type="button"
                onClick={(e) => {
                    e.preventDefault();

                    if (!session) {
                        return signIn();
                    }

                    // console.log("yes");
                }}
            >
                bookmark
            </button>
        </div>
    );
};

export default BookMarkMediaButton;
