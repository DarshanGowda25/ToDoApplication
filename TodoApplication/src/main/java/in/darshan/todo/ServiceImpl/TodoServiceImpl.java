package in.darshan.todo.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import in.darshan.todo.Entity.Todo;
import in.darshan.todo.Repository.TodoRepository;
import in.darshan.todo.Services.TodoServices;

@Service
public class TodoServiceImpl implements TodoServices {
	
	@Autowired
	private TodoRepository repository;

	@Override
	public boolean addTodo(Todo todo) {
		// TODO Auto-generated method stub
		Integer id =  repository.save(todo).getId();
		if(id>0) {
			return true;
		}
		else {
			return false;
		}
		
	}

	@Override
	public List<Todo> getToDos() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	@Override
	public Todo getToDo(Integer id) {
		// TODO Auto-generated method stub
		return repository.findById(id).get();
	}

	@Override
	public boolean updateTodo(Todo todo) {
		// TODO Auto-generated method stub
		Integer id =  repository.save(todo).getId();
		if(id>0) {
			return true;
		}
		else {
			return false;
		}
	}

	@Override
	public boolean deleteTodo(Integer id) {
		// TODO Auto-generated method stub
		boolean isPresent = repository.existsById(id);
		if(isPresent) {
			repository.deleteById(id);
		}
		
		return !repository.existsById(id);
	}

	@Override
	public List<Todo> getUpdatedToDos(String status) {
		// TODO Auto-generated method stub
		return repository.findByStatus(status);
	}

	@Transactional
	@Override
	public void deleteTodosByStatus(String status) {
		// TODO Auto-generated method stub
		 repository.deleteByStatus(status);;
	}

}
