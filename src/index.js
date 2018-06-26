import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, compose, createStore} from 'redux'
import reducers from './reducer'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import './config'
import './index.css'
import App from './app'

const reduxDevtools = window.devToolsExtension
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDevtools ? reduxDevtools() : f => f
))
ReactDOM.render(<Provider store={store}>
    <Router>
        {/*<div>*/}
            {/*<AuthRoute></AuthRoute>*/}
            {/*<Switch>*/}
                {/*<Route path={'/bossinfo'} component={BossInfo}></Route>*/}
                {/*<Route path={'/geniusinfo'} component={GeniusInfo}></Route>*/}
                {/*<Route path={'/login'} component={Login}></Route>*/}
                {/*<Route path={'/register'} component={Register}></Route>*/}
                {/*<Route path={'/chat/:user'} component={Chat}></Route>*/}
                {/*<Route component={Dashboard}></Route>*/}
            {/*</Switch>*/}
        {/*</div>*/}
        <App></App>
    </Router>
</Provider>,document.getElementById('root'));

