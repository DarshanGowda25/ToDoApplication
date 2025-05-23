package in.darshan.todo.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import in.darshan.todo.Entity.Todo;
import in.darshan.todo.Exception.ToDoException;
import in.darshan.todo.Services.LLMServices;
import in.darshan.todo.Services.SlacKServices;
import in.darshan.todo.Services.TodoServices;
import in.darshan.todo.request.addToDoRequest;
import in.darshan.todo.request.updateToDoRequest;

@RestController
@RequestMapping("/api/todo")
public class TodoController {
    
    @Autowired
    private TodoServices todoServices;
    
    @Autowired
    private LLMServices llmServices;
    
    @Autowired
    private SlacKServices slackServices;

    @PostMapping("/add")
    public ResponseEntity<?> addTodo(@RequestBody addToDoRequest newTodo) {
        if(newTodo.getTitle() == null || newTodo.getDescription() == null) {
            throw new ToDoException("Invalid request");
        }
        
        Todo todo = new Todo();
        todo.setTitle(newTodo.getTitle());
        todo.setDescription(newTodo.getDescription());
        todo.setStatus("Pending");
        
        boolean isAdded = todoServices.addTodo(todo);
        Map<String, String> response = new HashMap<>();
        if(!isAdded) {
            throw new ToDoException("Server Error");
        }
        response.put("status", "ToDo added");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/getToDos")
    public ResponseEntity<?> getTodos() {
        List<Todo> todos = todoServices.getToDos();
        Map<String, Object> response = new HashMap<>();
        if(todos == null || todos.isEmpty()) {
            response.put("status", "ToDo's Empty");
        } else {
            response.put("ToDos", todos);
        }
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/getStatusToDos")
    public ResponseEntity<?> getCompletedTodos(@RequestParam String status) {
        List<Todo> todos = todoServices.getUpdatedToDos(status);
        Map<String, Object> response = new HashMap<>();
        if(todos == null || todos.isEmpty()) {
            response.put("status", "No ToDos with status: " + status);
        } else {
            response.put("ToDos", todos);
        }
        return ResponseEntity.ok(response);
    }
    
    @PatchMapping("/update")
    public ResponseEntity<?> updateTodo(@RequestBody updateToDoRequest request) {
        if(request.getId() == null || request.getStatus() == null) {
            throw new ToDoException("Invalid request");
        }
        
        Todo todo = todoServices.getToDo(request.getId());
        todo.setStatus(request.getStatus());
        
        boolean isUpdated = todoServices.updateTodo(todo);
        Map<String, String> response = new HashMap<>();
        if(!isUpdated) {
            throw new ToDoException("Server Error");
        }
        response.put("status", "Successfully Updated ToDo");
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteTodo(@RequestParam Integer id) {
        if(id == null) {
            throw new ToDoException("Invalid request");
        }
        
        boolean isDeleted = todoServices.deleteTodo(id);
        if(!isDeleted) {
            throw new ToDoException("Server Error");
        }
        return ResponseEntity.ok("ToDo Deleted");
    }
    
    @PostMapping("/summarize")
    public ResponseEntity<?> summarizeAndSendToSlack() {
    	System.out.println("summarize");
        List<Todo> pendingTodos = todoServices.getUpdatedToDos("Pending");
        String summary = llmServices.summarizeTodos(pendingTodos);
        String slackResponse = slackServices.sendMessageToSlack(summary);
        
        Map<String, String> response = new HashMap<>();
        response.put("summary", summary);
        response.put("slack_status", slackResponse);
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/deleteAll")
    public ResponseEntity<String> deleteTodosByStatus(@RequestParam String status) {
        todoServices.deleteTodosByStatus(status);
        return ResponseEntity.ok("Completed todo's deleted.");
    }
}