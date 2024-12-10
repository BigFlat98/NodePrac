const express = require('express');
const router = express.Router();
const Users = require('../models/models_users.js');
const Comments = require('../models/models_comments.js');

router.route('/')
.get(async (req,res,next)=>{
    try{
        const users = await Users.find({});
        res.json(users);
    }
    catch(err){
        console.error(err);
        next(err);
    }
})

module.exports = router;