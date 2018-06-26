import React from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'
@connect(
    state=>state
)
export default class Msg extends React.Component{
    constructor(props){
        super(props)
    }
    getLast(arr){
        return arr[arr.length-1]
    }
    render() {
        if(!this.props.chat.chatmsg.length) {
            return null
        }
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        const userid = this.props.user._id
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            console.log(a_last,b_last)
            return b_last - a_last
        })
        console.log(chatList)
        return (<div>
            <List>
                {chatList.map(v=>{
                    const lastItem = this.getLast(v)
                    const targetId = lastItem.from===userid?lastItem.to:lastItem.from
                    const unreadNum = v.filter(v=>!v.read&&v.to==userid).length
                    return (<List.Item
                        thumb={require(`../img/${this.props.chat.users[targetId].avatar}.png`)}
                        key={lastItem._id}
                        extra={<Badge text={unreadNum}></Badge>}
                    >
                            {lastItem.content}
                        <List.Item.Brief>{this.props.chat.users[targetId].name}</List.Item.Brief>
                    </List.Item>)
                })}
            </List>
        </div>)
    }
}
