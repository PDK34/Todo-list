export default function deleteTodo(todo){

  const storedTodos = localStorage.getItem('todos');
  if(storedTodos){
    const todos = JSON.parse(storedTodos);
    const updatedTodos = todos.filter(t => t.id!==todo.id )

    localStorage.setItem('todos' , JSON.stringify(updatedTodos));
  }

    
}
