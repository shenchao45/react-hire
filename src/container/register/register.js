import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register, user} from '../../redux/user.redux'
@connect(
    state=>state.user,
    {register}
)
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.login = this.login.bind(this)
        this.state={
            type:'genius',
            name:'',
            pwd:'',
            repwd:''
        }
        this.handleRegister = this.handleRegister.bind(this)
    }
    login() {
        this.props.history.push('/login')
    }
    handleChange(key,val){
        this.setState(
            {[key]:val}
        )
    }
    handleRegister() {
        this.props.register(this.state)
    }
    render() {
        const RadioItem = Radio.RadioItem
        return (<div>
            {this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
            <Logo></Logo>
            {this.props.msg?<p className={'error-msg'}>{this.props.msg}</p>:null}
            <List>
                <InputItem onChange={(v)=>this.handleChange('name',v)}>用户名</InputItem>
                <WhiteSpace></WhiteSpace>
                <InputItem type={'password'} onChange={(v)=>this.handleChange('pwd',v)}>密码</InputItem>
                <WhiteSpace></WhiteSpace>
                <InputItem type={'password'} onChange={(v)=>this.handleChange('repwd',v)}>确认密码</InputItem>
                <WhiteSpace></WhiteSpace>
                <RadioItem onChange={(v)=>this.handleChange('type','genius')} checked={this.state.type=='genius'}>牛人</RadioItem>
                <WhiteSpace></WhiteSpace>
                <RadioItem onChange={(v)=>this.handleChange('type','boss')}  checked={this.state.type=='boss'}>BOSS</RadioItem>
            </List>
            <WhiteSpace></WhiteSpace>
            <Button type={'primary'} onClick={this.handleRegister}>注册</Button>
        </div>)
    }
}

export default Register