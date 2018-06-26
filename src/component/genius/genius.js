import React from 'react'
import {Card,WhiteSpace,WingBlank} from 'antd-mobile'
import axios from 'axios'
import {getUserList} from '../../redux/chatuser.redux'
import {connect} from 'react-redux'
import UserCard from '../usercard/usercard'
@connect(
    state=>state.chatuser,
    {getUserList}
)
export default class Genius extends React.Component {
    componentWillMount() {
        this.props.getUserList('boss')
    }
    render() {
        return (<UserCard userList={this.props.userList}></UserCard>);
    }
}