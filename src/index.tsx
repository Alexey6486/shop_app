import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store';
import {PersistGate} from "redux-persist/integration/react";
import {ApolloClient, ApolloProvider, gql, InMemoryCache, NormalizedCacheObject} from "@apollo/client";
import {resolvers, typeDefs} from "./graphql/resolvers";

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    uri: 'https://crwn-clothing.com',
    cache: new InMemoryCache(),
    resolvers,
    typeDefs,

});

client.writeQuery({
    query: gql`
        query {
              cartHidden
              cartItems
        }
      `,
    data: {
        cartHidden: true,
        cartItems: [],
    }
});


ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <BrowserRouter>
                <PersistGate persistor={persistor}>
                    <App/>
                </PersistGate>
            </BrowserRouter>
        </Provider>
    </ApolloProvider>
    ,
    document.getElementById('root')
);

