const express = require('express');
const router = express.Router();
const User = require('../models/users.js');//call user table

router.get('/', async (req,res)=>{
    try{
        const users = await User.findAll();//User.findAll() -> select * from users;
        res.send(users);
    }
    catch(err){
        console.error(err);
        next(err);//app.js에서 이 라우터가 호출되는 아래 미들웨어들이 있기 때문에 next 함수 사용.
    }
});



module.exports = router;