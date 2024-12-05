const Sequelize = require('sequelize');
const User = require('./users');
class Comment extends Sequelize.Model{
    static initiate(sequelize){
        Comment.init({
            comment:{
                type:Sequelize.TEXT,
                allowNull:false,
            },
            // created_at:{//timestamp옵션이 true여서 속성이 자동으로 생성되도 설정을 이렇게 정해줄 수 있음. 안 정해주면 자동으로 설정됨.
            //     type:Sequelize.DATE,
            //     allowNull:true,
            //     defaultValue:Sequelize.NOW,
            // },
            // updated_at:{
            //     type:Sequelize.DATE,
            //     allowNull:true,
            //     defaultValue:Sequelize.NOW,
            // },
        },{
            sequelize,
            timestamps:true,
            underscored:false,
            modelName:'Comment', 
            tableName:'Comments', 
            paranoid:false, 
            charset:'utf8', 
            collate:'utf8_general_ci',
        })
    }
    static associate(db){
        db.Comment.belongsTo(db.User,{foreignKey:'commenter', targetKey:'id'});
    }
};

module.exports = Comment;