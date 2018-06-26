const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
Router.get('/list',(req, res) => {
    const {type} = req.query
    User.find({type},(req,doc)=>{
        return res.json(doc)
    })
})
Router.get('/getmsglist',(req, res) => {
    const userid = req.cookies.userid
    User.find({},function(e,userdoc){
        let users = {}
        userdoc.forEach(v=>{
            users[v._id] = {name:v.name,avatar:v.avatar}
        })
        Chat.find({'$or':[{from:userid},{to:userid}]},(err,doc)=>{
            if(err){
                return res.json({code:1})
            }
            res.json({code:0,data:doc,users})
        })
    })
})
Router.post('/login',(req,res)=>{
    const {name,pwd} = req.body
    User.findOne({name,pwd},{pwd:0},function (err, doc) {
        if(!doc) {
            return res.json({code:1,msg:'用户名或者密码错误'})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
})
Router.get('/info',(req, res) => {
    const {userid} = req.cookies
    if(!userid) {
        return res.json({code:1})
    }
    User.findOne({_id:userid},{pwd:0},function (err,doc) {
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
        return res.json({code:1,msg:'用户不存在'})
    })
})
Router.post('/update',(req, res) => {
    const userid = req.cookies.userid
    if(!userid) {
        return res.json({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body,function (err, doc) {
        const data = Object.assign({},{
            name:doc.name,
            type:doc.type
        },body)
        res.json({code:0,data})
    })
})
Router.post('/register',(req, res) => {
    const {name,pwd,type} = req.body
    User.findOne({name:name},function (err, doc) {
        if(doc) {
            return res.json({code:1,msg:'用户名重复'})
        }
        User.create({name,pwd,type},function (e,d) {
            if(e) {
                return res.json({code:1,msg:"后端出错了"})
            }
            return res.json({code:0})
        })
    })
})
Router.get('/info',(req, res) => {
    return res.json({code:1})
})
module.exports = Router