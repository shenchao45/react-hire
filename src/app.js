import React from 'react'
import GeniusInfo from "./container/geniusinfo/geniusinfo";
import Dashboard from "./component/dashboard/dashboard";
import Register from "./container/register/register";
import Login from "./container/login/login";
import BossInfo from "./container/bossinfo/bossinfo";
import Chat from "./component/chat/chat";
import {Route,Switch} from 'react-router-dom'
import AuthRoute from './component/authroute/autoroute'

export default class App extends React.Component {
    render(){
        return (<div>
            <AuthRoute></AuthRoute>
            <Switch>
                <Route path={'/bossinfo'} component={BossInfo}></Route>
                <Route path={'/geniusinfo'} component={GeniusInfo}></Route>
                <Route path={'/login'} component={Login}></Route>
                <Route path={'/register'} component={Register}></Route>
                <Route path={'/chat/:user'} component={Chat}></Route>
                <Route component={Dashboard}></Route>
            </Switch>
        </div>)
    }
}