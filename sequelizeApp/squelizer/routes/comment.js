const express = require('express');
const router = express.Router();
const Comment = require('../models/comments.js');
const User = require('../models/users.js');

router.route('/')
.get(async (req,res,next)=>{
    try{
        const comments = await Comment.findAll(
            {
                include:{ //join, users 테이블에 있는 name을 외래키로 참조
                    model:User,
                    attributes:['name'],
                }
            }
        );
        res.json(comments);
    }
    catch(err){
        console.error(err);
        next(err);
    }
})
.post(async (req,res,next)=>{
    try{
        console.log('in post comment route');
        const comment = await Comment.create({
            comment:req.body.comment,
            commenter:req.body.userid,
        });
        console.log(comment);
        res.end();
    }
    catch(err){
        console.error(err);
        next(err);
    }
})

router.route('/:id')
.patch(async (req,res,next)=>{
    try{
        const { id } = req.params;
        const { text } = req.body;
        await Comment.update(
            { comment : text },
            { where: {id:id}}
        );
        res.end();
    }
    catch(err){
        console.error(err);
        next(err);
    }
})
.delete(async (req,res,next)=>{
    const { id } = req.params;
    await Comment.destroy({where:{id:id}});
    res.end();
});

module.exports = router;