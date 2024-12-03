<template>
<div id="todo" class="container mt-5">
    <h1>Todo App</h1>
    <div>
        <!-- 이미지 목록 -->
        <div id="carouselExample" class="carousel slide">
            <div class="carousel-inner">
                <div class="carousel-item" :class="{active: index === 0}" v-for="(image,index) in images" :key="index">
                    <img :src="image" class="d-block w-100" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    <div>
        <!-- 할 일 추가 -->
        <div class="input-container">
            <form @submit.prevent="addTodo"> <!-- prevent는 submit의 새로고침 이벤트를 방지하고 addTodo 메소드를 호출함. -->
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="할 일을 입력해주세요@@!" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="newTodoText" required>
                    <button class="btn btn-outline-secondary" type="submit" id="button-addon2">입력</button>
                </div>
            </form>
        </div>

        <!-- 할 일 목록 -->
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">title</th>
                        <th scope="col">status</th>
                        <th scope="col">delete</th>
                        <th scope="col">modify title</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="todo in todos" :key="todo.id">
                        <td class="align-middle">{{todo.id}}</td>
                        <td class="align-middle">{{todo.title}}</td>
                        <td class="align-middle text-center">
                            <div class="form-check form-switch d-flex justify-content-center">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" @change="changeStatus(todo)" v-model="todo.status" autofocus>
                            </div>
                        </td>
                        <td class="align-middle"><button class="btn btn-danger btn-sm" @click="deleteTodo(todo)">삭제</button></td>
                        <td class="align-middle"><button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#modifyModal" @click="modifyId=todo.id">수정</button></td>
                    </tr>
                </tbody>
            </table>
        </div>


        <!-- 이미지 업로드 -->
        <form @submit.prevent="uploadImage">
            <input type="file" @change="fileChange">
            <button type="submit" class="btn btn-primary">이미지 업로드</button>
        </form>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="modifyModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control" placeholder="수정할 title 입력" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="modifyTitleText">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click='modifyTodo'>Save changes</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>


<script>
import axios from 'axios';
export default{ 
    name:'',
    components:{},
    data(){
        return{
            todos:[],
            modifyId:'',
            newTodoText:'',
            modifyTitleText:'',
            file:null,
            images: [],
        };
    },
    setup(){},
    created(){this.getTodos(), this.getImages()
            },
    mounted(){},
    unmounted(){},
    methods:{
        async getTodos(){
            const response = await axios.get('http://localhost:3000/');
            console.log(response); 
            this.todos = response.data;
        },
        async addTodo(){
            const response = await axios.post('http://localhost:3000/',{title:this.newTodoText});
            this.todos = response.data;
            console.log('addTodo complete');
            console.log(response);
        },
        async changeStatus(todo){
            await axios.put(`http://localhost:3000/${todo.id}`,{status:todo.status});
            console.log('changeStatus complete');
            console.log(this.todos);
        },
        async deleteTodo(todo){
            const response = await axios.delete(`http://localhost:3000/${todo.id}`);
            //this.todos = this.todos.filter(t=>t.id !== todo.id);
            console.log('deleteTodo complete');
            console.log(response);
            this.todos = response.data;
        },
        async modifyTodo(){
            const response = await axios.patch(`http://localhost:3000/${this.modifyId}`,{modifyTitle:this.modifyTitleText});
            this.todos = response.data;
            console.log('modifyTodo complete');
            console.log(response);
            this.modifyId = '';
            this.modifyTitleText = '';
        },
        fileChange(event){
            this.file = event.target.files[0];//이미가 들어왔을 때 file정보를 this.file에 저장.
            console.log(this.file);
        },
        async uploadImage(){
            if(!this.file) return;

            const formData = new FormData();//이미지 자체의 정보가 많기 때문에 파일을 form방식으로 전송해야 함. 그래서 formData를 사용.
            formData.append('image', this.file);
            console.log(formData);
            axios.post('http://localhost:3000/image/upload',formData,{
                headers:{
                    'Content-Type':'multipart/form-data',
                } //그동안 json형식으로 데이터를 전달했기 때문에 form 형식의 데이터 전달을 위한 header 변경.
            });

        },
        async getImages(){
            console.log('getImages');
            const response = await axios.get('http://localhost:3000/image');
            console.log(response);
            this.images = response.data;
            console.log("getImages complete"+this.images);
        }

    },
    computed:{},
    watch:{}
}
</script>