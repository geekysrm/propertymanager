import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  extendTheme,
} from '@chakra-ui/react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { ColorModeSwitcher } from './ColorModeSwitcher';

import Landing from './pages/Landing';
import WalletConnect from './pages/WalletConnect';

import Navbar from './components/Navbar';

import './App.css';

const theme = extendTheme({
  config: {
    useSystemColorMode: true,
    initialColorMode: 'dark',
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/connect" component={WalletConnect} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;

{
  /* <ColorModeSwitcher justifySelf="flex-end" /> */
}
