import { useState } from 'react';
import {
  ChakraProvider,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { FaTwitter } from 'react-icons/fa';
import { AtSignIcon } from '@chakra-ui/icons';
import { useDataApi } from './hooks/useDataApi';
import './App.css';
import theme from './theme';

function App({ initialUsername }) {
  const [username, setUsername] = useState(initialUsername);
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    `http://localhost:3001/api/tweets/${initialUsername}`,
    {
      user: {},
      tweets: [],
    }
  );

  return (
    <ChakraProvider>
      <main className="App">
        <section>
          <FormControl
            onSubmit={e => {
              e.preventDefault();
              doFetch(`http://localhost:3001/api/tweets/${username}`);
            }}
          >
            <FormLabel htmlFor="username">Twitter username</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<AtSignIcon />}
              />
              <Input
                isRequired={true}
                variant="filled"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </InputGroup>
            <Button
              backgroundColor={theme.colors.brand.primary}
              leftIcon={<FaTwitter />}
            >
              Get tweets
            </Button>
          </FormControl>
        </section>

        {isError && <div>Something went wrong...</div>}

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <p>
              Recent tweets by <strong>@{data.user.username}</strong>{' '}
            </p>

            {data.tweets.map(tweet => (
              <li key={tweet.id}>
                <p>{tweet.text}</p>
              </li>
            ))}
          </div>
        )}
      </main>
    </ChakraProvider>
  );
}

export default App;
