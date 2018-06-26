// const express = require('express')
import express from 'express'
import csshook from 'css-modules-require-hook/preset' // import hook before routes
import assethook from 'asset-require-hook'
assethook({
    extensions: ['png']
})
import {renderToString} from 'react-dom/server'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {StaticRouter as Router} from 'react-router-dom'
import App from '../src/app'
import React from 'react'
import reducers from '../src/reducer'
const userRouter = require('./user')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express()
import staticPath from '../build/asset-manifest'
console.log(staticPath)
const model = require('./model')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const Chat = model.getModel('chat')
io.on('connection', function (socket) {
    console.log('user login')
    socket.on('sendmsg', function (data) {
        const {from, to, msg} = data
        const chatid = [from, to].sort().join('_')
        Chat.create({chatid, from, to, content: msg, create_time: new Date().getTime()}, (err, doc) => {
            io.emit('recvmsg', Object.assign({}, doc._doc))
        })
    })
})
app.use(cookieParser())
app.use(bodyParser())
app.use('/user', userRouter)
app.use(function (req, res, next) {
    if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
        return next()
    }
    const store = createStore(reducers,compose(applyMiddleware(thunk)))
    let context = {}
    const markup = renderToString((<Provider store={store}>
        <Router location={req.url} context={context} >
            <App></App>
        </Router>
    </Provider>))
    const pageHtml = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <title>React App</title>
    <link rel="stylesheet" href="${staticPath['main.css']}">
</head>
<body>
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root">
${markup}
</div>
</body>
<script src="${staticPath['main.js']}"></script>
</html>
    `
    // return res.sendFile(path.resolve('build/index.html'))
    res.send(pageHtml)
})
app.use('/', express.static(path.resolve('build')))
server.listen(9093, function () {
    console.log("Node app start at port 9093")
})