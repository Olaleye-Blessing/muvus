import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { RiGroupFill } from "react-icons/ri";
import firebase from "firebase/app";
import { db } from "../firebase";
import ButtonIcon from "./ButtonIcon";

const CommunityButton = ({ groupName, media_type, id, imgSrc }) => {
    let router = useRouter();
    let [session, loading] = useSession();
    return (
        <div className="">
            <ButtonIcon
                title={`Join ${groupName} community`}
                icon={<RiGroupFill />}
                extraClass="text-red-primary hover:opacity-50"
                onClick={(e) => {
                    e.preventDefault();
                    if (!session)
                        return alert(
                            "you need to be logged in to join this community"
                        );

                    db.collection("users")
                        .where("email", "==", session.user.email)
                        .get()
                        .then((querySnapshot) => {
                            if (querySnapshot.empty)
                                throw {
                                    name: "Not Found",
                                    message:
                                        "There is no user with the currently loggedin email",
                                };
                            querySnapshot.docs[0].ref.set(
                                {
                                    communities:
                                        firebase.firestore.FieldValue.arrayUnion(
                                            {
                                                communityId: `${media_type}-${id}`,
                                                coverPic: imgSrc,
                                                groupName,
                                            }
                                        ),
                                },
                                { merge: true }
                            );
                        })
                        .then(() => {
                            router.push(
                                `/communities/${media_type}/${id}?imgSrc=${imgSrc}&name=${encodeURIComponent(
                                    groupName
                                )}`
                            );
                        })
                        .catch((e) => {
                            if (e.name === "Not Found") {
                                return router.push("/");
                            }
                        });

                    // router.push(
                    //     `/communities/${media_type}/${id}?imgSrc=${imgSrc}&name=${encodeURIComponent(
                    //         groupName
                    //     )}`
                    // );
                }}
            />
        </div>
    );
};

export default CommunityButton;
