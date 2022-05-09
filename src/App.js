import { useState, Fragment } from 'react';
import { useDataApi } from './hooks/useDataApi';
import './App.css';

function App() {
  const [username, setUsername] = useState('dominicva');
  const [topic, setTopic] = useState('');
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    `http://localhost:3001/api/tweets/${username}`,
    {
      data: {
        user: {},
        tweets: [],
      },
    }
  );

  return (
    <div className="App">
      <Fragment>
        <form
          onSubmit={e => {
            e.preventDefault();
            doFetch(`http://localhost:3001/api/tweets/${username}/${topic}`);
          }}
        >
          <input
            type="text"
            value={`@${username}`}
            onChange={e => setUsername(e.target.value.slice(1))}
          ></input>
          <input
            type="text"
            value={topic}
            placeholder="e.g. bitcoin"
            onChange={e => setTopic(e.target.value)}
          ></input>
          <button type="submit">Get tweets</button>
        </form>

        {isError && <div>Something went wrong...</div>}

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <p>
              {data.data.user.handle} <strong>{data.data.user.name}</strong>
            </p>
            {data.data.tweets.map(tweet => (
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
