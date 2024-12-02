const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('<h1>기본 url</h1>');
})

module.exports = router;