import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {createStore, applyMiddleware, compose} from 'redux'
import {counter, addGun, removeGun, addGunAsync} from './index.redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'

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
function erying() {
    return <h1>二营</h1>
}
function qibinglian() {
    return <h1>骑兵连</h1>
}
ReactDOM.render(<Provider store={store}>
   <Router>
       <div>
           <ul>
               <li><Link to={'/'}>一营</Link></li>
               <li><Link to={'/erying'}>2营</Link></li>
               <li><Link to={'/qibinglian'}>骑兵连</Link></li>
           </ul>
           <Route exact path={'/'} component={App}></Route>
           <Route path={'/erying'} component={erying}></Route>
           <Route path={'/qibinglian'} component={qibinglian}></Route>
       </div>
   </Router>
</Provider>, document.getElementById('root'))

