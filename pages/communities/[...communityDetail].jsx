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
    let router = useRouter();
    const [userMessage, setUserMessage] = useState("");

    const [groupState, dispatch] = useReducer(
        groupChatReducer,
        groupInitialState
    );

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

        let {
            user: { name, email },
        } = session;
        handleChangeUserMessage("");

        let { groupRef } = groupState;
        groupRef
            .collection("messages")
            .doc()
            .set({
                from: name,
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
        // createdAt
        // uid
        // message
    };

    useEffect(() => {
        if (!router.query || Object.keys(router.query).length === 0 || !session)
            return;

        let {
            query: {
                communityDetail: [cathegory, mediaId],
                imgSrc,
                name,
            },
        } = router;

        dispatch({ type: "coverPic", payload: imgSrc });

        let groupId = `${cathegory}-${mediaId}`;

        const createGroup = (groupId) => {
            // console.log(imgSrc);
            db.collection("communities")
                .doc(groupId)
                .set({ coverPhoto: imgSrc }, { merge: true })
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

    // show loading indication while checking if the group exists
    if (groupState.exists === -1)
        return (
            <main className="groupChat">
                <LoadingIndicator />
            </main>
        );

    if (!session) {
        // go to login page --- change this when custom login page is available
        return router.replace("/");
    }

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
