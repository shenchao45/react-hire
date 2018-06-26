import React from 'react'
import {Route,Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import { NavBar, Icon } from 'antd-mobile';
import NavLinkBar from '../../component/navlinkbar/navlinkbar'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import {recvMsg,getMsgList} from '../../redux/chat.redux'
import Msg from '../msg/msg'
@connect(state=>state,
    {recvMsg,getMsgList})
class Dashboard extends React.Component {
    componentWillMount() {
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    constructor(props){
        super(props)
    }
    render() {
        const user = this.props.user
        const navList = [
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                hide:user.type=='genius'
            },
            {
                path:'/genius',
                text:'boss',
                icon:'job',
                title:'BOSS列表',
                component:Genius,
                hide:user.type=='boss'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg
            },
            {
                path:'/me',
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User
            }

        ]
        const pathname = this.props.location.pathname
        const title = navList.find(v=>v.path==pathname)
        return (<div>
            <NavBar mode={'dark'}>{
                title?title.title:'招聘'
            }</NavBar>
            <div>
                <Switch>
                    {navList.map(v=>(
                        <Route key={v.path} path={v.path} component={v.component}></Route>
                    ))}
                </Switch>
            </div>
             <NavLinkBar data={navList}></NavLinkBar>
        </div>)
    }
}

export default Dashboard