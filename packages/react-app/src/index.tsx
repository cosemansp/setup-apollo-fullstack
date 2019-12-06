import React from 'react';
import ReactDOM from 'react-dom';
import log from 'loglevel';
import { ApolloProvider } from '@apollo/react-hooks'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { client } from './graphql';

import config from './config'

// Setup logger
log.setLevel(config.LOG_LEVEL);

// Dump config
console.log('Version:', config.VERSION);
log.info('Config', JSON.stringify(config, null, '\t'));

// App render
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, 
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
