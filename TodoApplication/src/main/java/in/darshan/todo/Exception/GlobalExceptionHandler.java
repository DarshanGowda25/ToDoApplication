package in.darshan.todo.Exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(ToDoException.class)
	public ResponseEntity<Map<String,String>> userExceptionHandler(ToDoException e){
		Map<String,String> response = new HashMap<>();
		response.put("error", "Server Error");
		response.put("message", e.getMessage());
		response.put("status", "Failed");
		
		return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR); 
		
		
		 
	}

}
