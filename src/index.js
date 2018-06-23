import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {createStore, applyMiddleware, compose} from 'redux'
import reducers from './reducer'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Switch, Route, Link,Redirect} from 'react-router-dom'
import Auth from './Auth'
import Dashboard from './Dashboard'
const reduxDevtools = window.devToolsExtension
//1新建store
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDevtools ? reduxDevtools() : f => f
))
console.log(store.getState())
// function listener() {
//     const current = store.getState()
//     console.log(`现在有机枪${current}把`)
// }
// store.subscribe(listener)
// //派发事件,传递action
// store.dispatch(addGun())

ReactDOM.render(<Provider store={store}>
    <Router>
        <Switch>
            <Route path={'/login'} component={Auth}></Route>
            <Route path={'/dashboard'} component={Dashboard}></Route>
            <Redirect to={'/dashboard'}></Redirect>
        </Switch>
    </Router>
</Provider>,document.getElementById('root'));

