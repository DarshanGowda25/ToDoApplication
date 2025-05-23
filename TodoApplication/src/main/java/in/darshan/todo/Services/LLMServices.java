package in.darshan.todo.Services;

import java.util.List;

import in.darshan.todo.Entity.Todo;

public interface LLMServices {
	
	 public String summarizeTodos(List<Todo> todos);

}
