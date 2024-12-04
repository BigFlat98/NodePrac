const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination:'./uploads/', //router폴더에 있더라도 라우터 실행은 app.js에서 실행. 때문에 app.js기준으로 경로 설정.
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()} - ${file.originalname}`);
    }
});
const upload = multer({storage:storage});


router.post('/upload',upload.single('image'),(req,res)=>{
    console.log(req.file);
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({imageUrl});
});

router.get('/',(req,res)=>{
    const dirPath = path.join(__dirname,'../uploads');
    fs.readdir(dirPath,(err,files)=>{//경로에 있는 파일 전체 읽어오기
        console.log('files : '+files);
        if(err){
            return res.status(500).json({error:'file not found'});
        }
        const imageUrls = files.map(file=>`/uploads/${file}`);//각 파일 경로를 배열에 저장.
        res.json(imageUrls);
    });
});


module.exports = router;