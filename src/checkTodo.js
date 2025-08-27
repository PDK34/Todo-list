
export default function checkUpdate(updatedTodo){
    const storedTodos = localStorage.getItem('todos');

    if(!storedTodos) return;

    let todos = JSON.parse(storedTodos);

    todos = todos.map( todo => {
        if(todo.id === updatedTodo.id){
            return{
                ...todo,
                check:updatedTodo.check
            }
        }
        return todo;
    })

    localStorage.setItem('todos' , JSON.stringify(todos))
}
