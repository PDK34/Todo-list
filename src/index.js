import "./style.css"

import pageLoad from "./pageload.js"

import addTodo from "./addTodo.js";
import displayTodos from "./displayTodos";
const addTodoBtn = document.querySelector('.add-todo-btn');


document.addEventListener('DOMContentLoaded', pageLoad);
addTodoBtn.addEventListener('click',() => {
    if(!addTodoBtn.classList.contains('active')){
        addTodo();
        addTodoBtn.classList.add('active');  
    }else{
        addTodoBtn.classList.remove('active');
        const formContainer = document.querySelector('#form-container');
        const form = formContainer.querySelector('form'); 
        const textarea = form.querySelector('textarea');

        formContainer.classList.add('hidden');
        form.reset(); 
                textarea.style.width = '';  // reset size
        textarea.style.height = '';

    }
    displayTodos();
})
