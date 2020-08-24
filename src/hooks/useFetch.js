import { useState, useEffect, useCallback } from "react";

function useFetch({ api, method, url, immediate = true }) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const execute = useCallback(() => {
        setIsLoading(true);

        const fetchData = async () => {
            try {
                api[method](url)
                    .then((res) => {
                        setResponse(res.data);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        };

        return fetchData();
    }, [url]);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return { response, error, isLoading };
}
export { useFetch };
