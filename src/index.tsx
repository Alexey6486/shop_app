import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store';
import {PersistGate} from "redux-persist/integration/react";
import {ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export const client: any = new ApolloClient({
    uri: 'https://crwn-clothing.com',
    cache: new InMemoryCache(),
    credentials: 'include',
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

