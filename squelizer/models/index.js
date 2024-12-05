const Sequelize = require('sequelize');
const User = require('./users');//우리가 정의해놓은 테이블 클래스 불러옴.
const Comment = require('./comments');

//환경변수 설정을 위한 코드
const env = process.env.NODE_ENV || 'development';//개발 단계기 때문에 development, 배포 단계는 production
const config = require('../config/config.json')[env];//내가 정해준 설정에 맞게 config
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);//db연결 , 다른 db추가 시 파라미터를 다르게 써서 새 인스턴스 생성하면 됨.

db.sequelize = sequelize;

//테이블 생성
db.User = User;//db에 테이블 클래스 추가
User.initiate(sequelize);//인스턴트를 생성해서 테이블 생성.
db.Comment = Comment;
Comment.initiate(sequelize); //테이블 명이 이미 같은게 있다면 함수 실행 안됨.(테이블 수정,생성 안됨.)

//db table relations
User.associate(db);
Comment.associate(db);

module.exports = db;