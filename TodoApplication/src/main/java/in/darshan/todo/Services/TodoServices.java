package in.darshan.todo.Services;

import java.util.List;

import in.darshan.todo.Entity.Todo;

public interface TodoServices {

	boolean addTodo(Todo todo);

	 List<Todo> getToDos();
	 
	 

	Todo getToDo(Integer id);

	boolean updateTodo(Todo todo);

	boolean deleteTodo(Integer id);

	List<Todo> getUpdatedToDos(String status);

	void deleteTodosByStatus(String status);

}
