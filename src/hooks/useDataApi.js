import { useState, useEffect } from 'react';

export const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await fetch(url).then(r => r.json());
        setData(result);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    getData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};
