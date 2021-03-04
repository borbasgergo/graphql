import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux';
import { store } from './redux';

import { ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache  } from "@apollo/client"
import { ApolloProvider } from "@apollo/react-hooks"
import { AuthContextProvider } from './components/Provider/AuthContext';

const httpLink = new HttpLink({ uri: "http://localhost:9000/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {

  operation.setContext({
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt') || null}`,
    }
  });

  return forward(operation);
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
         
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
