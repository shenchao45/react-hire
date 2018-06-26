import React from 'react'
import {Card,WhiteSpace,WingBlank} from 'antd-mobile'
import axios from 'axios'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'
import {connect} from 'react-redux'
@connect(
    state=>state.chatuser,
    {getUserList}
)
export default class Boss extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data:[]
        }
    }
    componentWillMount() {
        this.props.getUserList('genius')
    }
    render() {
        return (<UserCard userList={this.props.userList}></UserCard>);
    }
}