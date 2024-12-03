const express = require('express');
const router = express.Router();

let todos = [
    {id:1, title:'연애하기', status:false},
    {id:2, title:'금연하기', status:false},
    {id:3, title:'온천가기', status:false},
    {id:4, title:'영화보기', status:true},
];

router.get('/',(req,res)=>{
    console.log('todos send complete');
    console.log(todos);
    res.json(todos);
});

router.post('/',(req,res)=>{
    const newId = todos[todos.length-1].id+1;
    const newTitle = req.body.title;
    todos.push({id:newId, title:newTitle, status:false});
    console.log('todos add complete');
    console.log(todos);
    res.json(todos);
});

router.put('/:id',(req,res)=>{
    const {id} = req.params;
    console.log(id);
    //todos = todos.map(todo=> todo.id === id ? {...todo, status:req.body.status} : todo);//...todo 기존 내용을 유지.
    todos = todos.map(todo => todo.id == id ? {id:id,title:todo.title,status:req.body.status} : todo);
    console.log('todos update complete');
    console.log(todos);
    res.end('수정 완료.');
})

router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    todos = todos.filter(todo=>todo.id !=id);
    console.log('todos delete complete');
    console.log(todos);
    res.json(todos);
})

router.patch('/:id',(req,res)=>{
    const {id} = req.params;
    const {modifyTitle} = req.body;
    todos = todos.map(todo=>todo.id == id ? {...todo,title:modifyTitle} : todo);
    console.log('todos modify complete');
    console.log(todos);
    res.json(todos);
})


module.exports = router;