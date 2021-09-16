export const fetchData = async (url, signal) => {
    try {
        let req = await fetch(url, { signal });
        let res = await req.json();
        if (!req.ok) throw res;
        return res;
    } catch (error) {
        throw error;
    }
};
