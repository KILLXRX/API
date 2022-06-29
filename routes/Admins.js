const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const res = require('express/lib/response');
const axios = require('axios')
const requestIP = require('request-ip')
//GETs ALL
// router.get('/', async (req, res) => {
//     try{
//         const posts = await Post.find()
//         res.json(posts);
        
//     }catch(err){
//         res.json({messsage: err});
//     }
// });

//Posts
router.put('/', async (req,res) => {
    //console.log(req.body)
    var clientIp = requestIP.getClientIp(req)
    console.log(clientIp);
    const post = new Post({
        username: req.body.username,
        adminType: req.body.adminType,
        adminLevel: req.body.adminLevel,
        userID: req.body.userID
    });
    try{
        const savedPost = await post.save()
        res.json(savedPost);
    }catch(err) {
        res.json({messsage: err})
    }
});


//GETS A UESR BY USERNAME
router.get('/', async (req, res) => {
    try{
        const posts = await Post.findOne({username: req.body.username})
        res.json(posts);
        //console.log(res)
    }catch(err){
        res.json({messsage: err});
    }
});

async function update(res, req){
    const posts = await Post.updateOne({username: req.body.username}, {$set: {adminType: req.body.adminType, adminLevel: req.body.adminLevel}})
    //res.json(posts);
}

//UPDATES ADMIN
router.post('/', async (req, res) => {
    var clientIp = requestIP.getClientIp(req)
    console.log(clientIp);
    const body = req.body
    const info = {
        method: 'GET',
        data: body,
        url: "http://localhost:8080/admins/",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const postinfo = {
        method: 'PUT',
        data: body,
        url: "http://localhost:8080/admins/",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios(info).then(function(response) {
    //console.log(response.data)
    if (response.data != null){
        if (response.data.adminLevel <= req.body.adminLevel) {
              try{
                  update(res, req)
                  res.sendStatus(200)
                  console.log("Succesfully updated " + req.body.username)
              }catch(err){console.log(err); res.json({messsage: err})}
        }else{res.sendStatus(403);console.log(req.body.username + " tried to downgrade!!")}
    }else{
        axios(postinfo).then(function(respond){
            res.sendStatus(200)
            console.log("Succesfully created " + req.body.username)
        })
    } 
})})

module.exports = router;