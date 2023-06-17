import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          signal: abortController.signal,
        });
        if (isMounted) {
          setData(response.data);
          setError(null);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          if (error.name === "AbortError") {
            console.log("Request aborted");
          } else {
            setError("Error fetching data");
            setIsLoading(false);
          }
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [url]);
  return { data, isLoading, error };
};

export default useFetch;
