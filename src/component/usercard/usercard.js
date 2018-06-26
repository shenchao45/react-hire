import React from 'react'
import {WingBlank,WhiteSpace,Card} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
@withRouter
export default class UserCard extends React.Component {
    handleClick(v){
        this.props.history.push(`/chat/${v}`)
    }
    render() {
        return (<WingBlank>
            <WhiteSpace></WhiteSpace>
            {this.props.userList.map(v=>(
                v.avatar?<Card key={v._id}
                               onClick={()=>this.handleClick(v._id)}
                >
                    <Card.Header title={v.name}
                                 thumb={require(`../img/${v.avatar}.png`)}
                                 extra={<span>{v.title}</span>}
                    >
                    </Card.Header>
                    <Card.Body>
                        {v.type=='boss'?<div>公司：{v.company}</div>:null}
                        {v.desc.split('\n').map(v=>(<div key={v}>{v}</div>))}
                        {v.type=='boss'?<div>薪资：{v.money}</div>:null}
                    </Card.Body>
                </Card>:null
            ))}
        </WingBlank>)
    }
}