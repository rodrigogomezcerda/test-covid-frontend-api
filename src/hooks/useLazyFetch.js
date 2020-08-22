import { useState, useEffect, useCallback } from "react";

function useLazyFetch({ api, method, url, immediate = false }) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const execute = useCallback(
        (urlSend) => {
            setIsLoading(true);

            const fetchData = async () => {
                try {
                    api[method](urlSend)
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
        },
        [url],
    );

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return { execute, response, error, isLoading };
}
export { useLazyFetch };
