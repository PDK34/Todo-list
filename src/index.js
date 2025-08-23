import "./style.css"

import pageLoad from "./pageload.js"

import addTodo from "./addTodo.js";
const addTodoBtn = document.querySelector('.add-todo-btn');


document.addEventListener('DOMContentLoaded', pageLoad);
addTodoBtn.addEventListener('click',() => {
    if(!addTodoBtn.classList.contains('active')){
        addTodo();
        addTodoBtn.classList.add('active');  
    }else{
        addTodoBtn.classList.remove('active');
        const formContainer = document.querySelector('#form-container');
        formContainer.classList.add('hidden');
    }
})
