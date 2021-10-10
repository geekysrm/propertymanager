import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import WalletConnect from './pages/WalletConnect';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import AddProperty from './pages/AddProperty';
import PropertyProfile from './pages/PropertyProfile';
import Marketplace from './pages/Marketplace';
import Navbar from './components/Navbar';
import './App.css';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
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
          <Route exact path="/property/:id" component={PropertyProfile} />
          <Route exact path="/marketplace" component={Marketplace} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
