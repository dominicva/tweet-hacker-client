import { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Stack,
  Spacer,
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

const { brand: colorPalette } = theme.colors;

function App({ initialUsername = 'spacex' }) {
  const [username, setUsername] = useState(initialUsername);
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    `http://localhost:3001/api/tweets/${initialUsername}`,
    {
      user: {},
      tweets: [],
    }
  );

  return (
    <ChakraProvider theme={theme}>
      <Box id="app" bgColor={theme.colors.brand.background}>
        <FormControl
          onSubmit={e => {
            e.preventDefault();
            doFetch(`http://localhost:3001/api/tweets/${username}`);
          }}
        >
          <Stack>
            <FormLabel
              mb={0}
              color={theme.colors.brand.text}
              htmlFor="username"
            >
              Twitter username
            </FormLabel>
            <InputGroup maxW="md">
              <InputLeftElement
                pointerEvents="none"
                children={<AtSignIcon />}
              />
              <Input
                id="username"
                isRequired={true}
                variant="filled"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </InputGroup>
            <Spacer />
            <Button
              h="12"
              maxW="48"
              backgroundColor={colorPalette.primary}
              leftIcon={<FaTwitter />}
            >
              Get tweets
            </Button>
          </Stack>
        </FormControl>

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
      </Box>
    </ChakraProvider>
  );
}

export default App;
