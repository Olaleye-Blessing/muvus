import Head from "next/head";
import { useSession, signin, signIn, getSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useEffect, useReducer, useRef, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../../firebase";
import { groupChatReducer } from "../../Reducers/groupChatReducer";
import LoadingIndicator from "../../components/LoadingIndicator";
import ChatGroup from "./../../components/ChatGroup/Index";

let groupInitialState = {
    exists: -1, // -1 for unknown, 0 for false, 1 for true
    messages: [],
    coverPic: null,
    name: null,
    groupRef: null,
};
const Community = () => {
    let [session, loading] = useSession();

    let {
        user: { email, name: userName },
    } = session;

    let router = useRouter();

    let {
        query: {
            communityDetail: [category, mediaId],
            imgSrc,
            name,
        },
    } = router;

    const [userMessage, setUserMessage] = useState("");

    const [groupState, dispatch] = useReducer(
        groupChatReducer,
        groupInitialState
    );

    const [joinedCommunities, setJoinedCommunities] = useState([]);

    const scrollIntoViewDivRef = useRef("");

    const getMessages = (groupRef, name) => {
        groupRef
            .collection("messages")
            .orderBy("createdAt", "desc") // get lastest messages
            .limit(50)
            .onSnapshot((querySnapShot) => {
                let items = [];
                querySnapShot.forEach((doc) => items.push(doc.data()));
                dispatch({
                    type: "group_exists",
                    payload: { exists: 1, name, groupRef },
                });
                // reverse messages to have the last message at the bottom of the screen
                dispatch({ type: "messages", payload: items.reverse() });
            });
    };

    const handleChangeUserMessage = (val) => setUserMessage(val);
    const handleSendMessage = () => {
        if (!userMessage) return;

        handleChangeUserMessage("");

        let { groupRef } = groupState;
        groupRef
            .collection("messages")
            .doc()
            .set({
                from: userName,
                email,
                createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                "message": userMessage,
            })
            .then(() => {
                // console.log(scrollIntoViewDivRef.current);
                scrollIntoViewDivRef.current.scrollIntoView({
                    behavior: "smooth",
                });
            })
            .catch((err) => {
                console.warn(err);
            });
    };

    const getUserFirestore = () =>
        db
            .collection("users")
            .where("email", "==", email)
            .get()
            .then((querySnapshot) => querySnapshot.docs[0]);

    useEffect(() => {
        dispatch({ type: "coverPic", payload: imgSrc });

        let groupId = `${category}-${mediaId}`;

        const createGroup = (groupId) => {
            // console.log(imgSrc);
            db.collection("communities")
                .doc(groupId)
                .set({ coverPhoto: imgSrc, name }, { merge: true })
                .then(() => {
                    db.collection("communities")
                        .doc(groupId)
                        .collection("messages")
                        .doc("fake document")
                        .set({ from: "fake document" }, { merge: true });
                })
                .then((res) => {
                    getMessages(groupRef, name);
                })
                .catch((error) => {
                    console.log("there is an error");
                    console.warn(error);
                });
        };

        let groupRef = db.collection("communities").doc(groupId);

        groupRef.get().then((docSnapShot) => {
            if (docSnapShot.exists) {
                getMessages(groupRef, name);
            } else {
                createGroup(groupId);
            }
        });
    }, [router.query, session]);

    useEffect(() => {
        getUserFirestore().then((snap) => {
            let { communities } = snap.data();

            setJoinedCommunities(communities);
        });
    }, []);

    // show loading indication while checking if the group exists
    if (groupState.exists === -1)
        return (
            <main className="groupChat">
                <LoadingIndicator />
            </main>
        );

    const handleLeaveGroup = () => {
        getUserFirestore()
            .then((snapShot) => {
                snapShot.ref.set(
                    {
                        communities: firebase.firestore.FieldValue.arrayRemove({
                            communityId: `${category}-${mediaId}`,
                            coverPic: imgSrc,
                            groupName: name,
                        }),
                    },
                    { merge: true }
                );
            })
            .then(() => router.replace("/communities"));
    };

    return (
        <>
            <Head>
                <title>({groupState.name}) community || MUVUS</title>
            </Head>
            <ChatGroup
                {...groupState}
                handleChangeUserMessage={handleChangeUserMessage}
                handleSendMessage={handleSendMessage}
                userMessage={userMessage}
                user={session?.user.email}
                scrollIntoViewDivRef={scrollIntoViewDivRef}
                joinedCommunities={joinedCommunities}
                handleLeaveGroup={handleLeaveGroup}
            />
        </>
    );
};

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
};

export default Community;
