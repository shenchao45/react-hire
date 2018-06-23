import React from 'react'
import {connect} from 'react-redux'
import {login,logout} from './Auth.redux'
import {Redirect} from 'react-router-dom'
//合并reducer
@connect(
    state=>state.auth,
    {login}
)
class Auth extends React.Component {
    render() {

        return (<div>
            {this.props.isAuth?<Redirect to={'/dashboard'} />:null}
            <h2>你没有权限，需要登录才能看</h2>
            <button onClick={this.props.login}>登录</button>
        </div>)
    }
}

export default Auth