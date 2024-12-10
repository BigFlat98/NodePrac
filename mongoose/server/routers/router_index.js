const express = require('express');
const router = express.Router();
const Users = require('../models/models_users.js');

router.get('/',async (req,res,next)=>{
    try{
        const users = await Users.find({});//mongosh에서 사용하던 CRUD 메서드 동일하게 사용하면 됨.
        res.render('mongoose',{users});
    }catch(err){
        console.error(err);
        next(err);
    }
})

module.exports = router;