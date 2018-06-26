import React from 'react'
import {List, InputItem, NavBar,Icon,Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg,readMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'
import QueueAnim from 'rc-queue-anim'
@connect(
    state => state,
    {getMsgList, sendMsg, recvMsg}
)
export default class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: [],
            showEmoji:false
        }
    }
    fixEmoji(){
        setTimeout(()=>{
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    componentWillMount() {
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
        this.fixEmoji()
        console.log(this.props)
        const to = this.props.match.params.user
    }

    handleClick() {
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from, to, msg})
        this.setState({
            text: ''
        })

    }

    render() {
        const userid = this.props.match.params.user
        const Item = List.Item
        const user = this.props.chat.users[`${userid}`]
        if(!user){
            return null
        }
        const chatid = getChatId(userid,this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid==chatid)
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '.split(' ').filter(el => el).map(e=>({text:e}));
        return (
            <div id={'chat-page'}>
                <NavBar mode={'dark'}
                        icon={<Icon type={'left'}></Icon>}
                        onLeftClick={()=>this.props.history.goBack()}

                >
                    {user?user.name:'匿名者'}
                </NavBar>
                <QueueAnim delay={100}>
                    {chatmsgs.map(v => {
                        let avatar = require(`../img/boy.png`)
                        if(user){
                            avatar = require(`../img/${user.avatar}.png`)
                        }
                        return v.from == userid ? (
                            <List key={v._id}>
                                <Item thumb={avatar}>
                                    {v.content}
                                </Item>
                            </List>
                        ) : <List key={v._id}>
                            <Item
                                extra={<img src={avatar} alt=""/>}
                                className={'chat-me'}
                            >
                                {v.content}
                            </Item>
                        </List>
                    })}
                </QueueAnim>

                <div className={'stick-footer'}>
                    <List>
                        <InputItem placeholder={'请输入'} value={this.state.text} onChange={v => {
                            this.setState({
                                text: v
                            })
                        }} extra={
                           <div>
                               <span style={{marginRight:15}} onClick={v=>{
                                   this.setState({showEmoji:!this.state.showEmoji})
                                   this.fixEmoji()
                               }}>😀</span>
                               <span onClick={() => this.handleClick()}>发送</span>
                           </div>
                        }></InputItem>
                    </List>
                    {this.state.showEmoji?<Grid data={emoji} columnNum={9} carouselMaxRow={4} isCarousel={true} onClick={v=>{
                           this.setState(
                               {
                                   text:this.state.text+v.text
                               }
                           )
                    }}></Grid>:null}
                </div>
            </div>
        )
    }
}