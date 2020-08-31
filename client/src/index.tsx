import './sass/_all.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { client } from './gql/client';

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import './resources/favicon.png';
import { ApolloProvider } from '@apollo/client';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app')
);