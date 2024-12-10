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
});

module.exports = mongoose.model('Comments',commentSchema); //내가 model 메서드에 작성한 collection 이름은 일단 자동으로 소문자로 변환. 
                                                          //그리고 복수형으로 변환함. 즉. Comment라고 적으면 Comment -> commnet -> comments 로 변환됨.
                                                          //그래서 내가 원하는 이름으로 쓰고 싶다면 모델 메서드에 두번째 인자로 원하는 이름을 넣어주면 됨. 
                                                          //ex) mongoose.model('Comments',commentSchema,'myComments'); 
                                                          //이렇게 하면 Comments -> comments -> myComments 로 변환됨.
                                                          //변환한 이름으로 DB에서 collection을 찾고 만약 없으면 해당 이름으로 collection을 생성함.


