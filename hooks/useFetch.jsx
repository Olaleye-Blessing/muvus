import { useEffect, useRef, useReducer } from "react";
import { fetchData } from "../utils/fetchData";

const useFetch = (url) => {
    // cache urls to avoid unncessary fetching
    const cache = useRef({});

    const initialState = {
        status: "idle",
        error: null,
        data: [],
    };

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "FETCHING":
                return { ...initialState, status: "fetching" };
            case "FETCHED":
                return {
                    ...initialState,
                    status: "fetched",
                    data: action.payload,
                };
            case "FETCH_ERROR":
                return {
                    ...initialState,
                    status: "error",
                    error: action.payload,
                };
            default:
                return state;
        }
    }, initialState);

    useEffect(() => {
        if (!url) return;

        let abortFetch = new AbortController();
        let signal = abortFetch.signal;

        const fetchingData = async () => {
            dispatch({ type: "FETCHING" });
            let data;
            try {
                if (cache.current[url]) {
                    data = cache.current[url];
                } else {
                    data = await fetchData(url, signal);
                    cache.current[url] = data;
                }

                dispatch({ type: "FETCHED", payload: data });
            } catch (error) {
                if (error.name === "AbortError") return;

                dispatch({ type: "FETCH_ERROR", payload: error.message });
            }
        };

        fetchingData();

        return () => abortFetch.abort();
    }, [url]);

    return state;
};

export default useFetch;
