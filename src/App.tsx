import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import {Directory} from "./components/directory/directory.component";

export const Goods_01 = () => {
    return (
        <div>Goods_01</div>
    )
}

export const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route exact path={'/'} component={Directory}/>
                <Route exact path={'/goods_01'} component={Goods_01}/>
            </Switch>
        </div>
    );
}
