import React from 'react'
import Logo from '../../component/logo/logo'
import {login} from '../../redux/user.redux'
import {connect} from 'react-redux'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import imoocForm from '../../component/imooc-form/imooc-form'
import {Redirect} from 'react-router-dom'

@connect(state => state.user,
    {login}
)
@imoocForm
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    register() {
        this.props.history.push('/register')
    }

    handleLogin() {
        this.props.login(this.props.state)
    }
    render() {
        return (<div>
            {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
            <Logo></Logo>
            <h2>我是登录页面</h2>
            {this.props.msg ? <p className={'error-msg'}>{this.props.msg}</p> : null}
            <WingBlank>
                <List>
                    <InputItem onChange={v => this.props.handleChange('name', v)}>用户</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem type={'password'} onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
                </List>
                <WhiteSpace></WhiteSpace>
                <Button type={'primary'} onClick={this.handleLogin}>登录</Button>
                <WhiteSpace></WhiteSpace>
                <Button type={'primary'} onClick={this.register}>注册</Button>
            </WingBlank>
        </div>)
    }
}

export default Login