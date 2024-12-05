const Sequelize = require('sequelize');
const Comment = require('./comments');

class User extends Sequelize.Model{//테이블 생성을 위해 시퀄라이즈 모델 클래스를 상속
    static initiate(sequelize){//Sequelize.Model 클래스에 있는 sequelize 초기화
        User.init({//생성자 오버로딩
            //컬럼들 정의. pk를 안주면 자동으로 id 컬럼 생성.
            name:{
                type:Sequelize.STRING(20),//varchar(20)
                allowNull:false,//not null
                unique:false,//unique 제약조건 추가(default false)
            },
            age:{
                type:Sequelize.INTEGER.UNSIGNED,//UNSIGNED -> 0 이상의 값만 가질 수 있음.
                allowNull:false,
            },
            married:{
                type:Sequelize.BOOLEAN,
                allowNull:true, //default true
            },
            comment:{
                type:Sequelize.TEXT,//longtext
            },
            created_at:{
                type:Sequelize.DATE,//Date는 시간까지, DateOnly는 시간 제외
                allowNull:false,
                defaultValue:Sequelize.NOW,//레코드 생성시 값이 없으면 현재 시간 적용
            },


        },{//테이블 자체의 설정을 정해주는 파라미터
            sequelize, //시퀄라이즈 인스턴스
            timestamps:false, //createAt, updateAt 컬럼 자동 생성하지 않음(레코드가 생성되거나 업데이트 됐을 때 시간이 자동으로 들어가는 컬럼.)
            underscored:false, //카멜 방식으로 표기된 컬럼을 스네이크 방식으로 변경하지 않음.
            modelName:'User', //모델 이름
            tableName:'users', //테이블 이름
            paranoid:false, //deletedAt 컬럼 자동 생성하지 않음(레코드 삭제시 시간이 자동으로 들어가는 컬럼. 삭제 데이터 복구에 사용)
            charset:'utf8', //문자열 컬럼에 한해 사용되는 캐릭터셋
            collate:'utf8_general_ci', //문자열 컬럼에 한해 사용되는 문자열 정렬 방식
        });
    }
    static associate(db){
        db.User.hasMany(db.Comment,{foreignKey:'commenter', sourceKey:'id'});
    }

};

module.exports = User;//index.js에서 사용할 수 있도록 내보냄.