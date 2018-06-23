import React from 'react'
import {Link,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import App from './App'
import {logout,login} from './Auth.redux'
function yiying(){
    return <h1>一营</h1>
}

function erying() {
    return <h1>二营</h1>
}

function qibinglian() {
    return <h1>骑兵连</h1>
}

class Text extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props)
        return <h2>测试组件</h2>
    }
}
@connect(
    state=>state.auth,
    {login,logout}
)
class Dashboard extends React.Component {
    render() {
        const redirectToLogin = <Redirect to={'/login'}></Redirect>
        const app = (<div>
            <h1>独立团</h1>
            {this.props.isAuth?<button onClick={this.props.logout}>注销</button>:null}
            <ul>
                <li>
                    <Link to={'/dashboard/'}>一营</Link>
                </li>
                <li>
                    <Link to={'/dashboard/erying'}>二营</Link>
                </li>
                <li>
                    <Link to={'/dashboard/qibinglian'}>骑兵连</Link>
                </li>
            </ul>
            <Route path={'/dashboard/'} exact component={App}></Route>
            <Route path={'/dashboard/erying'} component={erying}></Route>
            <Route path={'/dashboard/qibinglian'} component={qibinglian}></Route>
        </div>)
        return this.props.isAuth?app:redirectToLogin
    }
}

export default Dashboard