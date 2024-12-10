const mongoose = require('mongoose'); 

const { Schema } = mongoose;
const { Types: {ObjectId} } = Schema;

const commentSchema = new Schema({
    comment:{
        type:String,
        required:true,
    },
    commenter:{
        type:ObjectId,
        required:true,
        ref: 'Users', //Users 모델을 참조하는 필드. mongoose 모델에 Users Collection이 들어갔기 때문에 따로 참조할 필요 없이 Collection 명만 써서 참조할 수 있음.   
                      //만약 models폴더에 있는 Users.js이 먼저 실행되지 않았다면 참조할 때 해당 Collection 먼저 생성.
    },
    createAt:{
        type:Date,
        required:true,
        default: Date.now,
    },
    modifyAt:{
        type:Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Comments',commentSchema);
