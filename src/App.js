import React from 'react'
import {connect} from 'react-redux'
import {addGunAsync,addGun,removeGun} from './index.redux'
class App extends React.Component {
    render() {
        return (
            <div>
                <h1>现在有机枪:{this.props.num}</h1>
                <button onClick={this.props.addGun}>申请武器</button>
                <button onClick={this.props.removeGun}>上交武器</button>
                <button onClick={this.props.addGunAsync}>拖两天再给</button>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {num: state}
}
const actionCreators = {addGun,removeGun,addGunAsync}
App = connect(mapStateToProps,actionCreators)(App)
export default App