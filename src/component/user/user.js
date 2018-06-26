import React from 'react'
import {connect} from 'react-redux'
import {Result, Icon, WhiteSpace, List, Modal} from 'antd-mobile';
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
@connect(
    state => state.user,
    {logoutSubmit}
)
export default class User extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout() {
        const alert = Modal.alert;
        alert('注销', '是否退出？', [
            {text: '取消', onPress: () => console.log('cancel')},
            {
                text: '确定', onPress: () => {
                    // browserCookie.erase('userid')
                    this.props.logoutSubmit()

                }
            },
        ])

    }

    render() {
        const props = this.props
        return (props.name ?
                <div>
                    <Result
                        img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width: 50}} alt=""/>}
                        title={this.props.name}
                        message={props.type == 'boss' ? props.company : null}
                    ></Result>
                    <List renderHeader={() => '简介'}>
                        <List.Item>
                            {props.title}
                            {this.props.desc.split('\n').map(v => <List.Item.Brief key={v}>{v}</List.Item.Brief>)}
                            {props.money ? <List.Item.Brief>props.money</List.Item.Brief> : null}
                        </List.Item>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <List>
                        <List.Item onClick={this.logout}>退出登录</List.Item>
                    </List>
                </div> :<Redirect to={props.redirectTo}/>

    )
    }
}