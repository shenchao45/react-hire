import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {createStore, applyMiddleware, compose} from 'redux'
import {counter, addGun, removeGun, addGunAsync} from './index.redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

const reduxDevtools = window.devToolsExtension
//1新建store
const store = createStore(counter, compose(
    applyMiddleware(thunk),
    reduxDevtools ? reduxDevtools() : f => f
))
// function listener() {
//     const current = store.getState()
//     console.log(`现在有机枪${current}把`)
// }
// store.subscribe(listener)
// //派发事件,传递action
// store.dispatch(addGun())
ReactDOM.render(<Provider store={store}>
    <App/>
</Provider>, document.getElementById('root'))

