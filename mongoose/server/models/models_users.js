const mongoose = require('mongoose'); 

const { Schema } = mongoose;
const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:false,
    },
    age:{
        type:Number,
        required:true,
    },
    married:{
        type:Boolean,
        required: true,
    },
    comment:{
        type:String,
    },
    createAt:{
        type:Date,
        default: Date.now,
    },
});



module.exports = mongoose.model('Users',userSchema); //내가 model 메서드에 작성한 collection 이름은 일단 자동으로 소문자로 변환. 그리고 복수형으로 변환함. 
                                                      //즉. User라고 적으면 User -> user -> users 로 변환됨.
                                                      //그래서 내가 원하는 이름으로 쓰고 싶다면 모델 메서드에 두번째 인자로 원하는 이름을 넣어주면 됨. 
                                                      //ex) mongoose.model('Users',userSchema,'myUsers'); 
                                                      //이렇게 하면 Users -> users -> myUsers 로 변환됨.
                                                      //만약 