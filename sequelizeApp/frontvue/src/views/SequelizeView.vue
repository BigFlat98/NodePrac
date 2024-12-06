<template>
<div>
    <div class="form-container">
      <form id="user-form" @submit.prevent="postUser">
        <fieldset>
          <legend>사용자 등록</legend>
          <div><input v-model="newUser.name" type="text" placeholder="이름" required></div>
          <div><input v-model="newUser.age" type="number" placeholder="나이" required></div>
          <div><input v-model="newUser.married" id="married" type="checkbox"><label for="married">결혼 여부</label></div>
          <div><label for="comment">전방에 힘찬 함성:</label><textarea v-model="newUser.comment" name="comment" id="comment" cols="30" rows="10"></textarea></div>
          <button type="submit">등록</button>
        </fieldset>
      </form>
    </div>
    <br />
    <hr />
    <br />
    <table>
        <thead>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>age</th>
                <th>married</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.age }}</td>
                <!-- <td v-if="user.married">Yes</td>
                <td v-else>No</td> -->
                <td>{{ user.married ? 'Yes' : 'No' }}</td>
            </tr>
        </tbody>
    </table>
    <br />
    <hr />
    <br />
    <form action="" @submit.prevent="postComment">
        <fieldset>
            <legend>add Comment</legend>
            <div>
                <div><input type="text" v-model="newComment.userid" placeholder="user id" required></div>
                <div><input type="text" v-model="newComment.comment" placeholder="comment" required></div>
            </div>
            <button type="submit" class="btn btn-primary">등록</button>
        </fieldset>
    </form>
    <br />
    <hr />
    <br />
    <div>
        <input type="text" v-model="searchUser" placeholder="아이디 검색" required>
        <button @click="searchComment(searchUser)">검색</button>
    </div>
    <table>
        <thead>
            <tr>
                <th>아이디</th>
                <th>작성자</th>
                <th>댓글</th>
                <th>수정</th>
                <th>삭제</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="u_comment in user_comments" :key="u_comment.id">
                <td>{{ u_comment.commenter }}</td>
                <td>{{ u_comment.User.name }}</td>
                <td>{{ u_comment.comment }}</td>
                <td><button class="btn btn-primary" @click="modifyComment(u_comment.id)">수정</button></td>
                <td><button class="btn btn-danger" @click="deleteComment(u_comment.id)">삭제</button></td>
            </tr>
        </tbody>
    </table>

</div>
</template>


<script>
import axios from 'axios';
export default{ 
    name:'',
    components:{},
    data(){
        return{
            users:[],
            newComment:{
                userid:'',
                comment:''
            },
            user_comments:[],
            commentID:'',
            newUser:{
                name:'',
                age:null,
                married:false,
                comment:''
            },
            searchUser:'',
        };
    },
    setup(){},
    created(){
        this.getUsers();
        this.getUserComments();
    },
    mounted(){},
    unmounted(){},
    methods:{
        async getUsers(){
            try{
                const res = await axios.get('http://localhost:3000/user');
                console.log(res);
                this.users = res.data;
            }
            catch(err){
                console.error(err);
            }
        },
        async postUser(){
            if(this.newUser.name=='' || this.newUser.age==null){
                alert('이름과 나이를 입력하세요');
                return;
            }
            try{
                await axios.post('http://localhost:3000/user',this.newUser);
                this.getUsers();
                this.newUser = {
                    name:'',
                    age:null,
                    married:false,
                    comment:''
                }
            }
            catch(err){
                console.error(err);
            }
        },
        async getUserComments(){
           try{
                const res = await axios.get('http://localhost:3000/comment');
                console.log(res.data);
                this.user_comments = res.data;
           }
           catch(err){
                console.error(err);
           }
        },
        async postComment(){
            if(this.newComment.userid=='' || this.newComment.comment==''){
                alert('아이디와 댓글을 입력하세요');
                return;
            }
            try{
                console.log('start postComment');
                await axios.post('http://localhost:3000/comment',this.newComment);
                console.log('end postComment');
                this.getUserComments();
                this.newComment = {
                    userid:'',
                    comment:''
                }
            }
            catch(err){
                console.error(err);
            }
        },
        async modifyComment(commentID){
            console.log(commentID);
            const newText = prompt('수정할 댓글을 입력하세요');
            if(newText==null || newText==''){
                alert('수정할 댓글을 입력하세요');
                return;
            }
            try{
                console.log('start modifyComment');
                await axios.patch(`http://localhost:3000/comment/${commentID}`,{text:newText});
                console.log('end modifyComment');
                this.getUserComments();
            }
            catch(err){
                console.error(err);
            }
        },
        async deleteComment(commentID){
            try{
                await axios.delete(`http://localhost:3000/comment/${commentID}`);
                this.getUserComments();
            }
            catch(err){
                console.error(err);
            }
        },
        async searchComment(userid){
            if(userid==''){
                alert('아이디를 입력하세요');
                return;
            }
            try{
                const res = await axios.get(`http://localhost:3000/user/${userid}/comments`);
                this.user_comments = res.data;
                this.searchUser = '';
            }
            catch(err){
                console.error(err);
            }
        }
    },
    computed:{},
    watch:{}
}
</script>