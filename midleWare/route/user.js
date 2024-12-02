const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('<h1>user 라우터</h1>');
});

router.get('/:id', function(req, res) { 
	console.log(req.params, req.query);
    res.send(`<h1>${req.params.id} 페이지</h1>`);
});

module.exports = router;