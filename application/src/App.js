import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import WalletConnect from './pages/WalletConnect';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import AddProperty from './pages/AddProperty';
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
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/connect" component={WalletConnect} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/user/:address" component={UserProfile} />
          <Route exact path="/add/property" component={AddProperty} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
