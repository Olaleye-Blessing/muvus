import { useEffect, useState } from "react";
import useFetch from "./useFetch";

const useLoadMore = (url, page) => {
    const [resultDetail, setResultDetail] = useState({
        results: [],
        total_pages: 1,
    });

    // empty results when url changes and change total_pages to 1
    useEffect(() => {
        setResultDetail({
            results: [],
            total_pages: 1,
        });
    }, [url]);

    url = url && `${url}&page=${page}`;

    let { status, data, error } = useFetch(url);

    useEffect(() => {
        if (status !== "fetched") return;

        let {
            data: { results, total_pages },
        } = data;

        let newData = [...resultDetail.results, ...results];
        setResultDetail({ total_pages, results: newData });
    }, [data]);

    // chnage status if current page > total pages
    if (status === "fetched" && data.data.page > data.data.total_pages) {
        error = "No more data";
        status = "error";
    }

    return { ...resultDetail, status, error };
};

export default useLoadMore;
