const express = require('express')
const mongoose = require('mongoose')
const app = express()
const DB_URL = 'mongodb://192.168.1.101:27017/imooc-react'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function () {
    console.log('mongo connected')
})
const User = mongoose.model('user',new mongoose.Schema({
    name:{type:String,require:true},
    age:{type:Number,require:true}
}))

// User.create({
//     name:"imooc",
//     age:18
// },function (err, doc) {
//     if(!err) {
//         console.log(doc)
//     }else{
//         console.log(err)
//     }
// })



app.get('/',function (req, res) {
    res.send('<h1>Hello World</h1>')
})
app.get('/data',function (req, res) {
    User.find({name:"imooc",age:18},(err, res2) => {
        if(!err) {
            res.json(res2)
        }
    })
})
app.get('/delete',function (req, res) {
    User.remove({age:18},err => {
        res.send("删除成功")
    })
})
app.listen(9093,function () {
    console.log("Node app start at port 9093")
})