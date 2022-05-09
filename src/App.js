import { useState, useEffect, Fragment } from 'react';
import './App.css';

const useDataApi = (initialUrl, initialData) => {
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

function App() {
  const [query, setQuery] = useState('dominicva');
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    `http://localhost:3001/api/tweets/${query}`,
    {
      data: {
        user: {},
        recent_tweets: [],
      },
    }
  );

  return (
    <div className="App">
      <Fragment>
        <form
          onSubmit={e => {
            e.preventDefault();
            doFetch(`http://localhost:3001/api/tweets/${query}`);
          }}
        >
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
          ></input>
          <button type="submit">Search</button>
        </form>

        {isError && <div>Something went wrong...</div>}

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {data.data.recent_tweets.map(tweet => (
              <li key={tweet.id}>
                <p>{tweet.text}</p>
              </li>
            ))}
          </div>
        )}
      </Fragment>
    </div>
  );
}

export default App;
