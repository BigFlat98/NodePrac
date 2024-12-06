const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const Comment = require('../models/comments.js');

router.route('/')//.route()쓰면 특정 라우터에 대한 각 요청들을 한번에 붙여서 쓸 수 있음.
.get(async (req,res,next)=>{
    try{
        const users = await User.findAll();
        res.json(users);//json으로 바꿀 것
    }
    catch(err){
        console.error(err);
        next(err);
    }
})
.post(async (req,res,next)=>{
    try{
        const user = await User.create({//insert into users
            name:req.body.name,
            age:req.body.age,
            married:req.body.married,
            comment:req.body.comment,
        });
        console.log(user);
        res.end();
    }
    catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/:id/comments', async (req,res,next)=>{
    try{
        const comments = await Comment.findAll({
            include:{
                model:User,
                where:{id: req.params.id}, //where 조건 추가 select * from User where id = req.params.id
            }
        });
        console.log(comments);
        res.send(comments);
    }
    catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;