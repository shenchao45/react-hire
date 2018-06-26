import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')
//获取聊天列表
const MSG_LIST = 'MSG_LIST'
//读信息
const MSG_RECV = 'MSG_RECV'
//标识已读
const MSG_READ = 'MSG_READ'
const initState = {
    chatmsg:[],
    unread:0,
    users:[]
}
export function chat(state = initState, action) {
    switch(action.type){
        case MSG_LIST:
            return {...state,chatmsg:action.payload,unread:action.payload.filter(v=>!v.read&&v.to===action.userid).length,users:action.users}
        case MSG_RECV:
            return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+(action.payload.to===action.userid?1:0)}
        case MSG_READ:
        default:
            return state
    }
}

function msgList(msgs,users,userid) {
    return {type:MSG_LIST,payload:msgs,users,userid}
}

export function getMsgList() {
    return (dispatch,getState)=>{
        axios.get('/user/getmsglist')
            .then(res=>{
                if(res.status===200 && res.data.code === 0) {
                    const userid = getState().user._id
                    console.log(userid)
                    dispatch(msgList(res.data.data,res.data.users,userid))
                }
            })
    }
}

export function sendMsg({from, to, msg}) {
    return dispatch=>{
        socket.emit('sendmsg', {from, to, msg})
    }
}
function msgRecv(data,userid) {
    return {type:MSG_RECV,payload:data,userid}
}

export function recvMsg() {
    return (dispatch,getState)=>{
        socket.on('recvmsg',data=>{
            const userid = getState().user._id
            dispatch(msgRecv(data,userid))
        })
    }
}
export function readMsg(from){
    return (dispatch,getState)=>{
        axios.post('/user/readmsg',{from})
            .then(res=>{
                const userid = getState().user._id
                if(res.status==200&& res.data.code == 0){

                }
            })
    }
}